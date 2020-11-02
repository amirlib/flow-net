import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import style from './menu.module.scss';

const Menu = (props) => {
  const { edmondsAlgorithm } = props;

  return (
    <div className={style.container}>
      <MenuItem
        algorithm={edmondsAlgorithm}
        text="Edmonds Karp"
      />
    </div>
  );
};

Menu.propTypes = {
  edmondsAlgorithm: PropTypes.func.isRequired,
};

export default Menu;
