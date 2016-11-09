// @flow
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Game from './containers/Game';
import reducer from './reducers';
import type { Store } from './types';

require('./assets/board.css');
require('./assets/spritesheet-cn.css');

const store: Store = createStore(reducer);
const state = store.getState();

render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('root'),
);
