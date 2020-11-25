/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Buttons/Button';
import style from './window.module.scss';

export default class EdgeWindow extends React.Component {
  constructor(props) {
    super(props);

    this.onCapacityChange = this.onCapacityChange.bind(this);
    this.onFlowChange = this.onFlowChange.bind(this);
    this.parseDisplayValue = this.parseDisplayValue.bind(this);
    this.updateEdgeData = this.updateEdgeData.bind(this);
    this.state = {
      capacity: 1,
      flow: 0,
    };
  }

  onCapacityChange(e) {
    const capacity = e.target.value;

    if (!capacity) {
      this.setState(() => ({ capacity: 1 }));
    } else if (capacity.match(/^\d{1,}$/)) {
      this.setState(() => ({ capacity: parseInt(capacity, 10) }));
    }
  }

  onFlowChange(e) {
    const flow = e.target.value;

    if (!flow) {
      this.setState(() => ({ flow: 0 }));
    } else if (flow.match(/^\d{1,}$/)) {
      this.setState(() => ({ flow: parseInt(flow, 10) }));
    }
  }

  parseDisplayValue() {
    const { edgeWindowData } = this.props;

    if (edgeWindowData.display) return 'flex';

    return 'none';
  }

  updateEdgeData() {
    const { addEdgeData, edgeWindowData } = this.props;
    const { capacity, flow } = this.state;

    addEdgeData(edgeWindowData.from, edgeWindowData.to, capacity, flow);

    this.setState(() => ({
      capacity: 1,
      flow: 0,
    }));
  }

  render() {
    const { closeEdgeWindow } = this.props;
    const { capacity, flow } = this.state;

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
              onChange={this.onCapacityChange}
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
              onChange={this.onFlowChange}
              id="flow"
              type="text"
              value={flow}
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
