import React, { PropTypes } from 'react';
import styles from './top.scss';

const Top = ({ bars, increase, forex, light }) => (
  <div className={styles.root}>
    <div className={styles.platform}>
      <div className={styles.top} />
      <div className={styles.left} />
      <div className={styles.front}>
        <div className={`${
          bars ? styles.barsActive : styles.bars
        } ${
          increase ? styles.barsIncrease : ''
        } ${
          forex ? styles.barsForex : ''
          }`}
        >
          <div className={styles.bar} />
          <div className={styles.bar} />
          <div className={styles.bar} />
          <div className={styles.bar} />
        </div>
      </div>
      <div className={light ? styles.backActive : styles.back} />
      <div className={styles.right} />
      <div className={light ? styles.bottomActive : styles.bottom}>
        <div className={styles.logo1}>CRYPTO</div>
        <div className={styles.logo2}>STOCK</div>
      </div>
    </div>
  </div>
);

Top.propTypes = {
  bars: PropTypes.bool,
  increase: PropTypes.bool,
  forex: PropTypes.bool,
  light: PropTypes.bool,
};

export default Top;
