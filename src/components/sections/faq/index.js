import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import Block from 'src/components/block';
import styles from './styles.scss';

class Faq extends PureComponent {
  constructor() {
    super();

    this.state = {
      issues: [],
    };

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(index) {
    let { issues } = this.state;

    if (issues.indexOf(index) === -1) {
      issues.push(index);
    } else {
      issues = issues.filter(item => item !== index);
    }

    this.setState({ issues });
    this.forceUpdate();
  }

  render() {
    const { translate } = this.props;

    return (
      <Block
        title={translate.title}
        subTitle={translate.subtitle}
        className={styles.block}
        contentClassName={styles.content}
        titleProps={{
          'data-aos': 'fade-left',
        }}
        contentProps={{
          'data-aos': 'fade-up',
        }}
      >
        {translate.issues.map((item, index) => {
          const isActive = this.state.issues.indexOf(index) !== -1;

          return (
            <div key={index} className={styles.issue}>
              <div
                className={styles.question}
                onClick={() => this.onToggle(index)}
              >{item.question}</div>
              <div
                className={isActive ? styles.answerActive : styles.answer}
              >{item.answer}</div>
            </div>
          );
        })}
      </Block>
    );
  }
}

Faq.propTypes = {
  translate: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    issues: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  translate: state.translate.faq,
});

export default connect(mapStateToProps)(Faq);
