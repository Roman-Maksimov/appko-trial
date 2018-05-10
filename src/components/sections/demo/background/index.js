import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import prefixer from 'utils/prefixer';
import styles from './styles.scss';

class Background extends PureComponent {
  constructor() {
    super();

    this.state = {
      scale: 1,
    };

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    const rect = this.refs.background.getBoundingClientRect();
    const height = rect.bottom - rect.top;
    const middle = rect.top + Math.ceil(height / 2);
    const windowMiddle = Math.ceil(window.innerHeight / 2);

    let scale = 1;

    if (middle < 0) {
      scale = 2;
    } else if (middle > windowMiddle + height) {
      scale = 0;
    } else {
      scale = 2 - middle / windowMiddle;
    }

    this.setState({ scale });
  }

  render() {
    const { viewport } = this.props;
    const length = Math.ceil(viewport.screenWidth / 308);

    return (
      <div ref="background" className={styles.background}>
        <svg className={styles.chart} viewBox="0 0 130 80">
          <polyline
            className={styles.chartLine}
            points="0,80 20,50 40,70 70,30 90,50 130,0"
          />
          <polyline
            className={styles.chartShadow}
            points="0,80 20,50 40,70 70,30 90,50 130,0"
          />
        </svg>
        <div
          className={styles.barsContainer}
          style={prefixer({
            transform: `scaleY(${this.state.scale})`,
          })}
        >
          {Array.apply(null, { length }).map((block, blockIndex) => (
            <div key={blockIndex} className={styles.bars}>
              {Array.apply(null, { length: 22 }).map((line, lineIndex) => (
                <div
                  key={lineIndex}
                  className={styles.barsLine}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Background.propTypes = {
  viewport: PropTypes.shape({
    screenWidth: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  viewport: state.viewport,
});

export default connect(mapStateToProps)(Background);
