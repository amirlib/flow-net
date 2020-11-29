import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Edge from '../Graphs/Edge';
import Node from '../Graphs/Node';
import style from './canvas.module.scss';
import drawReducer from '../../reducers/draw';
import * as drawActions from '../../actions/draw';
import * as utils from '../../utils';

const Canvas = (props) => {
  const { mode } = props;

  const [draw, drawDispatch] = useReducer(drawReducer, utils.getDefaultDraw());

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

  const createNodeElement = (coorX, coorY) => utils.createNodeObject(draw.length, coorX, coorY);

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

    drawDispatch(drawActions.addElement(edge));
  };

  const setNode = (coorX, coorY) => {
    const node = createNodeElement(coorX, coorY);

    drawDispatch(drawActions.addElement(node));
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

        drawDispatch(drawActions.setEdgeEndNode(nodeMouseOn.id));
        addEdge(lastElement.from.id, nodeMouseOn.id);

        break;
      default:
        if (nodeMouseOn === undefined) break;

        setEdge(event.pageX, event.pageY);
        changeMode('new-edge');
    }
  };

  const canvasMouseMove = (event) => {
    switch (mode) {
      case 'new-edge':
      case 'new-node':
        drawDispatch(drawActions.updateLastElementCoordinates(
          utils.calculateCoorX(event.pageX),
          utils.calculateCoorY(event.pageY),
        ));

        break;
      default:
        break;
    }
  };

  const removeLastElementFromGraph = () => {
    const { removeElement } = props;
    const lastElement = draw[draw.length - 1];

    removeElement(lastElement);
    drawDispatch(drawActions.removeLastElement());
  };

  const reset = () => {
    const { changeMode } = props;

    drawDispatch(drawActions.reset());
    changeMode('none');
  };

  const stopDrawing = () => {
    const { changeMode } = props;

    drawDispatch(drawActions.removeLastElement());
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
