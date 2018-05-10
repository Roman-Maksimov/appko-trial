import React, { PropTypes } from 'react';
import styles from './layer-fx.scss';

const LayerFx = ({ active }) => (
  <div className={active ? styles.rootActive : styles.root}>
    <div className={styles.back} />
  </div>
);

LayerFx.propTypes = {
  active: PropTypes.bool,
};

export default LayerFx;
