import React, { PureComponent } from 'react';
import styles from './under-construction.scss';

class Loader extends PureComponent {
  constructor() {
    super();

    this.state = {
      showLogo: false,
      showBar: false,
      showWarn: false,
      slideLeft: false,
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ showLogo: true });

      setTimeout(() => {
        this.setState({ showBar: true });

        setTimeout(() => {
          this.setState({ showWarn: true });
        }, 700);
      }, 1200);
    }, 300);
  }

  render() {
    return (
      <div className={this.state.slideLeft ? styles.loaderActive : styles.loader}>
        <div className={this.state.showLogo ? styles.logoActive : styles.logo}>
          CRYPTO<span className={styles.logoBox}>STOCK</span>
        </div>
        <div className={this.state.showBar ? styles.barActive : styles.bar} />
        <div className={this.state.showWarn ? styles.warnActive : styles.warn}>
          UNDER CONSTRUCTION
        </div>
      </div>
    );
  }
}

export default Loader;
