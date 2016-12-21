// @flow
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Game from './containers/Game';
import reducer from './reducers';
import type { Store } from './types';

import { AppContainer } from 'react-hot-loader';

require('./assets/board.css');
require('./assets/spritesheet-cn.css');

const store: Store = createStore(reducer);
const state = store.getState();

const run = () => {
    render(
        <Provider store={store}>
            <Game />
        </Provider>,
	document.getElementById('root'),
    );
};

run();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/Game', run);
}
