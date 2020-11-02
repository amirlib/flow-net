import React from 'react';
import PropTypes from 'prop-types';
import style from './header.module.scss';

const Header = (props) => {
  const { title, subtitle } = props;

  return (
    <div className={style.header}>
      <div className={style.container}>
        <h1 className={style.title}>{title}</h1>
        <h2 className={style.subtitle}>{subtitle}</h2>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

Header.defaultProps = {
  subtitle: 'Designer',
};

export default Header;
