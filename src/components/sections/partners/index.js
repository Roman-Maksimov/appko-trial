import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Block from 'src/components/block';
import styles from './styles.scss';

const PARTNERS = [
  {
    code: 'metaquotes',
    name: 'MetaQuotes',
  },
  {
    code: 'cexio',
    name: 'CEX.IO',
  },
  {
    code: 'bleutrade',
    name: 'BleuTrade',
  },
  {
    code: 'integral',
    name: 'Intgeral',
  },
  {
    code: 'currenex',
    name: 'Currenex',
  },
];

const Partners = ({ translate }) => (
  <Block
    title={translate.title}
    contentClassName={styles.content}
    titleProps={{
      'data-aos': 'fade-left',
    }}
    contentProps={{
      'data-aos': 'fade-up',
    }}
  >
    {PARTNERS.map(item => (
      <div key={item.code} className={styles.partner}>
        <img className={styles.img} src={`/img/partners/${item.code}.png`} alt={item.name} />
      </div>
    ))}
  </Block>
);

Partners.propTypes = {
  translate: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  translate: state.translate.partners,
});

export default connect(mapStateToProps)(Partners);
