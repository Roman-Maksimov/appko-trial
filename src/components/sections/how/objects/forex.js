import React from 'react';
import styles from './forex.scss';

const Forex = () => (
  <div className={styles.root}>
    <div className={styles.platform}>
      <div className={styles.top} />
      <div className={styles.left} />
      <div className={styles.front}>
        <div>
          <span>Futures</span><br />
          <span>ETF</span><br />
          Forex
        </div>
      </div>
      <div className={styles.back} />
      <div className={styles.right} />
    </div>
  </div>
);

export default Forex;
