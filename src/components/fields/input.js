import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { getProp } from 'src/utils';
import styles from './input.scss';

class InputField extends PureComponent {
  constructor() {
    super();

    this.onLabelClick = this.onLabelClick.bind(this);
  }

  onLabelClick() {
    this.refs.input.focus();
  }

  render() {
    const {
      input,
      meta,
      accent,
      autoComplete,
      className,
      label,
      required,
      style,
      translate,
      ...others  // eslint-disable-line comma-dangle
    } = this.props;

    delete others.dispatch;

    return (
      <div
        className={`${
          accent ? styles.rootAccent : styles.root
          } ${
          meta.error ? styles.error : ''
          } ${
          className
          }`}
        style={style}
      >
        <input
          ref="input"
          className={styles.input}
          autoComplete={autoComplete}
          {...input}
          {...others}
        />
        <label
          className={input.value.length > 0 ? styles.labelActive : styles.label}
          onClick={this.onLabelClick}
        >{label}{required && ' *'}</label>
        <div className={styles.bar} />
        {meta.error && <span className={styles.errorText}>{getProp(translate, meta.error)}</span>}
      </div>
    );
  }
}

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  accent: PropTypes.bool,
  autoComplete: PropTypes.bool,
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
};

InputField.defaultProps = {
  autoComplete: false,
  className: '',
};

const mapStateToProps = state => ({
  translate: state.translate,
});

export const Input = connect(mapStateToProps)(InputField);
