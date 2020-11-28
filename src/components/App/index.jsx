import Gca from 'gca';
import React, { useState } from 'react';
import Canvas from '../Canvas/index';
import Tools from '../Canvas/Tools';
import EdgeWindow from '../EdgeWindow/index';
import Header from '../Header/index';
import Menu from '../Menu/index';
import style from './app.module.scss';

const App = () => {
  const createEdgeWindowData = (display, from, to) => ({
    display,
    from,
    to,
  });

  const tool = new Gca();
  const getDefaultEdgeWindowData = () => createEdgeWindowData(false, -1, -1);
  const getDefaultGraph = () => tool.CreateFlowGraph();
  const getDefaultMode = () => 'none';

  const [edgeWindowData, setEdgeWindowObject] = useState(getDefaultEdgeWindowData());
  const [graph, setGraph] = useState(getDefaultGraph());
  const [mode, setMode] = useState(getDefaultMode());

  const setDefaultEdgeWindowData = () => setEdgeWindowObject(getDefaultEdgeWindowData());
  const setDefaultGraph = () => setGraph(getDefaultGraph());
  const setDefaultMode = () => setMode(getDefaultMode());

  const setEdgeWindowData = (display, from, to) => (
    setEdgeWindowObject(createEdgeWindowData(display, from, to))
  );

  const addEdge = (from, to) => {
    graph.addEdge(from, to);
    setGraph(graph);
    setEdgeWindowData(true, from, to);
  };

  const addEdgeData = (from, to, capacity, flow) => {
    const edge = graph.getEdge(from, to);

    edge.changeCapacityTo(capacity);
    edge.changeFlowTo(flow);
    setDefaultEdgeWindowData();
    setGraph(graph);
    setDefaultMode();
  };

  const addNode = (id) => {
    graph.addNode(id);
    setGraph(graph);
    setDefaultMode();
  };

  const edmondsKarp = () => {
    alert(`The max possible flow is: ${tool.EdmondsKarp(graph)}`);
  };

  const changeMode = (value) => {
    setMode(value);
  };

  const closeEdgeWindow = () => {
    setDefaultEdgeWindowData();
    setMode('undo');
  };

  const hasEdge = (from, to) => graph.hasEdge(from, to);

  const isGraphInInitiatedState = () => {
    if (graph.countEdges() === 0 && graph.nodesID.length === 2) return true;

    return false;
  };

  const removeElement = (element) => {
    switch (element.type) {
      case 'edge':
        graph.deleteEdge(element.from.id, element.to.id);
        setGraph(graph);

        break;
      case 'node':
        graph.deleteNode(element.id);
        setGraph(graph);

        break;
      default:
        break;
    }

    setDefaultMode();
  };

  const reset = () => {
    setDefaultGraph();
  };

  return (
    <div>
      <Header
        title="Flow Networks"
        subtitle="Designer"
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
          addEdgeData={addEdgeData}
          closeEdgeWindow={closeEdgeWindow}
          edgeWindowData={edgeWindowData}
        />
        <Menu edmondsKarp={edmondsKarp} />
        <Canvas
          mode={mode}
          addEdge={addEdge}
          addNode={addNode}
          changeMode={changeMode}
          hasEdge={hasEdge}
          removeElement={removeElement}
        />
        <Tools
          changeMode={changeMode}
          isGraphInInitiatedState={isGraphInInitiatedState}
          mode={mode}
          reset={reset}
        />
      </div>
    </div>
  );
};

export default App;
