// @flow
import { isMoveLegal } from './Legality.js';

import type { Side, State, Action, GameState } from '../types';

function cloneGame(gameState: GameState): GameState {
    const board = gameState.boardState;
    const copy = new Array(10);
    for (let i = 0; i < 10; i++) {
	copy[i] = board[i].slice(0);
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
    b[2][1] = {type: 'cannon', owner: 'black'};
    b[2][7] = {type: 'cannon', owner: 'black'};
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

function nextMover(mover: Side): Side {
    if (mover === 'red') {
	return 'black';
    } else if (mover === 'black') {
	return 'red';
    } else {
	throw new Error('Invalid mover');
    }
}

export default function app(state: ?State, action: Action): State {
    if (state == null) {
	return {gameState: {boardState: newBoard(), nextMover: 'red'}};
    }

    switch(action.type) {
    case 'MOVE_PIECE':
	if (!isMoveLegal(state.gameState, action.from, action.to)) {
	    return state;
	}
	const movingPiece = state.gameState.boardState[action.from.row][action.from.column];
	const next = cloneGame(state.gameState);
	next.boardState[action.from.row][action.from.column] = null;
	next.boardState[action.to.row][action.to.column] = movingPiece;
	next.nextMover = nextMover(state.gameState.Nextmover);
	return {...state, gameState: next};
    default:
	throw new Error('Unrecognized action');
    }
}
