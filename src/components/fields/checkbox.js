import React, { PropTypes } from 'react';
import styles from './checkbox.scss';

export const Checkbox = ({ className, label, input: { value, ...others } }) => (
  <label className={className}>
    <input
      type="checkbox"
      className={styles.input}
      checked={value}
      value={value}
      {...others}
    />
    {label}
  </label>
);

Checkbox.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  input: PropTypes.object,
};

Checkbox.defaultProps = {
  className: '',
};
