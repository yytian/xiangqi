// @flow
import type { GameState, Position, Side } from '../types';

function onBoard(pos: Position): boolean {
    return pos.row >= 0 && pos.row <= 9 && pos.column >= 0 && pos.column <= 8;
}

function equal(a: Position, b: Position): boolean {
    return a.row === b.row && a.column === b.column;
}

function posInPalace(player: Side, pos: Position): boolean {
    if (player === 'red') {
	return pos.row >= 7 && pos.column >= 3 && pos.column <= 5;
    } else {
	return pos.row <= 2 && pos.column >= 3 && pos.column <= 5;
    }
}

export function isMoveLegal(state: GameState, from: Position, to: Position): boolean {
    if (!onBoard(from) || !onBoard(to)) {
	return false;
    }
    
    const board = state.boardState;
    const fromPiece = board[from.row][from.column];
    const toPiece = board[to.row][to.column];

    if (equal(from, to)) {
	return false;
    }
    
    if (fromPiece == null || fromPiece.owner !== state.nextMover) {
	return false;
    }


    if (toPiece != null && toPiece.owner === fromPiece.owner) {
	return false;
    }

    // Now check piece rules
    const hDiff = to.column - from.column;
    const vDiff = to.row - from.row;
    const hDiffAbs = Math.abs(hDiff);
    const vDiffAbs = Math.abs(vDiff);

    switch (fromPiece.type) {
    case 'general':
	if (!( (hDiffAbs === 1 && vDiffAbs === 0) || (hDiffAbs === 0 && vDiffAbs === 1) )) {
	    return false;
	}
	if (!posInPalace(fromPiece.owner, to)) {
	    return false;
	}
	break;
    case 'advisor':
	if (hDiffAbs !== 1 || vDiffAbs !== 1) {
	    return false;
	}
	if (!posInPalace(fromPiece.owner, to)) {
	    return false;
	}
	break;
    case 'elephant':
	if (hDiffAbs !== 2 || vDiffAbs !== 2) {
	    return false;
	}
	if (board[from.row + vDiff / 2][from.column + hDiff / 2] != null) {
	    return false;
	}
	break;
    case 'horse':
	if (!( (hDiffAbs === 2 && vDiffAbs === 1) || (hDiffAbs === 1 && vDiffAbs === 2) )) {
	    return false;
	}
	if (board[from.row + (vDiffAbs === 2 ? Math.sign(vDiff) : 0)][from.column + (hDiffAbs === 2 ? Math.sign(hDiff) : 0)] != null) {
	    return false;
	}
	break;
    case 'chariot':
	if (to.row !== from.row && to.column !== from.column) {
	    return false;
	}
	if (to.row !== from.row) {
	    // Moving along a column
	    const increment = Math.sign(to.row - from.row);
	    for (let i = from.row + increment; i !== to.row; i += increment) {
		console.log(i);
		if (board[i][to.column] != null) {
		    return false;
		}
	    }
	} else {
	    // Moving along a row
	    const increment = Math.sign(to.column - from.column);
	    for (let j = from.column + increment; j !== to.column; j += increment) {
		console.log(j);
		if (board[to.row][j] != null) {
		    return false;
		}
	    }
	}
	break;
    case 'cannon':
	return false;
	break;
    case 'soldier':
	if (fromPiece.owner === 'red') {
	    if (from.row >= 5) {
		if (to.column != from.column || to.row !== from.row - 1) {
		    return false;
		}
	    } else {
		// past the river
		const hDiff = to.column - from.column;
		const vDiff = to.row - from.row;
		const hMoved = hDiff !== 0;
		const vMoved = vDiff !== 0;
		if (hDiffAbs > 1 || (vMoved && vDiff !== -1) || (hMoved && vMoved)) {
		    return false;
		}
	    }
	}
	if (fromPiece.owner === 'black') {
	    if (from.row <= 4) {
		if (to.column != from.column || to.row !== from.row + 1) {
		    return false;
		}
	    } else {
		// past the river
		const hDiff = to.column - from.column;
		const vDiff = to.row - from.row;
		const hMoved = hDiff !== 0;
		const vMoved = vDiff !== 0;
		if (hDiffAbs > 1 || (vMoved && vDiff !== 1) || (hMoved && vMoved)) {
		    return false;
		}
	    }
	}
	break;
    }

    // Check general facing

    return true;
}
