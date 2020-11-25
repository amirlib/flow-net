/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Buttons/Button';
import style from './window.module.scss';

export default class EdgeWindow extends React.Component {
  constructor(props) {
    super(props);

    this.parseDisplayValue = this.parseDisplayValue.bind(this);
    this.updateEdgeData = this.updateEdgeData.bind(this);
  }

  parseDisplayValue() {
    const { edgeWindowData } = this.props;

    if (edgeWindowData.display) return 'flex';

    return 'none';
  }

  updateEdgeData() {
    const { addEdgeData, edgeWindowData } = this.props;

    let capacity = parseInt(document.getElementById('capacity').value, 10);
    let flow = parseInt(document.getElementById('flow').value, 10);

    if (Number.isNaN(capacity) || capacity < 0) capacity = 1;
    if (Number.isNaN(flow)) flow = 0;

    addEdgeData(edgeWindowData.from, edgeWindowData.to, capacity, flow);
  }

  render() {
    const { closeEdgeWindow } = this.props;

    return (
      <div
        className={style.root}
        style={{ display: this.parseDisplayValue() }}
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
              type="text"
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
              className={style.input}
              type="number"
              id="flow"
              alt="flow"
            />
          </div>

          <div className={style.form}>
            <Button
              func={this.updateEdgeData}
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
  }
}

EdgeWindow.propTypes = {
  addEdgeData: PropTypes.func.isRequired,
  closeEdgeWindow: PropTypes.func.isRequired,
  edgeWindowData: PropTypes.shape({
    display: PropTypes.bool.isRequired,
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  }).isRequired,
};
