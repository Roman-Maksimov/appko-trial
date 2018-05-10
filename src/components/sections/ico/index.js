import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Input } from 'src/components/fields';
import { submit } from './actions';
import validate from './validate';
import styles from './styles.scss';

const Ico = ({ className, isDone, translate, submitting, handleSubmit }) => (
  <form
    onSubmit={handleSubmit}
    className={`${styles.ico} ${className}`}
  >
    <div className={styles.soon}>{translate.soon}</div>
    {isDone
      ? (
        <div className={styles.done}>
          {translate.done}
        </div>
      )
      : (
        <div className={styles.field}>
          <Field
            name="email"
            component={Input}
            label={translate.label}
            className={styles.input}
            accent
          />&nbsp;
          <Button
            className={styles.button}
            label={translate.button}
            type="submit"
            disabled={submitting}
          />
        </div>
      )}
    <div className={styles.promise}>{translate.promise}</div>
  </form>
);

Ico.propTypes = {
  className: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  translate: PropTypes.shape({
    soon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    promise: PropTypes.string.isRequired,
    done: PropTypes.string.isRequired,
  }).isRequired,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
};

Ico.defaultProps = {
  className: '',
};

const mapStateToProps = state => ({
  isDone: state.components.ico.isDone,
  translate: state.translate.ico,
});

const IcoForm = reduxForm({
  form: 'ico',
  onSubmit: submit,
  validate,
})(Ico);

export default connect(mapStateToProps)(IcoForm);
