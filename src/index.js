// @flow
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import App from './components/App';
import reducer from './reducers';
import type { Store } from './types';

const store: Store = createStore(reducer);

render(
  <div>Hello world!</div>,
  document.getElementById('root'),
);
