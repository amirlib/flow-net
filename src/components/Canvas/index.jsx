import React from 'react';
import PropTypes from 'prop-types';
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

  constructor(props) {
    super(props);

    this.canvasClick = this.canvasClick.bind(this);
    this.canvasMouseMove = this.canvasMouseMove.bind(this);
    this.removeElementFromGraph = this.removeElementFromGraph.bind(this);
    this.stopDrawing = this.stopDrawing.bind(this);
    this.state = {
      draw: [
        Canvas.createNodeElement(0, 50, 350),
        Canvas.createNodeElement(1, 700, 350),
      ],
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
      case 'undo':
        this.removeElementFromGraph();

        break;
      default:
        break;
    }
  }

  setNode(coorX, coorY) {
    const { draw } = this.state;
    const node = Canvas.createNodeElement(draw.length, coorX, coorY);

    this.setState((prevState) => ({ draw: prevState.draw.concat([node]) }));
  }

  canvasClick(event) {
    const { addNode, mode } = this.props;
    const { draw } = this.state;
    const lastElement = draw[draw.length - 1];

    switch (mode) {
      case 'new-node':
        addNode(lastElement.id);

        break;
      default:
        event.preventDefault();
    }
  }

  canvasMouseMove(event) {
    const { mode } = this.props;

    switch (mode) {
      case 'new-node':
        this.updateCoordinatesOfLastDrawElement(event.pageX, event.pageY);

        break;
      default:
        event.preventDefault();
    }
  }

  removeLastElementInDraw() {
    this.setState((prevState) => ({ draw: prevState.draw.slice(0, prevState.draw.length - 1) }));
  }

  removeElementFromGraph() {
    const { removeElement } = this.props;
    const { draw } = this.state;
    const lastElement = draw[draw.length - 1];

    removeElement(lastElement);
    this.removeLastElementInDraw();
  }

  stopDrawing() {
    const { changeMode } = this.props;

    this.removeLastElementInDraw();
    changeMode('none');
  }

  updateCoordinatesOfLastDrawElement(pageX, pageY) {
    const { draw } = this.state;
    const copiedDraw = Array.from(draw);
    const lastElement = copiedDraw[copiedDraw.length - 1];

    lastElement.coorX = utils.calculateCoorX(pageX);
    lastElement.coorY = utils.calculateCoorY(pageY);

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
          {draw.map((element) => (
            <Node
              key={`node-${element.id}`}
              node={element}
            />
          ))}
        </svg>
      </div>
    );
  }
}

Canvas.propTypes = {
  addNode: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  mode: PropTypes.string,
  removeElement: PropTypes.func.isRequired,
};

Canvas.defaultProps = {
  mode: 'none',
};
