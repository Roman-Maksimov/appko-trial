import ReactDOM from 'react-dom';
import routes from './routes';

require.context('../../../assets', true, /.+/);

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
    routes,
    document.getElementById('app')
);
