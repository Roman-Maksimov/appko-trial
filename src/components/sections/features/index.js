import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'src/components/fields';
import Block from 'src/components/block';
import styles from './styles.scss';

const features = [
  {
    icon: 'call_merge',
    name: 'aggregate',
  },
  {
    icon: 'assignment_turned_in',
    name: 'underwriting',
  },
  {
    icon: 'trending_up',
    name: 'liquidity',
  },
  {
    icon: 'account_balance',
    name: 'broker',
  },
  {
    icon: 'build',
    name: 'derivatives',
  },
  {
    icon: 'assignment',
    name: 'analytics',
  },
];

const UNDERWRITING_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSdjTSxA8ePtytavi-Ol8nUdvTsDReU59ES0m7chXZULz6GQ8w/viewform';

const Features = ({ translate }) => (
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
    {features.map(feature => (
      <div key={feature.name} className={styles.item}>
        <div className={styles.icon} dangerouslySetInnerHTML={{ __html: feature.icon }} />
        <div className={styles.title}>{translate[feature.name].title}</div>
        <div className={styles.text}>{translate[feature.name].text}</div>
        {feature.name === 'underwriting' && (
          <a href={UNDERWRITING_FORM} target="_blank">
            <Button
              className={styles.button}
              label={translate.apply}
            />
          </a>
        )}
      </div>
    ))}
  </Block>
);

Features.propTypes = {
  translate: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    apply: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  translate: state.translate.features,
});

export default connect(mapStateToProps)(Features);
