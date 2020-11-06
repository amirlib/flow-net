import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import style from './menu.module.scss';

const Menu = (props) => {
  const { edmondsKarp } = props;

  return (
    <div
      id="menu"
      className={style.container}
    >
      <MenuItem
        algorithm={edmondsKarp}
        text="Edmonds Karp"
      />
    </div>
  );
};

Menu.propTypes = {
  edmondsKarp: PropTypes.func.isRequired,
};

export default Menu;
