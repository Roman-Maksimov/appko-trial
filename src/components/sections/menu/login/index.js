import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, isSubmitting } from 'redux-form';
import { Checkbox, Button, Input } from 'src/components/fields';
import { userLogin } from 'src/actions';
import styles from './styles.scss';

const Login = ({ translate, submitting, error, handleSubmit }) => (
  <form className={styles.login} onSubmit={handleSubmit}>
    <Field
      name="email"
      component={Input}
      label={translate.email}
      className={styles.input}
    />
    <Field
      name="password"
      component={Input}
      label={translate.password}
      className={styles.input}
      type="password"
    />
    <Field
      name="remember"
      component={Checkbox}
      label={translate.remember}
      className={styles.remember}
    />
    {error && <div className={styles.error}>{translate.errors[error]}</div>}
    <Button
      className={styles.button}
      label={submitting ? translate.submitting : translate.button}
      type="submit"
      disabled={submitting}
    />
  </form>
);

Login.propTypes = {
  translate: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    remember: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    submitting: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

export const FORM_NAME = 'login';

const mapStateToProps = state => ({
  translate: state.translate.login,
  submitting: isSubmitting(FORM_NAME)(state),
});

const LoginForm = reduxForm({
  form: FORM_NAME,
  initialValues: {
    remember: true,
  },
  onSubmit: (values, dispatch) => dispatch(userLogin(values)),
  validate: () => ({}),
})(Login);

export default connect(mapStateToProps)(LoginForm);
