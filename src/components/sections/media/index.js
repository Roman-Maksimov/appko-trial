import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Block from 'src/components/block';
import styles from './styles.scss';

const Media = ({ translate }) => (
  <Block
    title={translate.title}
    className={styles.block}
    titleProps={{
      'data-aos': 'fade-right',
    }}
  >
    <div className={styles.img} data-aos="zoom-in" />
    <div className={styles.text} data-aos="zoom-in-up">{translate.text}</div>
  </Block>
);

Media.propTypes = {
  translate: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  translate: state.translate.media,
});

export default connect(mapStateToProps)(Media);
