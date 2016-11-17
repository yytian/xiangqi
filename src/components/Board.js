// @flow
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardSquare from '../containers/BoardSquare';

import type { BoardState } from '../types';

type Props = {
    boardState: BoardState,
};

const ItemTypes = {
    PIECE: 'piece',
};

const dragSource = {
    beginDrag(props: Props) {
	return {};
    }
}

@DragDropContext(HTML5Backend)
export default class Board extends React.Component {
    props: Props;

    constructor(props: Props) {
	super(props);
    }

    render() {
	const squares = this.props.boardState.map((row, i) => {
	    return row.map((col, j) => {
		return <BoardSquare x={i} y={j} content={col} />
	    });
	});

	return <div className="board">{squares}</div>;
    }
};
