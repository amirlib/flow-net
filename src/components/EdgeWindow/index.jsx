/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Buttons/Button';
import style from './window.module.scss';

const EdgeWindow = (props) => {
  const [capacity, setCapacity] = useState(1);
  const [flow, setFlow] = useState(0);

  const setDefaultValues = () => {
    setCapacity(1);
    setFlow(0);
  };

  const create = () => {
    const { onSubmit } = props;

    setDefaultValues();
    onSubmit(capacity, flow);
  };

  const onCancelClick = () => {
    const { onCancel } = props;

    setDefaultValues();
    onCancel();
  };

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
    const { open } = props;

    if (open) return 'flex';

    return 'none';
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
            func={create}
            text="Create"
          />

          <Button
            func={onCancelClick}
            text="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

EdgeWindow.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default EdgeWindow;
