import React, { PropTypes, PureComponent } from 'react';
import styles from './styles.scss';

const ARROW_LEFT_KEYDOWN = 37;
const ARROW_RIGHT_KEYDOWN = 39;

class Slider extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      index: 0,
      total: props.total || props.children.length || 1,
    };

    this.changePage = this.changePage.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onFinishClick = this.onFinishClick.bind(this);
    this.onArrowClick = this.onArrowClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onArrowClick);
  }

  componentWillUnmount() {
    const { clearOnClose } = this.props;

    window.removeEventListener('keydown', this.onArrowClick);

    if (clearOnClose) {
      this.setState({ index: 0 });
    }
  }

  componentWillReceiveProps(nextProps) {
    const total = nextProps.total || nextProps.children.length || 1;

    if (this.state.total !== total) {
      const index = this.state.index < total ? this.state.index : total - 1;
      this.setState({ index, total });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.index !== this.state.index) {
      this.props.onChange(nextState.index, this.state.index);
    }
  }

  onArrowClick({ keyCode }) {
    const { showFinishIcon } = this.props;

    switch (keyCode) {
      case ARROW_LEFT_KEYDOWN:
        if (this.state.index) {
          this.onBackClick();
        }

        break;

      case ARROW_RIGHT_KEYDOWN:
        if (this.state.index < this.state.total - 1) {
          this.onNextClick();
        } else if (showFinishIcon) {
          this.onFinishClick();
        }

        break;

      default:
        break;
    }
  }

  changePage(index) {
    this.setState({ index });
  }

  onBackClick() {
    this.changePage(this.state.index - 1);
    this.props.onBackClick(this.state.index - 1, this.state.index);
  }

  onNextClick() {
    this.changePage(this.state.index + 1);
    this.props.onNextClick(this.state.index + 1, this.state.index);
  }

  onFinishClick() {
    this.props.onFinishClick(this.state.index);
  }

  render() {
    const {
      activeIndex, showFinishIcon, animation,
      pageClassName, pagesClassName, pageComponent,
      arrowBackClassName, arrowNextClassName,
      children, className, isShowPages,
      isShowProgress, progressClassName,
    } = this.props;
    const hasLeftArrow = this.state.index > 0;
    const hasRightArrow = this.state.index < this.state.total - 1;
    const hasFinishIcon = showFinishIcon && !hasRightArrow;
    const hasPages = this.state.total > 1;
    const pages = [];
    const slides = [];

    for (let i = 0; i < this.state.total; i++) {
      const slide = children.length > 1 ? children[i] : children;

      slides.push(
        i === this.state.index || animation
          ? (
            <div key={`slide-${i}`} className={styles.slide}>
              {slide}
            </div>
          )
          : <div key={`slide-${i}`} className={styles.slide} />
      );

      if (hasPages) {
        if (i < this.state.total - 1) {
          slides.push(<div key={`slide-empty-${i}`} className={styles.slide} />);
        }

        const isActive = this.state.index === i;
        const pageProps = {
          key: `page-${i}`,
          className: `${isActive ? styles.pageActive : styles.page} ${pageClassName}`,
          onClick: () => this.changePage(i),
        };

        pages.push(pageComponent ? React.createElement(pageComponent, {
          ...pageProps,
          isActive,
          index: i,
        }) : (
          <div {...pageProps} />
        ));
      }
    }

    const currIndex = activeIndex !== undefined ? activeIndex : this.state.index;

    return (
      <div className={`${styles.sliderContainer} ${className}`}>
        <div className={styles.root}>
          <div
            className={animation ? styles.slidesAnimation : styles.slides}
            style={{
              width: `${100 * (this.state.total * 2 - 1)}%`,
              left: `${200 - 200 * (currIndex + 1)}%`,
            }}
          >
            {slides}
          </div>
          {hasLeftArrow && (
            <div
              className={`${styles.arrowBack} ${arrowBackClassName}`}
              onClick={this.onBackClick}
            >keyboard_arrow_left</div>
          )}
          {hasRightArrow && (
            <div
              className={`${styles.arrowNext} ${arrowNextClassName}`}
              onClick={this.onNextClick}
            >keyboard_arrow_right</div>
          )}
          {hasFinishIcon && (
            <div
              className={styles.arrowFinish}
              onClick={this.onFinishClick}
            />
          )}
          {isShowPages && hasPages && (
            <div className={`${styles.pages} ${pagesClassName}`}>
              {pages}
            </div>
          )}
          {isShowProgress && hasPages && (
            <div className={`${styles.progress} ${progressClassName}`}>
              <div className={styles.progressBack}>
                <div
                  className={styles.progressPointer}
                  style={{
                    left: `${100 * this.state.index / (this.state.total - 1)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  clearOnClose: PropTypes.bool.isRequired,
  total: PropTypes.number,
  activeIndex: PropTypes.number,
  showFinishIcon: PropTypes.bool,
  animation: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  pageClassName: PropTypes.string.isRequired,
  pagesClassName: PropTypes.string.isRequired,
  progressClassName: PropTypes.string.isRequired,
  arrowBackClassName: PropTypes.string.isRequired,
  arrowNextClassName: PropTypes.string.isRequired,
  pageComponent: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onFinishClick: PropTypes.func.isRequired,
  isShowPages: PropTypes.bool.isRequired,
  isShowProgress: PropTypes.bool.isRequired,
};

Slider.defaultProps = {
  className: '',
  pageClassName: '',
  pagesClassName: '',
  progressClassName: '',
  arrowBackClassName: '',
  arrowNextClassName: '',
  clearOnClose: true,
  animation: true,
  isShowPages: false,
  onChange: () => {},
  onBackClick: () => {},
  onNextClick: () => {},
  onFinishClick: () => {},
};

export default Slider;
