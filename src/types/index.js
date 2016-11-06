// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'

type PieceType = 'general' | 'advisor' | 'elephant' | 'horse' | 'chariot' | 'cannon' | 'soldier';

type Piece = { type: PieceType, owner: 'red' | 'black' };

type Empty = null;

type SquareContent = Piece | Empty;

type BoardState = Array<Array<SquareContent>>;

export type State = {
    board: BoardState,
};

export type Action =
    { type: 'Placeholder' }
;

export type Store = ReduxStore<State, Action>;

export type Dispatch = ReduxDispatch<Action>;
