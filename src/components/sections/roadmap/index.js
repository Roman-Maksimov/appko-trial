import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Block from 'src/components/block';
import styles from './styles.scss';

const Roadmap = ({ translate }) => (
  <Block
    title={translate.title}
    subTitle={translate.subtitle}
    className={styles.block}
    contentClassName={styles.content}
    titleProps={{
      'data-aos': 'fade-right',
    }}
    contentProps={{
      'data-aos': 'fade-up',
    }}
  >
    <div className={styles.step}>
      <div className={styles.amount}>$3M</div>
      <ul className={styles.list}>
        {translate.steps[0].map((item, index) => (
          <li key={`step-0-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
    <div className={styles.step}>
      <div className={styles.amount}>$5M</div>
      <ul className={styles.list}>
        {translate.steps[1].map((item, index) => (
          <li key={`step-1-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
    <div className={styles.step}>
      <div className={styles.amount}>$10M</div>
      <ul className={styles.list}>
        {translate.steps[2].map((item, index) => (
          <li key={`step-2-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
    <div className={styles.step}>
      <div className={styles.amount}>$15M</div>
      <ul className={styles.list}>
        {translate.steps[3].map((item, index) => (
          <li key={`step-3-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
    <div className={styles.step}>
      <div className={styles.amount}>$20M</div>
      <ul className={styles.list}>
        {translate.steps[4].map((item, index) => (
          <li key={`step-4-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  </Block>
);

Roadmap.propTypes = {
  translate: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    steps: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  translate: state.translate.roadmap,
});

export default connect(mapStateToProps)(Roadmap);
