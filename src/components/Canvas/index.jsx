import React from 'react';
import PropTypes from 'prop-types';
import Edge from '../Graphs/Edge';
import Node from '../Graphs/Node';
import style from './canvas.module.scss';
import utils from '../../utils';

export default class Canvas extends React.Component {
  static createNodeElement(id, coorX, coorY) {
    return {
      id,
      coorX,
      coorY,
      radius: 25,
      type: 'node',
    };
  }

  static getDefaultDraw() {
    return [
      Canvas.createNodeElement(0, 50, 350),
      Canvas.createNodeElement(1, 700, 350),
    ];
  }

  constructor(props) {
    super(props);

    this.canvasClick = this.canvasClick.bind(this);
    this.canvasMouseMove = this.canvasMouseMove.bind(this);
    this.createEdgeElement = this.createEdgeElement.bind(this);
    this.createNodeElement = this.createNodeElement.bind(this);
    this.getNode = this.getNode.bind(this);
    this.getNodeWhenMouseOn = this.getNodeWhenMouseOn.bind(this);
    this.isNodeOnAnotherNode = this.isNodeOnAnotherNode.bind(this);
    this.removeLastElementFromGraph = this.removeLastElementFromGraph.bind(this);
    this.reset = this.reset.bind(this);
    this.setEdgeEndNode = this.setEdgeEndNode.bind(this);
    this.stopDrawing = this.stopDrawing.bind(this);
    this.state = {
      draw: Canvas.getDefaultDraw(),
    };
  }

  componentDidUpdate(prevProps) {
    const { mode } = this.props;

    if (prevProps.mode === mode) return;

    switch (mode) {
      case 'new-node':
        this.setNode(750, 25);

        break;
      case 'stop':
        this.stopDrawing();

        break;
      case 'reset':
        this.reset();

        break;
      case 'undo':
        this.removeLastElementFromGraph();

        break;
      default:
        break;
    }
  }

  getNode(id) {
    const { draw } = this.state;

    return draw.find((node) => node.id === id);
  }

  getNodeWhenMouseOn(x, y) {
    const { draw } = this.state;
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
  }

  setEdge(x, y) {
    const startNode = this.getNodeWhenMouseOn(x, y);
    const edge = this.createEdgeElement(
      startNode.id,
      startNode.coorX,
      startNode.coorY,
      undefined,
      startNode.coorX,
      startNode.coorY,
    );

    this.setState((prevState) => ({ draw: prevState.draw.concat([edge]) }));
  }

  setEdgeEndNode(id) {
    const { draw } = this.state;
    const copiedDraw = Array.from(draw);
    const lastElement = copiedDraw[copiedDraw.length - 1];

    lastElement.to.id = id;

    this.setState(() => ({ draw: copiedDraw }));
  }

  setNode(coorX, coorY) {
    const node = this.createNodeElement(coorX, coorY);

    this.setState((prevState) => ({ draw: prevState.draw.concat([node]) }));
  }

  canvasClick(event) {
    const {
      addEdge,
      addNode,
      changeMode,
      hasEdge,
      mode,
    } = this.props;
    const { draw } = this.state;
    const lastElement = draw[draw.length - 1];
    const nodeMouseOn = this.getNodeWhenMouseOn(event.pageX, event.pageY);

    switch (mode) {
      case 'new-node':
        if (this.isNodeOnAnotherNode()) break;

        addNode(lastElement.id);

        break;
      case 'new-edge':
        if (nodeMouseOn === undefined) break;
        if (lastElement.from.id === nodeMouseOn.id) break;
        if (hasEdge(lastElement.from.id, nodeMouseOn.id)) break;

        this.setEdgeEndNode(nodeMouseOn.id);
        addEdge(lastElement.from.id, lastElement.to.id);

        break;
      default:
        if (nodeMouseOn === undefined) break;

        this.setEdge(event.pageX, event.pageY);
        changeMode('new-edge');
    }
  }

  canvasMouseMove(event) {
    const { mode } = this.props;

    switch (mode) {
      case 'new-node':
        this.updateCoordinatesOfLastDrawElement(event.pageX, event.pageY);

        break;
      case 'new-edge':
        this.updateCoordinatesOfLastDrawElement(event.pageX, event.pageY);

        break;
      default:
        break;
    }
  }

  createEdgeElement(fromId, startX, startY, toId, endX, endY) {
    const { draw } = this.state;

    return {
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
    };
  }

  createNodeElement(coorX, coorY) {
    const { draw } = this.state;

    return Canvas.createNodeElement(draw.length, coorX, coorY);
  }

  isNodeOnAnotherNode() {
    const { draw } = this.state;
    const lastElement = draw[draw.length - 1];
    const nodes = draw.filter((obj) => obj.type === 'node' && obj !== lastElement);

    return nodes.some((node) => {
      const x = lastElement.coorX - node.coorX;
      const y = lastElement.coorY - node.coorY;
      const distance = utils.calculateDistance(x, y);

      if (2 * node.radius >= distance) return true;

      return false;
    });
  }

  removeLastElementFromDraw() {
    this.setState((prevState) => ({ draw: prevState.draw.slice(0, prevState.draw.length - 1) }));
  }

  removeLastElementFromGraph() {
    const { removeElement } = this.props;
    const { draw } = this.state;
    const lastElement = draw[draw.length - 1];

    removeElement(lastElement);
    this.removeLastElementFromDraw();
  }

  reset() {
    const { changeMode } = this.props;

    this.setState(() => ({ draw: Canvas.getDefaultDraw() }));
    changeMode('none');
  }

  stopDrawing() {
    const { changeMode } = this.props;

    this.removeLastElementFromDraw();
    changeMode('none');
  }

  updateCoordinatesOfLastDrawElement(pageX, pageY) {
    const { draw } = this.state;
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

    this.setState(() => ({ draw: copiedDraw }));
  }

  render() {
    const { draw } = this.state;

    return (
      <div
        id="canvas"
        className={style.canvas}
      >
        <svg
          className={style.svg}
          onClick={this.canvasClick}
          onMouseMove={this.canvasMouseMove}
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
                  updateCurrentNodeIdMouseHover={this.updateCurrentNodeIdMouseHover}
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
  }
}

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
