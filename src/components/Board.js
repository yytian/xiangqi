// @flow
import React from 'react';
import Square from './Square';

import type { BoardState } from '../types';

type Props = {
    boardState: BoardState,
};

const Board = ({boardState}: Props) => {
    const squares = boardState.map((row) => {
	return row.map((col) => {
	    return <Square content={col} />
	});
    });
    
    return <div>{squares}</div>;
};

export default Board;
