/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Buttons/Button';
import style from './window.module.scss';

const EdgeWindow = (props) => {
  const { closeEdgeWindow } = props;
  const [capacity, setCapacity] = useState(1);
  const [flow, setFlow] = useState(0);

  const onCapacityChange = (e) => {
    const { value } = e.target;

    if (!value) {
      setCapacity(1);
    } else if (value.match(/^\d{1,}$/)) {
      setCapacity(parseInt(value, 10));
    }
  };

  const onFlowChange = (e) => {
    const { value } = e.target;

    if (!value) {
      setFlow(0);
    } else if (value.match(/^\d{1,}$/)) {
      setFlow(parseInt(value, 10));
    }
  };

  const parseDisplayValue = () => {
    const { edgeWindowData } = props;

    if (edgeWindowData.display) return 'flex';

    return 'none';
  };

  const updateEdgeData = () => {
    const { addEdgeData, edgeWindowData } = props;

    addEdgeData(edgeWindowData.from, edgeWindowData.to, capacity, flow);
    setCapacity(1);
    setFlow(0);
  };

  return (
    <div
      className={style.root}
      style={{ display: parseDisplayValue() }}
    >
      <div className={style.container}>
        <p>
          Please insert integer values of capacity and flow for the new edge.
        </p>
        <p>The default values are 1 for the capacity and 0 to flow.</p>
        <p>Note that Edmonds Karp algorithm ignores flow values of the edges.</p>

        <div className={style.form}>
          <label
            className={style.label}
            htmlFor="capacity"
          >
            Capacity
          </label>
          <input
            alt="capacity"
            className={style.input}
            id="capacity"
            onChange={onCapacityChange}
            type="text"
            value={capacity}
          />
        </div>

        <div className={style.form}>
          <label
            className={style.label}
            htmlFor="flow"
          >
            Flow
          </label>
          <input
            alt="flow"
            className={style.input}
            onChange={onFlowChange}
            id="flow"
            type="text"
            value={flow}
          />
        </div>

        <div className={style.form}>
          <Button
            func={updateEdgeData}
            text="Create"
          />

          <Button
            func={closeEdgeWindow}
            text="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

EdgeWindow.propTypes = {
  addEdgeData: PropTypes.func.isRequired,
  closeEdgeWindow: PropTypes.func.isRequired,
  edgeWindowData: PropTypes.shape({
    display: PropTypes.bool.isRequired,
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  }).isRequired,
};

export default EdgeWindow;
