const emailPattern = /.+@.+/;
const passwordPattern = /^.{6}/;

export default values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'signup.errors.required';
  }

  if (!values.password) {
    errors.password = 'signup.errors.required';
  }

  if (!values.password_repeat) {
    errors.password_repeat = 'signup.errors.required';
  }

  if (values.email && !emailPattern.test(values.email)) {
    errors.email = 'signup.errors.invalid_email';
  }

  if (values.password && !passwordPattern.test(values.password)) {
    errors.password = 'signup.errors.invalid_password';
  }

  if (values.password && values.password_repeat && values.password !== values.password_repeat) {
    errors.password_repeat = 'signup.errors.invalid_password_repeat';
  }

  return errors;
};
