// @flow
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Board from './components/Board';
import reducer from './reducers';
import type { Store } from './types';

require('./assets/spritesheet-cn.css');

const store: Store = createStore(reducer);
const state = store.getState();

render(
    <Provider store={store}>
        <Board boardState={state.boardState} />
    </Provider>,
    document.getElementById('root'),
);
