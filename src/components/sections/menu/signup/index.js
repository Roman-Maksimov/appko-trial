import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, isSubmitting } from 'redux-form';
import { Button, Input } from 'src/components/fields';
import { userSignup } from 'src/actions';
import validate from './validate';
import styles from './styles.scss';

const Signup = ({ translate, submitting, error, handleSubmit }) => (
  <form className={styles.login} onSubmit={handleSubmit}>
    <Field
      name="email"
      component={Input}
      required
      label={translate.email}
      className={styles.input}
    />
    <Field
      name="password"
      component={Input}
      label={translate.password}
      className={styles.input}
      required
      type="password"
    />
    <Field
      name="password_repeat"
      component={Input}
      label={translate.password_repeat}
      required
      className={styles.input}
      type="password"
    />
    <Field
      name="first_name"
      component={Input}
      label={translate.first_name}
      className={styles.input}
    />
    <Field
      name="last_name"
      component={Input}
      label={translate.last_name}
      className={styles.input}
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

Signup.propTypes = {
  translate: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    password_repeat: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    submitting: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

export const FORM_NAME = 'signup';

const mapStateToProps = state => ({
  submitting: isSubmitting(FORM_NAME)(state),
  translate: state.translate.signup,
});

const SignupForm = reduxForm({
  form: FORM_NAME,
  onSubmit: (values, dispatch) => dispatch(userSignup(values)),
  validate,
})(Signup);

export default connect(mapStateToProps)(SignupForm);
