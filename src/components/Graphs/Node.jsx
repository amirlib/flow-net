import React from 'react';
import PropTypes from 'prop-types';
import style from './node.module.scss';

const Node = (props) => {
  const { node } = props;

  return (
    <circle
      className={style.node}
      cx={node.coorX}
      cy={node.coorY}
      r={node.radius}
    />
  );
};

Node.propTypes = {
  node: PropTypes.shape({
    coorX: PropTypes.number.isRequired,
    coorY: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
  }).isRequired,
};

export default Node;
