import Gca from 'gca';
import React from 'react';
import PropTypes from 'prop-types';
import Canvas from '../Canvas/index';
import Tools from '../Canvas/Tools';
import Header from '../Header/index';
import Menu from '../Menu/index';
import style from './app.module.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.tool = new Gca();
    this.graph = this.tool.CreateFlowGraph();
    this.addEdge = this.addEdge.bind(this);
    this.addNode = this.addNode.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.hasEdge = this.hasEdge.bind(this);
    this.isUndoButtonHadToBeDisabled = this.isUndoButtonHasToBeDisabled.bind(this);
    this.newNodeMode = this.newNodeMode.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.stopMode = this.stopMode.bind(this);
    this.undoMode = this.undoMode.bind(this);
    this.state = {
      mode: props.mode,
      nodeButtonDisabled: props.nodeButtonDisabled,
      stopButtonDisabled: props.stopButtonDisabled,
      undoButtonDisabled: props.undoButtonDisabled,
    };
  }

  addEdge(from, to) {
    this.graph.addEdge(from, to);

    this.setState(() => ({
      mode: 'none',
      nodeButtonDisabled: false,
      stopButtonDisabled: true,
      undoButtonDisabled: this.isUndoButtonHasToBeDisabled(),
    }));
  }

  addNode(id) {
    this.graph.addNode(id);

    this.setState(() => ({
      mode: 'none',
      nodeButtonDisabled: false,
      stopButtonDisabled: true,
      undoButtonDisabled: this.isUndoButtonHasToBeDisabled(),
    }));
  }

  changeMode(mode) {
    switch (mode) {
      case 'none':
        this.setState(() => ({
          mode,
          nodeButtonDisabled: false,
          stopButtonDisabled: true,
          undoButtonDisabled: this.isUndoButtonHasToBeDisabled(),
        }));

        break;
      case 'new-edge':
        this.setState(() => ({
          mode,
          nodeButtonDisabled: true,
          stopButtonDisabled: false,
          undoButtonDisabled: true,
        }));

        break;
      default:
        this.setState(() => ({ mode }));
    }
  }

  hasEdge(from, to) {
    return this.graph.hasEdge(from, to);
  }

  isUndoButtonHasToBeDisabled() {
    if (this.graph.countEdges() === 0 && this.graph.nodesID.length === 2) return true;

    return false;
  }

  newNodeMode() {
    this.setState(() => ({
      mode: 'new-node',
      nodeButtonDisabled: true,
      stopButtonDisabled: false,
      undoButtonDisabled: true,
    }));
  }

  removeElement(element) {
    switch (element.type) {
      case 'edge':
        this.graph.deleteEdge(element.from.id, element.to.id);

        break;
      case 'node':
        this.graph.deleteNode(element.id);

        break;
      default:
        break;
    }

    this.setState(() => ({
      mode: 'none',
      undoButtonDisabled: this.isUndoButtonHasToBeDisabled(),
    }));
  }

  stopMode() {
    this.setState(() => ({
      mode: 'stop',
      nodeButtonDisabled: false,
      stopButtonDisabled: true,
      undoButtonDisabled: this.isUndoButtonHasToBeDisabled(),
    }));
  }

  undoMode() {
    this.setState(() => ({ mode: 'undo' }));
  }

  render() {
    const title = 'Flow Networks';
    const subtitle = 'Designer';
    const {
      mode,
      nodeButtonDisabled,
      stopButtonDisabled,
      undoButtonDisabled,
    } = this.state;

    return (
      <div>
        <Header
          title={title}
          subtitle={subtitle}
        />
        <div
          id="main"
          className={style.container}
        >
          <Menu />
          <Canvas
            mode={mode}
            addEdge={this.addEdge}
            addNode={this.addNode}
            changeMode={this.changeMode}
            hasEdge={this.hasEdge}
            removeElement={this.removeElement}
          />
          <Tools
            nodeButtonDisabled={nodeButtonDisabled}
            newNode={this.newNodeMode}
            stopButtonDisabled={stopButtonDisabled}
            stop={this.stopMode}
            undoButtonDisabled={undoButtonDisabled}
            undo={this.undoMode}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  mode: PropTypes.string,
  nodeButtonDisabled: PropTypes.bool,
  stopButtonDisabled: PropTypes.bool,
  undoButtonDisabled: PropTypes.bool,
};

App.defaultProps = {
  mode: 'none',
  nodeButtonDisabled: false,
  stopButtonDisabled: false,
  undoButtonDisabled: false,
};
