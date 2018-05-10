import React, { PropTypes } from 'react';
import styles from './layer.scss';

const Layer = ({ active }) => (
  <div className={active ? styles.rootActive : styles.root}>
    <div className={styles.back} />
  </div>
);

Layer.propTypes = {
  active: PropTypes.bool,
};

export default Layer;
