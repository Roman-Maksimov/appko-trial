import React, { PropTypes, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import AOS from 'aos';
require('aos/dist/aos.css');
import { track } from 'src/actions';
import About from './about';
import Bottom from './bottom';
import Date from './date';
import Demo from './demo';
import Features from './features';
import Footer from './footer';
import Header from './header';
import How from './how';
import Intro from './intro';
import Loader from './loader';
import Media from './media';
import Menu from './menu';
import Partners from './partners';
import Roadmap from './roadmap';
import Team from './team';
import styles from './styles.scss';

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: !props.loader,
      page: 'intro',
    };

    if (this.state.show) {
      this.showContent(props.lang);
    }

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loader && nextProps.loader !== this.props.loader) {
      this.showContent(nextProps.lang);
    }
  }

  showContent(lang) {
    setTimeout(() => {
      this.setState({ show: true });
      AOS.init();
    }, 100);
    track(this.state.page, lang);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.lang !== this.props.lang || nextState.page !== this.state.page) {
      track(nextState.page, nextProps.lang);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    let page = 'intro';

    for (let i = 0; i < Object.keys(this.refs).length; i++) {
      const ref = Object.keys(this.refs)[i];
      const block = ReactDOM.findDOMNode(this.refs[ref]);

      if (!block) return;

      const pageTop = window.innerHeight / 2;
      const top = block.getBoundingClientRect().top;

      if (top <= pageTop) {
        page = ref;
      } else {
        break;
      }
    }

    this.setState({ page });
  }

  render() {
    const { loader } = this.props;

    return (
      <div className={styles.root}>
        {loader && <Loader />}
        {!loader && (
          <div>
            <Menu />
            <Header />
            <Intro />
            <div className={this.state.show ? styles.contentActive : styles.content}>
              <About ref="about" />
              <Date ref="date" />
              <Features ref="features" />
              <How ref="how" />
              <Roadmap ref="roadmap" />
              <Demo ref="demo" />
              <Team ref="team" />
              <Media ref="media" />
              <Partners ref="partners" />
              <Bottom ref="bottom" />
              <Footer ref="footer" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

Main.propTypes = {
  loader: PropTypes.bool,
};

const mapStateToProps = state => ({
  loader: state.loader,
  lang: state.lang,
});

export default connect(mapStateToProps)(Main);
