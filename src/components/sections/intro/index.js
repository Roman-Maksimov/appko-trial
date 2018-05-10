import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import Logo from 'src/components/sections/logo';
import Grid from './grid';
import styles from './styles.scss';

export const INTRO_ID = 'intro';

class Intro extends PureComponent {
  constructor() {
    super();

    this.state = {
      showHeader: false,
      showText: false,
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ showHeader: true });
      this.setState({ showText: true });
    }, 0);
  }

  render() {
    const { lang, translate } = this.props;

    return (
      <div id={INTRO_ID} className={styles.intro}>
        <div className={styles.grid}>
          <Grid />
          {/* <div className={styles.gridShadow} /> */}
        </div>
        <div className={this.state.showHeader ? styles.headerActive : styles.header}>
          <Logo />
        </div>
        <br /><br />
        <div className={styles.separator} />
        <br /><br />
        <div className={this.state.showText ? styles.textActive : styles.text}>
          {translate.map((__html, index) => (
            <div
              key={index}
              className={styles[`line-${lang}`]}
              dangerouslySetInnerHTML={{ __html }}
            />
          ))}
        </div>
      </div>
    );
  }
}

Intro.propTypes = {
  lang: PropTypes.string.isRequired,
  translate: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  lang: state.lang,
  translate: state.translate.intro,
});

export default connect(mapStateToProps)(Intro);
