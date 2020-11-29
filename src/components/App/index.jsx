import Gca from 'gca';
import React, { useReducer, useState } from 'react';
import Canvas from '../Canvas/index';
import Tools from '../Canvas/Tools';
import EdgeWindow from '../EdgeWindow/index';
import Header from '../Header/index';
import Menu from '../Menu/index';
import * as graphActions from '../../actions/graph';
import GraphContext from '../../contexts/graph';
import graphReducer from '../../reducers/graph';
import style from './app.module.scss';

const App = () => {
  const createEdgeWindowData = (display, from, to) => ({
    display,
    from,
    to,
  });

  const tool = new Gca();
  const getDefaultEdgeWindowData = () => createEdgeWindowData(false, -1, -1);
  const getDefaultMode = () => 'none';

  const [graph, graphDispatch] = useReducer(graphReducer, tool.CreateFlowGraph());
  const [edgeWindowData, setEdgeWindowObject] = useState(getDefaultEdgeWindowData());
  const [mode, setMode] = useState(getDefaultMode());

  const setDefaultEdgeWindowData = () => setEdgeWindowObject(getDefaultEdgeWindowData());
  const setDefaultMode = () => setMode(getDefaultMode());

  const setEdgeWindowData = (display, from, to) => (
    setEdgeWindowObject(createEdgeWindowData(display, from, to))
  );

  const updateEdge = (from, to, capacity, flow) => {
    graphDispatch(graphActions.updateEdge(from, to, capacity, flow));
    setDefaultEdgeWindowData();
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

  const openEdgeWindow = (from, to) => {
    setEdgeWindowData(true, from, to);
  };

  return (
    <GraphContext.Provider value={{ graph, graphDispatch }}>
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
          updateEdge={updateEdge}
          closeEdgeWindow={closeEdgeWindow}
          edgeWindowData={edgeWindowData}
        />
        <Menu edmondsKarp={edmondsKarp} />
        <Canvas
          mode={mode}
          changeMode={changeMode}
          openEdgeWindow={openEdgeWindow}
        />
        <Tools
          changeMode={changeMode}
          mode={mode}
        />
      </div>
    </GraphContext.Provider>
  );
};

export default App;
