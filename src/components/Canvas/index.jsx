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
    this.removeLastElementInGraph = this.removeLastElementInGraph.bind(this);
    this.state = {
      graph: [
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
        this.removeLastElementInGraph();

        break;
      default:
        break;
    }
  }

  setNode(coorX, coorY) {
    const { graph } = this.state;
    const node = Canvas.createNodeElement(graph.length, coorX, coorY);

    this.setState((prevState) => ({ graph: prevState.graph.concat([node]) }));
  }

  canvasClick(event) {
    const { addNode, mode } = this.props;
    const { graph } = this.state;
    const lastElement = graph[graph.length - 1];

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
        this.updateCoordinatesOfLastGraphObject(event.pageX, event.pageY);

        break;
      default:
        event.preventDefault();
    }
  }

  removeLastElementInGraph() {
    const { changeMode } = this.props;

    this.setState((prevState) => ({ graph: prevState.graph.slice(0, prevState.graph.length - 1) }));

    changeMode('none');
  }

  updateCoordinatesOfLastGraphObject(pageX, pageY) {
    const { graph } = this.state;
    const copiedGraph = Array.from(graph);
    const lastElement = copiedGraph[copiedGraph.length - 1];

    lastElement.coorX = utils.calculateCoorX(pageX);
    lastElement.coorY = utils.calculateCoorY(pageY);

    this.setState(() => ({ graph: copiedGraph }));
  }

  render() {
    const { graph } = this.state;

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
          {graph.map((element) => (
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
};

Canvas.defaultProps = {
  mode: 'none',
};
