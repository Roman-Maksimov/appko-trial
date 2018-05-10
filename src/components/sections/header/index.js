import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import Langs from 'src/components/langs';
import Logo from 'src/components/sections/logo';
import { INTRO_ID } from '../intro';
import { menuToggle } from 'src/actions';
import styles from './styles.scss';

class Header extends PureComponent {
  constructor() {
    super();

    this.state = {
      show: false,
      isSticky: false,
    };

    this.onScroll = this.onScroll.bind(this);
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 350);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    const intro = document.getElementById(INTRO_ID);

    if (!intro) return;

    const position = this.refs.panel.getBoundingClientRect().bottom + window.pageYOffset;

    if (position > intro.offsetHeight && !this.state.isSticky) {
      this.setState({ isSticky: true });
    }

    if (position <= intro.offsetHeight && this.state.isSticky) {
      this.setState({ isSticky: false });
    }
  }

  render() {
    const { menu, user, onToggleMenu } = this.props;

    return (
      <div
        ref="panel"
        className={`${
          this.state.isSticky ? styles.headerSticky : styles.header
        } ${
          this.state.show ? '' : styles.headerHidden
        }`}
      >
        <div className={styles.background} />
        <div className={styles.content}>
          <div className={styles.left}>
            <Logo
              className={styles.logo}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            />
          </div>
          <div className={styles.right}>
            <Langs className={styles.langs} />
            {user.id && (
              <div className={styles.user} />
            )}
            <i
              className={menu ? styles.menuActive : styles.menu}
              onClick={onToggleMenu}
            >menu</i>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  menu: PropTypes.bool.isRequired,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
    id: PropTypes.number,
  })]).isRequired,
  onToggleMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  menu: state.menu,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onToggleMenu: () => dispatch(menuToggle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
