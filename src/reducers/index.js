// @flow
import type { State, Action, BoardState } from '../types'

function newBoard(): BoardState {
    const b = new Array(10); // Ten rows
    for (let i = 0; i < 10; i++) {
	b[i] = new Array(9); // Nine columns
	for (let j = 0; j < 9; j++) {
	    b[i][j] = null;
	}
    }

    b[0][0] = {type: 'general', owner: 'black'};

    return b;
}

const boardState = newBoard();

export default function app(state: ?State, action: Action): State {
    const s = state || {boardState};
    return s;
}
