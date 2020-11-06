import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/index';
import 'normalize.css/normalize.css';
import './styles/_base.scss';

const app = React.createElement(
  App,
  {
    mode: 'none',
    nodeButtonDisabled: false,
    resetButtonDisabled: true,
    stopButtonDisabled: true,
    undoButtonDisabled: true,
  },
);

ReactDOM.render(app, document.getElementById('app'));
