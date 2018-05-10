import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Block from 'src/components/block';
import styles from './styles.scss';

const About = ({ translate }) => (
  <Block
    title={translate.title}
    subTitle={translate.subtitle}
    className={styles.block}
    contentClassName={styles.content}
    titleProps={{
      'data-aos': 'fade-left',
    }}
  >
    <div className={styles.text} data-aos="fade-right">
      <p>{translate.text.aggregator}</p>
      <p>{translate.text.broker}</p>
      <p>{translate.text.analytics}</p>
    </div>
    <div className={styles.canvas} data-aos="fade-left" data-aos-offset={200}>
      <div className={styles.scene}>
        <div className={styles.video}>
          <div className={styles.arrow} />
        </div>
      </div>
    </div>
  </Block>
);

About.propTypes = {
  translate: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    text: PropTypes.shape({
      aggregator: PropTypes.string.isRequired,
      broker: PropTypes.string.isRequired,
      analytics: PropTypes.string.isRequired,
    }).isRequired,
    spinner: PropTypes.shape({
      aggregator: PropTypes.string.isRequired,
      broker: PropTypes.string.isRequired,
      analytics: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  translate: state.translate.about,
});

export default connect(mapStateToProps)(About);
