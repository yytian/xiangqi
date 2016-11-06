// @flow
import React from 'react';

import type { SquareContent } from '../types';

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

const Square = ({content}: Props) => {
    if (content == null) {
	return null;
    }
    
    let spriteName = '';
    
    if (content.owner = 'red') {
	spriteName = redMap[content.type];
    } else if (content.owner = 'black') {
	spriteName = blackMap[content.type];
    }

    const className = `sprite ${spriteName}`;
    
    return <div className={className} />
};

export default Square;
