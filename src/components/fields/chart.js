import React, { PropTypes } from 'react';
import Progress from './progress';
import styles from './chart.scss';

const RADIUS = 25;

const prepareValues = values => values.reduce((prev, curr) => [
  ...prev,
  {
    ...curr,
    offset: prev.length > 0 ? prev[prev.length - 1].offset + prev[prev.length - 1].value : 0,
  },
], []);

export class Chart extends Progress {
  constructor(props) {
    super(props);

    this.state = {
      active: null,
    };

    this.onActive = this.onActive.bind(this);
  }

  onActive(e, index) {
    this.setState({ active: index });
  }

  circularStyle(item) {
    return {
      strokeDasharray: `${2 * Math.PI * RADIUS * this.calculateRatio(item.value)}, 400`,
      strokeDashoffset: -2 * Math.PI * RADIUS * this.calculateRatio(item.offset),
    };
  }

  renderCircular() {
    const { labelItemClassName } = this.props;
    const values = prepareValues(this.props.values);

    return (
      <div>
        <svg className={styles.circle} viewBox="0 0 60 60">
          {values.map((item, index) => (
            <circle
              key={index}
              className={this.state.active === index ? styles.pathActive : styles.path}
              style={this.circularStyle(item)}
              cx="30" cy="30" r={RADIUS}
              onClick={e => this.onActive(e, index)}
              onMouseEnter={e => this.onActive(e, index)}
            />
          ))}
        </svg>
        <div className={styles.label}>
          {values.map((item, index) => (
            <div
              key={index}
              className={`${
                this.state.active === index ? styles.labelItemActive : styles.labelItem
              } ${labelItemClassName}`}
              onClick={e => this.onActive(e, index)}
              onMouseEnter={e => this.onActive(e, index)}
            >{item.value}% - {item.label}</div>
          ))}
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  labelItemClassName: PropTypes.string.isRequired,
};

Chart.defaultProps = {
  values: [],
  type: 'circular',
  mode: 'determinate',
  min: 0,
  max: 100,
  labelItemClassName: '',
};
