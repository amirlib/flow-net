import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Edge from '../Graphs/Edge';
import Node from '../Graphs/Node';
import style from './canvas.module.scss';
import utils from '../../utils';

const Canvas = (props) => {
  const { mode } = props;

  const getDefaultDraw = () => [
    {
      id: 0,
      coorX: 50,
      coorY: 350,
      radius: 25,
      type: 'node',
    },
    {
      id: 1,
      coorX: 700,
      coorY: 350,
      radius: 25,
      type: 'node',
    },
  ];

  const [draw, setDraw] = useState(getDefaultDraw());

  const createEdgeElement = (fromId, startX, startY, toId, endX, endY) => ({
    id: draw.length,
    from: {
      id: fromId,
      coorX: startX,
      coorY: startY,
    },
    to: {
      id: toId,
      coorX: endX,
      coorY: endY,
    },
    type: 'edge',
  });

  const createNodeElement = (coorX, coorY) => ({
    id: draw.length,
    coorX,
    coorY,
    radius: 25,
    type: 'node',
  });

  const getNodeWhenMouseOn = (x, y) => {
    const coorX = utils.calculateCoorX(x);
    const coorY = utils.calculateCoorY(y);

    return draw.find((element) => {
      if (element.type !== 'node') return false;

      const xDistance = coorX - element.coorX;
      const yDistance = coorY - element.coorY;
      const distance = utils.calculateDistance(xDistance, yDistance);

      if (element.radius >= distance) return true;

      return false;
    });
  };

  const setEdge = (x, y) => {
    const startNode = getNodeWhenMouseOn(x, y);
    const edge = createEdgeElement(
      startNode.id,
      startNode.coorX,
      startNode.coorY,
      undefined,
      startNode.coorX,
      startNode.coorY,
    );

    setDraw(draw.concat([edge]));
  };

  const setEdgeEndNode = (id) => {
    const copiedDraw = Array.from(draw);
    const lastElement = copiedDraw[copiedDraw.length - 1];

    lastElement.to.id = id;

    setDraw(copiedDraw);
  };

  const setNode = (coorX, coorY) => {
    const node = createNodeElement(coorX, coorY);

    setDraw(draw.concat([node]));
  };

  const isNodeOnAnotherNode = () => {
    const lastElement = draw[draw.length - 1];
    const nodes = draw.filter((obj) => obj.type === 'node' && obj !== lastElement);

    return nodes.some((node) => {
      const x = lastElement.coorX - node.coorX;
      const y = lastElement.coorY - node.coorY;
      const distance = utils.calculateDistance(x, y);

      if (2 * node.radius >= distance) return true;

      return false;
    });
  };

  const canvasClick = (event) => {
    const {
      addEdge,
      addNode,
      changeMode,
      hasEdge,
    } = props;
    const lastElement = draw[draw.length - 1];
    const nodeMouseOn = getNodeWhenMouseOn(event.pageX, event.pageY);

    switch (mode) {
      case 'new-node':
        if (isNodeOnAnotherNode()) break;

        addNode(lastElement.id);

        break;
      case 'new-edge':
        if (nodeMouseOn === undefined) break;
        if (lastElement.from.id === nodeMouseOn.id) break;
        if (hasEdge(lastElement.from.id, nodeMouseOn.id)) break;

        setEdgeEndNode(nodeMouseOn.id);
        addEdge(lastElement.from.id, lastElement.to.id);

        break;
      default:
        if (nodeMouseOn === undefined) break;

        setEdge(event.pageX, event.pageY);
        changeMode('new-edge');
    }
  };

  const updateCoordinatesOfLastDrawElement = (pageX, pageY) => {
    const copiedDraw = Array.from(draw);
    const lastElement = copiedDraw[copiedDraw.length - 1];

    switch (lastElement.type) {
      case 'edge':
        lastElement.to.coorX = utils.calculateCoorX(pageX);
        lastElement.to.coorY = utils.calculateCoorY(pageY);

        break;
      case 'node':
        lastElement.coorX = utils.calculateCoorX(pageX);
        lastElement.coorY = utils.calculateCoorY(pageY);

        break;
      default:
        break;
    }

    setDraw(copiedDraw);
  };

  const canvasMouseMove = (event) => {
    switch (mode) {
      case 'new-edge':
      case 'new-node':
        updateCoordinatesOfLastDrawElement(event.pageX, event.pageY);

        break;
      default:
        break;
    }
  };

  const removeLastElementFromDraw = () => {
    setDraw(draw.slice(0, draw.length - 1));
  };

  const removeLastElementFromGraph = () => {
    const { removeElement } = props;
    const lastElement = draw[draw.length - 1];

    removeElement(lastElement);
    removeLastElementFromDraw();
  };

  const reset = () => {
    const { changeMode } = props;

    setDraw(getDefaultDraw());
    changeMode('none');
  };

  const stopDrawing = () => {
    const { changeMode } = props;

    removeLastElementFromDraw();
    changeMode('none');
  };

  useEffect(() => {
    switch (mode) {
      case 'new-node':
        setNode(750, 25);

        break;
      case 'stop':
        stopDrawing();

        break;
      case 'reset':
        reset();

        break;
      case 'undo':
        removeLastElementFromGraph();

        break;
      default:
        break;
    }
  }, [mode]);

  return (
    <div
      id="canvas"
      className={style.canvas}
    >
      <svg
        className={style.svg}
        onClick={canvasClick}
        onMouseMove={canvasMouseMove}
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="13"
            markerHeight="13"
            refX="0.1"
            refY="6"
            orient="auto"
          >
            <path
              d="M2,2 L2,13 L8,7 L2,2"
              style={{ fill: 'red' }}
            />
          </marker>
        </defs>

        {draw.map((element) => {
          if (element.type === 'node') {
            return (
              <Node
                key={`node-${element.id}`}
                node={element}
              />
            );
          }

          return (
            <Edge
              key={`edge-${element.id}`}
              edge={element}
            />
          );
        })}
      </svg>
    </div>
  );
};

Canvas.propTypes = {
  addEdge: PropTypes.func.isRequired,
  addNode: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  hasEdge: PropTypes.func.isRequired,
  mode: PropTypes.string,
  removeElement: PropTypes.func.isRequired,
};

Canvas.defaultProps = {
  mode: 'none',
};

export default Canvas;
