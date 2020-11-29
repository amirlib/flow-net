import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import Button from '../Buttons/Button';
import { reset } from '../../actions/graph';
import GraphContext from '../../contexts/graph';
import style from './tools.module.scss';

const Tools = (props) => {
  const { changeMode, mode } = props;

  const { graph, graphDispatch } = useContext(GraphContext);
  const [nodeButtonDisabled, setNodeButtonDisabled] = useState(false);
  const [resetButtonDisabled, setResetButtonDisabled] = useState(true);
  const [stopButtonDisabled, setStopButtonDisabled] = useState(true);
  const [undoButtonDisabled, setUndoButtonDisabled] = useState(true);

  const isGraphInInitiatedState = () => {
    if (graph.countEdges() === 0 && graph.nodesID.length === 2) return true;

    return false;
  };

  const resetGraph = () => graphDispatch(reset());

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
        resetGraph();
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
  mode: PropTypes.string,
};

Tools.defaultProps = {
  mode: 'none',
};

export default Tools;
