import React, { PropTypes } from 'react';
import styles from './exchange.scss';

const Exchange = ({ title, hover, bars, users, className }) => (
  <div className={`${styles.root} ${hover ? styles.hover : ''} ${className}`}>
    <div className={styles.platform}>
      <div className={styles.top} />
      <div className={styles.left} />
      <div className={styles.front}>
        <div className={bars ? styles.barsActive : styles.bars}>
          <div className={styles.bar} />
          <div className={styles.bar} />
          <div className={styles.bar} />
          <div className={styles.bar} />
        </div>
        {title}
      </div>
      <div className={styles.back} />
      <div className={styles.right} />
    </div>
    <div className={users ? styles.usersActive : styles.users}>
      <div className={styles.user}>
        <div className={styles.userLine} />
      </div>
      <div className={styles.user}>
        <div className={styles.userLine} />
      </div>
      <div className={styles.user}>
        <div className={styles.userLine} />
      </div>
    </div>
  </div>
);

Exchange.propTypes = {
  title: PropTypes.string,
  hover: PropTypes.bool,
  bars: PropTypes.bool,
  users: PropTypes.bool,
  className: PropTypes.string.isRequired,
};

Exchange.defaultProps = {
  className: '',
};

export default Exchange;
