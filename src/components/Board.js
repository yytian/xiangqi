// @flow
import React from 'react';
import Square from './Square';

import type { BoardState } from '../types';

type Props = {
    boardState: BoardState,
};

const Board = ({boardState}: Props) => {
    let content = boardState[0][0];
    
    return <div>
	<Square content={content} />
    </div>;
};

export default Board;
