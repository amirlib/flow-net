import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Buttons/Button';
import style from './tools.module.scss';

const Tools = (props) => {
  const {
    changeMode,
    isGraphInInitiatedState,
    mode,
    reset,
  } = props;
  const [nodeButtonDisabled, setNodeButtonDisabled] = useState(false);
  const [resetButtonDisabled, setResetButtonDisabled] = useState(true);
  const [stopButtonDisabled, setStopButtonDisabled] = useState(true);
  const [undoButtonDisabled, setUndoButtonDisabled] = useState(true);

  useEffect(() => {
    switch (mode) {
      case 'new-edge':
      case 'new-node':
        setNodeButtonDisabled(true);
        setResetButtonDisabled(true);
        setStopButtonDisabled(false);
        setUndoButtonDisabled(true);

        break;
      case 'reset':
        reset();
        setNodeButtonDisabled(false);
        setResetButtonDisabled(true);
        setStopButtonDisabled(true);
        setUndoButtonDisabled(true);

        break;
      case 'none':
      case 'stop':
      case 'undo':
        setNodeButtonDisabled(false);
        setResetButtonDisabled(isGraphInInitiatedState());
        setStopButtonDisabled(true);
        setUndoButtonDisabled(isGraphInInitiatedState());

        break;
      default:
        break;
    }
  }, [mode]);

  return (
    <div
      id="tools"
      className={style.tools}
    >
      <Button
        func={() => changeMode('new-node')}
        isDisabled={nodeButtonDisabled}
        text="Node"
      />
      <Button
        func={() => changeMode('stop')}
        isDisabled={stopButtonDisabled}
        text="Stop"
      />
      <Button
        func={() => changeMode('undo')}
        isDisabled={undoButtonDisabled}
        text="Undo"
      />
      <Button
        func={() => changeMode('reset')}
        isDisabled={resetButtonDisabled}
        text="Reset"
      />
    </div>
  );
};

Tools.propTypes = {
  changeMode: PropTypes.func.isRequired,
  isGraphInInitiatedState: PropTypes.func.isRequired,
  mode: PropTypes.string,
  reset: PropTypes.func.isRequired,
};

Tools.defaultProps = {
  mode: 'none',
};

export default Tools;
