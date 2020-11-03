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
    this.addNode = this.addNode.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.isUndoButtonHadToBeDisabled = this.isUndoButtonHadToBeDisabled.bind(this);
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

  addNode(id) {
    this.graph.addNode(id);

    this.setState(() => ({
      mode: 'none',
      nodeButtonDisabled: false,
      stopButtonDisabled: true,
      undoButtonDisabled: this.isUndoButtonHadToBeDisabled(),
    }));
  }

  changeMode(mode) {
    this.setState(() => ({ mode }));
  }

  isUndoButtonHadToBeDisabled() {
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
      case 'node':
        this.graph.deleteNode(element.id);

        break;
      default:
        break;
    }

    this.setState(() => ({
      mode: 'none',
      undoButtonDisabled: this.isUndoButtonHadToBeDisabled(),
    }));
  }

  stopMode() {
    this.setState(() => ({
      mode: 'stop',
      nodeButtonDisabled: false,
      stopButtonDisabled: true,
      undoButtonDisabled: this.isUndoButtonHadToBeDisabled(),
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
            addNode={this.addNode}
            changeMode={this.changeMode}
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
