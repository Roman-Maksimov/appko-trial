import React, { PureComponent, PropTypes } from 'react';
import styles from './styles.scss';

class Background extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.bottom} />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    );
  }
}

Background.propTypes = {
  children: PropTypes.any,
};

export default Background;
