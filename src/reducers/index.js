// @flow
import type { State, Action, BoardState } from '../types';

function clone(state: State): State {
    const copy = new Array(10);
    for (let i = 0; i < 10; i++) {
	copy[i] = state.boardState[i].slice(0);
    }

    return {boardState: copy};
}

function newBoard(): BoardState {
    const b = new Array(10); // Ten rows
    for (let i = 0; i < 10; i++) {
	b[i] = new Array(9); // Nine columns
	for (let j = 0; j < 9; j++) {
	    b[i][j] = null;
	}
    }

    b[0][0] = {type: 'chariot', owner: 'black'};
    b[0][1] = {type: 'horse', owner: 'black'};
    b[0][2] = {type: 'elephant', owner: 'black'};
    b[0][3] = {type: 'advisor', owner: 'black'};
    b[0][4] = {type: 'general', owner: 'black'};
    b[0][5] = {type: 'advisor', owner: 'black'};
    b[0][6] = {type: 'elephant', owner: 'black'};
    b[0][7] = {type: 'horse', owner: 'black'};
    b[0][8] = {type: 'chariot', owner: 'black'};
    b[1][1] = {type: 'cannon', owner: 'black'};
    b[1][7] = {type: 'cannon', owner: 'black'};
    b[3][0] = {type: 'soldier', owner: 'black'};
    b[3][1] = {type: 'soldier', owner: 'black'};
    b[3][2] = {type: 'soldier', owner: 'black'};
    b[3][3] = {type: 'soldier', owner: 'black'};
    b[3][4] = {type: 'soldier', owner: 'black'};
    b[3][5] = {type: 'soldier', owner: 'black'};
    b[3][6] = {type: 'soldier', owner: 'black'};
    b[3][7] = {type: 'soldier', owner: 'black'};
    b[3][8] = {type: 'soldier', owner: 'black'};

    b[9][0] = {type: 'chariot', owner: 'red'};
    b[9][1] = {type: 'horse', owner: 'red'};
    b[9][2] = {type: 'elephant', owner: 'red'};
    b[9][3] = {type: 'advisor', owner: 'red'};
    b[9][4] = {type: 'general', owner: 'red'};
    b[9][5] = {type: 'advisor', owner: 'red'};
    b[9][6] = {type: 'elephant', owner: 'red'};
    b[9][7] = {type: 'horse', owner: 'red'};
    b[9][8] = {type: 'chariot', owner: 'red'};
    b[7][1] = {type: 'cannon', owner: 'red'};
    b[7][7] = {type: 'cannon', owner: 'red'};
    b[6][0] = {type: 'soldier', owner: 'red'};
    b[6][1] = {type: 'soldier', owner: 'red'};
    b[6][2] = {type: 'soldier', owner: 'red'};
    b[6][3] = {type: 'soldier', owner: 'red'};
    b[6][4] = {type: 'soldier', owner: 'red'};
    b[6][5] = {type: 'soldier', owner: 'red'};
    b[6][6] = {type: 'soldier', owner: 'red'};
    b[6][7] = {type: 'soldier', owner: 'red'};
    b[6][8] = {type: 'soldier', owner: 'red'};

    return b;
}

const boardState = newBoard();

export default function app(state: ?State, action: Action): State {
    if (state == null) {
	return {boardState};
    }

    switch(action.type) {
    case 'MOVE_PIECE':
	const fromSquare = state.boardState[action.from.row][action.from.column];
	if (fromSquare == null) {
	    return state;
	}
	const next = clone(state);
	next.boardState[action.from.row][action.from.column] = null;
	next.boardState[action.to.row][action.to.column] = fromSquare;
	return next;
    default:
	throw new Error('Unrecognized action');
    }
}
