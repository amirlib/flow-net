import React from 'react';
import PropTypes from 'prop-types';
import style from './edge.module.scss';

const Edge = (props) => {
  const { edge } = props;

  return (
    <line
      className={style.edge}
      x1={edge.from.coorX}
      y1={edge.from.coorY}
      x2={edge.to.coorX}
      y2={edge.to.coorY}
    />
  );
};

Edge.propTypes = {
  edge: PropTypes.shape({
    from: PropTypes.shape({
      coorX: PropTypes.number.isRequired,
      coorY: PropTypes.number.isRequired,
    }).isRequired,
    to: PropTypes.shape({
      coorX: PropTypes.number.isRequired,
      coorY: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Edge;
