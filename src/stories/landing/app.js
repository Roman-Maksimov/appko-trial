import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translateSet, viewportSet } from 'src/actions';
import Main from './main';

class App extends PureComponent {
  componentWillMount() {
    const result = /^[\\/]([a-zA-Z]{2})/.exec(this.props.location.pathname);

    if (result && result[1] && result[1].toLowerCase() === 'ru') {
      this.props.onSetLang('ru');
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.props.onResize, false);
    window.dispatchEvent(new Event('resize'));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.onResize);
  }

  render() {
    return <Main />;
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  onSetLang: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onSetLang: lang => dispatch(translateSet(lang)),
  onResize: () => dispatch(viewportSet()),
});

export default connect(null, mapDispatchToProps)(withRouter(App));
