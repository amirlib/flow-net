import React from 'react';
import PropTypes from 'prop-types';
import style from './node.module.scss';

const Node = (props) => {
  const { node, updateNodeIdWhenMouseHover } = props;

  const nodeMouseEnter = () => {
    updateNodeIdWhenMouseHover(node.id);
  };

  const nodeMouseOut = () => {
    updateNodeIdWhenMouseHover(undefined);
  };

  return (
    <circle
      className={style.node}
      cx={node.coorX}
      cy={node.coorY}
      r={node.radius}
      onMouseEnter={nodeMouseEnter}
      onMouseOut={nodeMouseOut}
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
  updateNodeIdWhenMouseHover: PropTypes.func.isRequired,
};

export default Node;
