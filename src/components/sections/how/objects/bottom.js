import React, { PropTypes } from 'react';
import styles from './bottom.scss';

const Bottom = ({ light }) => (
  <div className={styles.root}>
    <div className={styles.platform}>
      <div className={styles.top} />
      <div className={styles.left} />
      <div className={light ? styles.frontActive : styles.front} />
      <div className={styles.back} />
      <div className={styles.right} />
    </div>
  </div>
);

Bottom.propTypes = {
  light: PropTypes.bool,
};

export default Bottom;
