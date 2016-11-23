// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'

export type Side = 'red' | 'black';

type PieceType = 'general' | 'advisor' | 'elephant' | 'horse' | 'chariot' | 'cannon' | 'soldier';

type Piece = { type: PieceType, owner: Side };

type Empty = null;

type SquareContent = Piece | Empty;

type BoardState = Array<Array<SquareContent>>;

export type GameState = {
    board: BoardState,
    nextMover: Side,
}

export type Position: {row: number, column: number}

export type State = {
    gameState: GameState,
};

export type Action =
    { type: 'MOVE_PIECE', from: Position, to: Position },
;

export type Store = ReduxStore<State, Action>;

export type Dispatch = ReduxDispatch<Action>;
