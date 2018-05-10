const emailPattern = /.+@.+/;

export default values => {
  const errors = {};

  if (values.email && !emailPattern.test(values.email)) {
    errors.email = 'ico.errors.invalid';
  }

  return errors;
};
