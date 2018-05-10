import React, { PropTypes } from 'react';
import styles from './styles.scss';

const Block = ({
  title,
  subTitle,
  className,
  titleClassName,
  subtitleClassName,
  contentClassName,
  children,
  titleProps,
  contentProps,
...others,
}) => (
  <section className={`${styles.block} ${className}`} {...others}>
    {subTitle && (
      <div className={`${styles.subtitle} ${subtitleClassName}`} {...titleProps}>
        {subTitle}
      </div>
    )}
    {title && (
      <div className={`${styles.title} ${titleClassName}`} {...titleProps}>
        {title}
      </div>
    )}
    <div className={`${styles.content} ${contentClassName}`} {...contentProps}>
      {children}
    </div>
  </section>
);

Block.propTypes = {
  title: PropTypes.any,
  subTitle: PropTypes.any,
  className: PropTypes.string.isRequired,
  titleClassName: PropTypes.string.isRequired,
  subtitleClassName: PropTypes.string.isRequired,
  contentClassName: PropTypes.string.isRequired,
  titleProps: PropTypes.object,
  contentProps: PropTypes.object,
  children: PropTypes.any,
};

Block.defaultProps = {
  className: '',
  titleClassName: '',
  subtitleClassName: '',
  contentClassName: '',
};

export default Block;
