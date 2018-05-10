import React, { PropTypes, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import AOS from 'aos';
require('aos/dist/aos.css');
import { track } from 'src/actions';
import About from 'src/components/sections/about';
import Bottom from 'src/components/sections/bottom';
import Date from 'src/components/sections/date';
import Demo from 'src/components/sections/demo';
import Features from 'src/components/sections/features';
import Footer from 'src/components/sections/footer';
import Header from 'src/components/sections/header';
import How from 'src/components/sections/how';
import Intro from 'src/components/sections/intro';
import Loader from 'src/components/sections/loader';
import Menu from 'src/components/sections/menu';
import Partners from 'src/components/sections/partners';
import Roadmap from 'src/components/sections/roadmap';
import styles from './styles.scss';

export const EVENTS = [
  {
    from: moment('2018-01-15T10:00:00.000+03'),
    to: moment('2018-01-31T19:00:00.000+03'),
    title: 'events.early_bird.title',
    description: 'events.early_bird.description',
  },
  {
    from: moment('2018-02-12T10:00:00.000+03'),
    to: moment('2018-03-16T19:00:00.000+03'),
    title: 'events.exchange.title',
    description: 'events.exchange.description',
  },
];

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
              <Date ref="date" events={EVENTS} />
              <Features ref="features" />
              <How ref="how" />
              <Roadmap ref="roadmap" />
              <Demo ref="demo" />
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
