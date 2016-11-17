// @flow

// Wrapper around Square that knows its position
// Used for implementing drag and drop
import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import Square from '../components/Square';

import type { Dispatch, Side, SquareContent } from '../types';
import type { Connector } from 'react-redux';

type Props = {x: number, y: number, content: SquareContent};

const ItemTypes = {SQUARE: 'square'};

function movePiece(fromRow: number, fromColumn: number, toRow: number, toColumn: number) {
    // move to appropriate place for action creators
    return {type: "MOVE_PIECE", from: {row: fromRow, column: fromColumn}, to: {row: toRow, column: toColumn}};
}

const squareSource = {
    beginDrag(props: Props) {
	return {x: props.x, y: props.y};
    },

    canDrag(props: Props, monitor) {
	return props.content != null;
    },
};

function sourceCollect(connect, monitor) {
    return {
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
    }
}

const squareTarget = {
    drop(props, monitor) {
	const {x, y} = monitor.getItem();
	props.dispatch(movePiece(x, y, props.x, props.y));
    }
};

function targetCollect(connect, monitor) {
    return {
	connectDropTarget: connect.dropTarget(),
    };
}

@DragSource(ItemTypes.SQUARE, squareSource, sourceCollect)
@DropTarget(ItemTypes.SQUARE, squareTarget, targetCollect)
class BoardSquare extends React.Component {
    props: Props;

    constructor(props: Props) {
	super(props);
    }
    
    render() {
	const {connectDragPreview, connectDragSource, connectDropTarget} = this.props;
	
	return connectDropTarget(connectDragSource(
		<div><Square connectDragPreview={connectDragPreview} content={this.props.content} /></div>
	));
    }
}

export default connect()(BoardSquare);
