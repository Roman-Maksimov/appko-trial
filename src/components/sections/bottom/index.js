import React, { PureComponent } from 'react';
import Block from 'src/components/block';
import Logo from '../logo';
import styles from './styles.scss';

// need a non-StateLess component for the ref at the Main component
class Bottom extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Block
        className={styles.block}
        contentClassName={styles.content}
        contentProps={{
          'data-aos': 'fade-up',
        }}
      >
        <Logo />
        <div className={styles.separator} />
        {children}
        <div className={styles.socials}>
          <a
            href="#"
            target="_blank"
          ><i className={styles.facebook} /></a>
          <a
            href="#"
            target="_blank"
          ><i className={styles.vk} /></a>
          <a
            href="#"
            target="_blank"
          ><i className={styles.github} /></a>
        </div>
      </Block>
    );
  }
}

export default Bottom;
