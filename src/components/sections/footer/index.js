import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Block from 'src/components/block';
import styles from './styles.scss';

const Footer = ({ translate }) => (
  <Block
    className={styles.block}
    contentClassName={styles.content}
  >
    <div className={styles.socials} data-aos="fade-left" data-aos-offset={-50}>
      <a
        href="#"
        target="_blank"
      ><i className={styles.facebook} /></a>
      <a
        href="#"
        target="_blank"
      ><i className={styles.vk} /></a>
      <a
        href="#"
        target="_blank"
      ><i className={styles.github} /></a>
    </div>
    <div
      className={styles.copyrights}
      data-aos="fade-right"
      data-aos-offset={-50}
    >{translate.copyrights}</div>
  </Block>
);

Footer.propTypes = {
  translate: PropTypes.shape({
    copyrights: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  translate: state.translate.footer,
});

export default connect(mapStateToProps)(Footer);
