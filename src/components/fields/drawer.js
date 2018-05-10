import React, { PropTypes, PureComponent } from 'react';
import styles from './drawer.scss';

export class Drawer extends PureComponent {
  constructor(props) {
    super(props);

    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onOverlayClick() {
    this.props.onClose();
  }

  onKeyDown(e) {
    if (this.props.active && e.which === 27) {
      this.props.onClose();
    }
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    const {
      active,
      type,
      className,
      children,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <div
          className={active ? styles.overlayActive : styles.overlay}
          onClick={this.onOverlayClick}
        />
        <div
          className={`${
            active ? styles.rootActive : styles.root
          } ${
            type === 'right' ? styles.right : styles.left
          } ${
            className
          }`}
          onClick={e => e.stopPropagation()}
        >{children}</div>

      </div>
    );
  }
}

Drawer.propTypes = {
  active: PropTypes.bool,
  type: PropTypes.oneOf([
    'left', 'right',
  ]),
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

Drawer.defaultProps = {
  active: false,
  type: 'left',
  className: '',
  onClose: () => {},
};
