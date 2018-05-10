const emailPattern = /.+@.+/;

export default values => {
  const errors = {};

  if (values.email && !emailPattern.test(values.email)) {
    errors.email = 'demo.errors.invalid';
  }

  return errors;
};
