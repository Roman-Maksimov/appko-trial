import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import Block from 'src/components/block';
import { Chart } from 'src/components/fields';
import styles from './styles.scss';

const TOKENS = [
  {
    key: 'investors',
    value: 60,
  },
  {
    key: 'team',
    value: 15,
  },
  {
    key: 'reserve',
    value: 20,
  },
  {
    key: 'bounty',
    value: 5,
  },
];

const FUNDS = [
  {
    key: 'development',
    value: 48,
  },
  {
    key: 'infrastructure',
    value: 5,
  },
  {
    key: 'marketing',
    value: 15,
  },
  {
    key: 'legal',
    value: 10,
  },
  {
    key: 'liquidity',
    value: 20,
  },
  {
    key: 'other',
    value: 2,
  },
];

class Details extends PureComponent {
  prepareValues(values) {
    return values.map(item => ({
      value: item.value,
      label: this.props.translate[item.key],
    }));
  }

  render() {
    const { translate } = this.props;

    return (
      <Block
        className={styles.block}
        contentClassName={styles.content}
      >
        <div className={styles.tokens} data-aos="fade-right">
          <div className={styles.title}>{translate.title.tokens}</div>
          <Chart
            className={styles.chart}
            labelItemClassName={styles.chartLabelItem}
            values={this.prepareValues(TOKENS)}
          />
        </div>
        <div className={styles.funds} data-aos="fade-left">
          <div className={styles.title}>{translate.title.funds}</div>
          <Chart
            className={styles.chart}
            labelItemClassName={styles.chartLabelItem}
            values={this.prepareValues(FUNDS)}
          />
        </div>
        <div className={styles.description} data-aos="fade-up">
          <div className={styles.title}>{translate.title.description}</div>
          <table className={styles.table} cellSpacing="0" cellPadding="0">
            <tbody>
              {translate.description.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td><td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>
    );
  }
}

Details.propTypes = {
  lang: PropTypes.string.isRequired,
  translate: PropTypes.shape({
    title: PropTypes.shape({
      tokens: PropTypes.string.isRequired,
      funds: PropTypes.string.isRequired,
    }).isRequired,
    investors: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
    reserve: PropTypes.string.isRequired,
    bounty: PropTypes.string.isRequired,
    development: PropTypes.string.isRequired,
    infrastructure: PropTypes.string.isRequired,
    marketing: PropTypes.string.isRequired,
    legal: PropTypes.string.isRequired,
    other: PropTypes.string.isRequired,
    description: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  lang: state.lang,
  translate: state.translate.details,
});

export default connect(mapStateToProps)(Details);
