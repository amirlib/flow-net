import React from 'react';
import PropTypes from 'prop-types';
import nodeStyle from './node.module.scss';

const Node = (props) => {
  // const { node, idFromNode } = props;
  const { node } = props;
  // const nodeMouseEnter = () => {
  //   idFromNode(node.id);
  // };

  // const nodeMouseOut = () => {
  //   idFromNode(undefined);
  // };

  // onMouseEnter = { nodeMouseEnter }
  // onMouseOut = { nodeMouseOut }
  return (
    <circle
      className={nodeStyle.node}
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
  // idFromNode: PropTypes.func.isRequired,
};

export default Node;
