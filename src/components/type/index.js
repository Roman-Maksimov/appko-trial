import React, { PureComponent } from 'react';
import styles from './styles.scss';

class Type extends PureComponent {
  constructor() {
    super();

    this.state = {
      index: -1,
    };

    this.interval = null;
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      const index = this.state.index + 1;

      if (index > this.props.children.length) {
        clearInterval(this.interval);
        return;
      }

      this.setState({ index });
    }, 20);
  }

  render() {
    const { children } = this.props;
    const result = [];

    for (let i = 0; i < children.length; i++) {
      result.push(
        <span
          key={i}
          className={this.state.index >= i ? styles.charActive : styles.char}
        >{children.charAt(i)}</span>
      );
    }

    return (
      <span>{result}</span>
    );
  }
}

export default Type;
