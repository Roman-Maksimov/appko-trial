import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { loaderHide } from 'src/actions';
import Langs from 'src/components/langs';
import Ico from 'src/components/sections/ico';
import styles from './styles.scss';

const ARROW_UP_KEYDOWN = 38;
const ARROW_DOWN_KEYDOWN = 40;

export class Loader extends PureComponent {
  constructor() {
    super();

    this.state = {
      showLogo: false,
      showBar: false,
      showIco: false,
      showScroll: false,
      collapse: false,
    };

    this.swipe = {
      started: false,
      detecting: false,
      touch: null,
      x: 0,
      y: 0,
      delta: 0,
    };

    this.initEvents = this.initEvents.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showLogo: true });

      setTimeout(() => {
        this.setState({ showBar: true });

        setTimeout(() => {
          this.setState({ showScroll: true, showIco: true });
          this.initEvents();
        }, 400);
      }, 900);
    }, 300);
  }

  componentWillUnmount() {
    this.deinitEvents();
  }

  onKeyDown({ keyCode }) {
    switch (keyCode) {
      case ARROW_UP_KEYDOWN:
      case ARROW_DOWN_KEYDOWN:
        this.onWheel();
        break;

      default:
        break;
    }
  }

  initEvents() {
    window.addEventListener('keydown', this.onKeyDown);
    this.refs.container.addEventListener('wheel', this.onWheel);
    this.refs.container.addEventListener('scroll', this.onWheel);
  }

  deinitEvents() {
    window.removeEventListener('keydown', this.onKeyDown);
    this.refs.container.removeEventListener('wheel', this.onWheel);
    this.refs.container.removeEventListener('scroll', this.onWheel);
  }

  onTouchStart(e) {
    if (!e.changedTouches) {
      // TouchEvents are not supported
      return;
    }

    if (e.touches.length !== 1 || this.swipe.started) {
      return;
    }

    this.swipe.detecting = true;

    this.swipe.touch = e.changedTouches.item(0);
    this.swipe.x = this.swipe.touch.pageX;
    this.swipe.y = this.swipe.touch.pageY;
  }

  onTouchMove(e) {
    if (!e.changedTouches) {
      // TouchEvents are not supported
      return;
    }

    if (!this.swipe.started && !this.swipe.detecting) {
      return;
    }

    const touch = e.changedTouches.item(0);

    if (!touch || touch.identifier !== this.swipe.touch.identifier) {
      return;
    }

    const newX = touch.pageX;
    const newY = touch.pageY;

    if (this.swipe.detecting) {
      // If the vertical shifting is more then horizontal, this is a swiping
      this.swipe.started = Math.abs(this.swipe.y - newY) >= Math.abs(this.swipe.x - newX);
      this.swipe.detecting = false;
    }

    if (this.swipe.started) {
      this.swipe.delta = this.swipe.y - newY;

      if (this.swipe.delta !== 0) {
        const top = parseInt(this.refs.container.style.top, 10) - this.swipe.delta;
        this.refs.container.style.marginTop = `${top}px`;
      }
    }
  }

  onTouchEnd(e) {
    if (!e.changedTouches) {
      // TouchEvents are not supported
      return;
    }

    const touch = e.changedTouches.item(0);

    if (!touch || touch.identifier !== this.swipe.touch.identifier || !this.swipe.started) {
      return;
    }

    const { animation } = this.props;

    let slideChanged = false;

    if (this.swipe.delta !== 0) {
      slideChanged = this.onWheel();
    }

    if (animation && slideChanged) {
      setTimeout(() => {
        this.refs.container.style.marginTop = 0;
      }, 300);
    } else {
      this.refs.container.style.marginTop = 0;
    }

    this.swipe.delta = 0;
    this.swipe.started = false;
  }

  onWheel() {
    this.setState({ collapse: true });

    setTimeout(() => {
      this.props.onHideLoader();
    }, 500);
  }

  render() {
    return (
      <div
        ref="container"
        className={this.state.collapse ? styles.loaderActive : styles.loader}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      >
        <Langs className={styles.langs} />
        <div className={this.state.showLogo ? styles.logoActive : styles.logo}>
          CRYPTO<span className={styles.logoBox}>STOCK</span>
        </div>
        <div className={this.state.showBar ? styles.barActive : styles.bar} />
        <Ico className={this.state.showIco ? styles.icoActive : styles.ico} />
        <div
          className={this.state.showScroll ? styles.scrollActive : styles.scroll}
          onClick={this.onWheel}
        />
      </div>
    );
  }
}

Loader.propTypes = {
  onHideLoader: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onHideLoader: () => dispatch(loaderHide()),
});

const LoaderContainer = connect(null, mapDispatchToProps)(Loader);

export default LoaderContainer;
