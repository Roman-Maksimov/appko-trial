import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'src/components/fields';
import { menuClose, userToggleSignupForm, userToggleLoginForm, userLogout } from 'src/actions';
import Signup from './signup';
import Login from './login';
import styles from './styles.scss';

const Menu = ({ menu, user, translate, onCloseMenu, onSignup, onLogin, onLogout }) => (
  <Drawer
    className={styles.panel}
    type="right"
    active={menu}
    onClose={onCloseMenu}
  >
    {user.id && (
      <div className={styles.user}>
        <div className={styles.userAvatar} />
        {user.first_name ? `${user.first_name} ${user.last_name}` : user.email}
      </div>
    )}
    {user.id && (
      <ul className={styles.menuUser}>
        <li className={styles.titleUC}>{translate.account}</li>
        <li
          className={user.isLoggingOut ? styles.titleDoing : styles.title}
          onClick={!user.isLoggingOut && onLogout}
        >{translate.logout}</li>
      </ul>
    )}
    {!user.id && (
      <ul className={styles.menuUser}>
        <li>
          <div
            className={user.isSigning ? styles.titleActive : styles.title}
            onClick={onSignup}
          >{translate.signup}</div>
          {user.isSigning && <Signup />}
        </li>
        <li>
          <div
            className={user.isLogging ? styles.titleActive : styles.title}
            onClick={onLogin}
          >{translate.login}</div>
          {user.isLogging && <Login />}
        </li>
      </ul>
    )}
    <ul className={styles.menu}>
      <li className={styles.titleUC}>{translate.whitepaper}</li>
      <li className={styles.titleUC}>{translate.bounty}</li>
    </ul>
  </Drawer>
);

Menu.propTypes = {
  menu: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    isSigning: PropTypes.bool,
    isLogging: PropTypes.bool,
    isLoggingOut: PropTypes.bool,
  })]).isRequired,
  translate: PropTypes.shape({
    signup: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    logout: PropTypes.string.isRequired,
    account: PropTypes.string.isRequired,
    whitepaper: PropTypes.string.isRequired,
    bounty: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string.isRequired,
  onCloseMenu: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

Menu.defaultProps = {
  className: '',
};

const mapStateToProps = state => ({
  menu: state.menu,
  user: state.user,
  translate: state.translate.menu,
});

const mapDispatchToProps = dispatch => ({
  onCloseMenu: () => dispatch(menuClose()),
  onSignup: () => dispatch(userToggleSignupForm()),
  onLogin: () => dispatch(userToggleLoginForm()),
  onLogout: () => dispatch(userLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
