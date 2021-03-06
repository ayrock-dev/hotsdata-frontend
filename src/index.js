import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from './reducers';
import Routes from './router';

import 'normalize.css';
import 'react-select-plus/dist/react-select-plus.css';
import '../style/style.scss'

const App = () => {
  const createStoreWithMiddleware = applyMiddleware(
    promise,
    thunk
  )(createStore);

  let store = createStoreWithMiddleware(
    reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
