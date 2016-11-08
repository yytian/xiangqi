// @flow
import Board from '../components/Board';
import { connect } from 'react-redux';

import type { State, Dispatch } from '../types';
import type { Connector } from 'react-redux';
import type { BoardProps } from '../components/Board';

const mapStateToProps = (state: State): BoardProps => {
  return {
      boardState: state.boardState,
  };
};

const connector: Connector<{}, BoardProps> = connect(
    mapStateToProps,
);

export default connector(Board);
