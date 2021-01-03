import React from 'react';

import BoardCell from './BoardCell/BoardCell';

import { GridContainer } from './Board.styles';

const Board = ({ board, isMainBoard }) => {
  return (
    <GridContainer>
      {board.map((cell) => (
        <BoardCell key={cell.id} cell={cell} isMainBoard={isMainBoard} />
      ))}
    </GridContainer>
  );
};

export default Board;
