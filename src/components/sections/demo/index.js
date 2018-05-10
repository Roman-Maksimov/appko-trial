import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Input } from 'src/components/fields';
import Block from 'src/components/block';
import Background from './background';
import { submit } from './actions';
import validate from './validate';
import styles from './styles.scss';

const Demo = ({ isDone, translate, submitting, handleSubmit }) => (
  <Block
    title={translate.title}
    subTitle={translate.subtitle}
    className={styles.block}
    titleClassName={styles.title}
    subtitleClassName={styles.subTitle}
    contentClassName={styles.content}
    titleProps={{
      'data-aos': 'fade-up',
    }}
  >
    <Background />
    <div className={styles.text} data-aos="fade-right">{translate.text}</div>
    <div className={styles.form} data-aos="fade-left">
      <form onSubmit={handleSubmit}>
        {isDone
          ? (
            <a href="http://demo.cryptostock.pw" target="_blank" className={styles.done}>
              {translate.done}
            </a>
          ) : (
            <div className={styles.field}>
              <Field
                name="email"
                component={Input}
                label={translate.label}
                className={styles.input}
                accent
              />
              <Button
                className={styles.button}
                label={translate.button}
                type="submit"
                disabled={submitting}
              />
            </div>
          )}
      </form>
    </div>
  </Block>
);

Demo.propTypes = {
  isDone: PropTypes.bool.isRequired,
  translate: PropTypes.shape({
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }).isRequired,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isDone: state.components.demo.isDone,
  translate: state.translate.demo,
});

const DemoForm = reduxForm({
  form: 'demo',
  onSubmit: submit,
  validate,
})(Demo);

export default connect(mapStateToProps)(DemoForm);
