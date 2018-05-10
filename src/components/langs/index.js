import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { translateSet } from 'src/actions/index';
import styles from './styles.scss';

export const LANGS = {
  en: 'EN',
  ru: 'RU',
};

const Langs = ({ lang, className, onSetLang }) => (
  <div className={`${styles.langs} ${className}`}>
    {Object.keys(LANGS).map(key => (
      <div
        key={key}
        className={lang === key ? styles.langItemActive : styles.langItem}
        onClick={() => onSetLang(key)}
      >{LANGS[key]}</div>
    ))}
  </div>
);

Langs.propTypes = {
  lang: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onSetLang: PropTypes.func.isRequired,
};

Langs.defaultProps = {
  className: '',
};

const mapStateToProps = state => ({
  lang: state.lang,
});

const mapDispatchToProps = dispatch => ({
  onSetLang: lang => {
    dispatch(translateSet(lang));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Langs);
