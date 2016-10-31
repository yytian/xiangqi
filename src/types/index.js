// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'

export type State = {
};

export type Action =
    { type: 'Placeholder' }
;

export type Store = ReduxStore<State, Action>;

export type Dispatch = ReduxDispatch<Action>;