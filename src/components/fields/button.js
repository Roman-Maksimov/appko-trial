import React, { PropTypes } from 'react';
import styles from './button.scss';

export const Button = ({ accent, className, label, ...others }) => (
  <button
    className={`${accent ? styles.rootAccent : styles.root} ${className}`}
    {...others}
  >{label}</button>
);

Button.propTypes = {
  accent: PropTypes.bool,
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};
