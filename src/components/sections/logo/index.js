import React, { PropTypes } from 'react';
import styles from './styles.scss';

const Logo = ({ className, ...others }) => (
  <div
    className={`${styles.logo} ${className}`}
    {...others}
  >CRYPTO<span className={styles.box}>STOCK</span></div>
);

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

Logo.defaultProps = {
  className: '',
};

export default Logo;
