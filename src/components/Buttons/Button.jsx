import React from 'react';
import PropTypes from 'prop-types';
import style from './buttons.module.scss';

const Button = (props) => {
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

Button.propTypes = {
  func: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  isDisabled: false,
};

export default Button;
