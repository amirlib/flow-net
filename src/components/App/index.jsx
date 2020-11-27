import Gca from 'gca';
import React from 'react';
import Canvas from '../Canvas/index';
import Tools from '../Canvas/Tools';
import EdgeWindow from '../EdgeWindow/index';
import Header from '../Header/index';
import Menu from '../Menu/index';
import style from './app.module.scss';

export default class App extends React.Component {
  static createEdgeWindowData(display, from, to) {
    return {
      display,
      from,
      to,
    };
  }

  constructor(props) {
    super(props);

    this.tool = new Gca();
    this.graph = this.tool.CreateFlowGraph();
    this.addEdge = this.addEdge.bind(this);
    this.addEdgeData = this.addEdgeData.bind(this);
    this.addNode = this.addNode.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.closeEdgeWindow = this.closeEdgeWindow.bind(this);
    this.edmondsKarp = this.edmondsKarp.bind(this);
    this.hasEdge = this.hasEdge.bind(this);
    this.isGraphInInitiatedState = this.isGraphInInitiatedState.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      edgeWindowData: App.createEdgeWindowData(false, -1, -1),
      mode: 'none',
    };
  }

  addEdge(from, to) {
    this.graph.addEdge(from, to);

    this.setState(() => ({
      edgeWindowData: App.createEdgeWindowData(true, from, to),
    }));
  }

  addEdgeData(from, to, capacity, flow) {
    const edge = this.graph.getEdge(from, to);

    edge.changeCapacityTo(capacity);
    edge.changeFlowTo(flow);

    this.setState(() => ({
      edgeWindowData: App.createEdgeWindowData(false, -1, -1),
      mode: 'none',
    }));
  }

  addNode(id) {
    this.graph.addNode(id);
    this.changeMode('none');
  }

  edmondsKarp() {
    alert(`The max possible flow is: ${this.tool.EdmondsKarp(this.graph)}`);
  }

  changeMode(mode) {
    this.setState(() => ({ mode }));
  }

  closeEdgeWindow() {
    this.setState(() => ({
      edgeWindowData: App.createEdgeWindowData(false, -1, -1),
      mode: 'undo',
    }));
  }

  hasEdge(from, to) {
    return this.graph.hasEdge(from, to);
  }

  isGraphInInitiatedState() {
    if (this.graph.countEdges() === 0 && this.graph.nodesID.length === 2) return true;

    return false;
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

    this.changeMode('none');
  }

  reset() {
    this.graph = this.tool.CreateFlowGraph();
  }

  render() {
    const title = 'Flow Networks';
    const subtitle = 'Designer';
    const { edgeWindowData, mode } = this.state;

    return (
      <div>
        <Header
          title={title}
          subtitle={subtitle}
        />
        <div className={style.notSupported}>
          <p>
            This site do not support small screens due to the inconvenience
            of creating graphs in small screens.
          </p>
        </div>
        <div
          id="main"
          className={style.container}
        >
          <EdgeWindow
            addEdgeData={this.addEdgeData}
            closeEdgeWindow={this.closeEdgeWindow}
            edgeWindowData={edgeWindowData}
          />
          <Menu edmondsKarp={this.edmondsKarp} />
          <Canvas
            mode={mode}
            addEdge={this.addEdge}
            addNode={this.addNode}
            changeMode={this.changeMode}
            hasEdge={this.hasEdge}
            removeElement={this.removeElement}
          />
          <Tools
            changeMode={this.changeMode}
            isGraphInInitiatedState={this.isGraphInInitiatedState}
            mode={mode}
            reset={this.reset}
          />
        </div>
      </div>
    );
  }
}
