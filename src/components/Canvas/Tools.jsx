import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Buttons/Button';
import style from './tools.module.scss';

const Tools = (props) => {
  const {
    newNode,
    nodeButtonDisabled,
    reset,
    resetButtonDisabled,
    stop,
    stopButtonDisabled,
    undo,
    undoButtonDisabled,
  } = props;

  return (
    <div
      id="tools"
      className={style.tools}
    >
      <Button
        func={newNode}
        isDisabled={nodeButtonDisabled}
        text="Node"
      />
      <Button
        func={stop}
        isDisabled={stopButtonDisabled}
        text="Stop"
      />
      <Button
        func={undo}
        isDisabled={undoButtonDisabled}
        text="Undo"
      />
      <Button
        func={reset}
        isDisabled={resetButtonDisabled}
        text="Reset"
      />
    </div>
  );
};

Tools.propTypes = {
  newNode: PropTypes.func.isRequired,
  nodeButtonDisabled: PropTypes.bool,
  reset: PropTypes.func.isRequired,
  resetButtonDisabled: PropTypes.bool,
  stop: PropTypes.func.isRequired,
  stopButtonDisabled: PropTypes.bool,
  undo: PropTypes.func.isRequired,
  undoButtonDisabled: PropTypes.bool,
};

Tools.defaultProps = {
  nodeButtonDisabled: false,
  resetButtonDisabled: false,
  stopButtonDisabled: false,
  undoButtonDisabled: false,
};

export default Tools;
