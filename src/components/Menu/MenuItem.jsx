import React from 'react';
import PropTypes from 'prop-types';
import style from './menu.module.scss';

const MenuItem = (props) => {
  const { algorithm, text } = props;

  return (
    <button
      className={style.item}
      onClick={algorithm}
      type="button"
    >
      {text}
    </button>
  );
};

MenuItem.propTypes = {
  algorithm: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default MenuItem;
