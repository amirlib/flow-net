import Gca from 'gca';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/index';
import 'normalize.css/normalize.css';
import './styles/_base.scss';

const tool = new Gca();

const app = React.createElement(
  App,
  {
    graph: tool.CreateFlowGraph(),
    nodeButtonDisabled: false,
    stopButtonDisabled: true,
    undoButtonDisabled: true,
  },
);

ReactDOM.render(app, document.getElementById('app'));
