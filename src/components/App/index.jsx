import Gca from 'gca';
import React, { useReducer, useState } from 'react';
import Canvas from '../Canvas/index';
import Tools from '../Canvas/Tools';
import Header from '../Header/index';
import Menu from '../Menu/index';
import GraphContext from '../../contexts/graph';
import graphReducer from '../../reducers/graph';
import style from './app.module.scss';

const App = () => {
  const tool = new Gca();
  const getDefaultMode = () => 'none';

  const [graph, graphDispatch] = useReducer(graphReducer, tool.CreateFlowGraph());
  const [mode, setMode] = useState(getDefaultMode());

  const edmondsKarp = () => {
    alert(`The max possible flow is: ${tool.EdmondsKarp(graph)}`);
  };

  const changeMode = (value) => {
    setMode(value);
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
        <Menu edmondsKarp={edmondsKarp} />
        <Canvas
          changeMode={changeMode}
          mode={mode}
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
