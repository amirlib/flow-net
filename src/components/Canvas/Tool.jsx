import React from 'react';
import PropTypes from 'prop-types';
import style from './tools.module.scss';

const Tool = (props) => {
  const { func, isDisabled, text } = props;

  return (
    <button
      className={style.button}
      disabled={isDisabled}
      onClick={func}
      type="button"
    >
      {text}
    </button>
  );
};

Tool.propTypes = {
  func: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Tool;
