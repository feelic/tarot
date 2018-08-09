import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import configureStore from './store/configure-store';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import {deal} from './actions';

const store = configureStore();

store.dispatch(deal());

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
