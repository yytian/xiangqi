// @flow
import React from 'react';

import type { Side, SquareContent } from '../types';

type Props = {
    content: SquareContent,
};

const redMap = {
    general: 'shuai-r',
    advisor: 'shi-r',
    elephant: 'xiang-r',
    horse: 'ma-r',
    chariot: 'ju-r',
    cannon: 'pao-r',
    soldier: 'bing-r',
};

const blackMap = {
    general: 'jiang-b',
    advisor: 'shi-b',
    elephant: 'xiang-b',
    horse: 'ma-b',
    chariot: 'ju-b',
    cannon: 'pao-b',
    soldier: 'zu-b',
}

function getSpriteName(owner: Side, type: string) {
    let spriteName = null;

    if (owner == 'red') {
	spriteName = redMap[type];
    } else if (owner == 'black') {
	spriteName = blackMap[type];
    }

    if (spriteName == null) {
	throw new Error('Unrecognized sprite type');
    } else {
	return spriteName;
    }
}

const Square = ({content}: Props) => {
    let piece = null;

    if (content != null) {
	let spriteName = getSpriteName(content.owner, content.type);
	const className = `piece sprite ${spriteName}`;
	piece = <div className={className} />;
    }
    
    return <div className="square">{piece}</div>
};

export default Square;
