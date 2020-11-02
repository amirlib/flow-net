import Gca from 'gca';
import React from 'react';
import PropTypes from 'prop-types';
import Canvas from '../Canvas/index';
import Tools from '../Canvas/Tools';
import Header from '../Header/index';
import Menu from '../Menu/index';
import style from './app.module.scss';

const tool = new Gca();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: props.graph,
      nodeButtonDisabled: props.nodeButtonDisabled,
      stopButtonDisabled: props.stopButtonDisabled,
      undoButtonDisabled: props.undoButtonDisabled,
    };
  }

  render() {
    const title = 'Flow Networks';
    const subtitle = 'Designer';
    const {
      graph,
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
        <div className={style.container}>
          <Menu />
          <Canvas
            graph={graph}
          />
          <Tools
            nodeButtonDisabled={nodeButtonDisabled}
            stopButtonDisabled={stopButtonDisabled}
            undoButtonDisabled={undoButtonDisabled}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  graph: PropTypes.instanceOf(Gca.FlowGraph),
  nodeButtonDisabled: PropTypes.bool,
  stopButtonDisabled: PropTypes.bool,
  undoButtonDisabled: PropTypes.bool,
};

App.defaultProps = {
  graph: tool.CreateFlowGraph(),
  nodeButtonDisabled: false,
  stopButtonDisabled: false,
  undoButtonDisabled: false,
};
