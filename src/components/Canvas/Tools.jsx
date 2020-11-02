import React from 'react';
import PropTypes from 'prop-types';
import Tool from './Tool';
import style from './tools.module.scss';

const Tools = (props) => {
  const {
    newNode,
    nodeButtonDisabled,
    stop,
    stopButtonDisabled,
    undo,
    undoButtonDisabled,
  } = props;

  return (
    <div className={style.tools}>
      <Tool
        func={newNode}
        isDisabled={nodeButtonDisabled}
        text="Node"
      />
      <Tool
        func={stop}
        isDisabled={stopButtonDisabled}
        text="Stop"
      />
      <Tool
        func={undo}
        isDisabled={undoButtonDisabled}
        text="Undo"
      />
    </div>
  );
};

Tools.propTypes = {
  newNode: PropTypes.func.isRequired,
  nodeButtonDisabled: PropTypes.bool,
  stop: PropTypes.func.isRequired,
  stopButtonDisabled: PropTypes.bool,
  undo: PropTypes.func.isRequired,
  undoButtonDisabled: PropTypes.bool,
};

Tools.defaultProps = {
  nodeButtonDisabled: false,
  stopButtonDisabled: false,
  undoButtonDisabled: false,
};

export default Tools;
