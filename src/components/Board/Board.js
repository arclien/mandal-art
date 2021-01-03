import React from 'react';

import BoardCell from './BoardCell/BoardCell';

import { GridContainer } from './Board.styles';

const Board = ({ board, isMainBoard, setBoards, boardIndex }) => {
  return (
    <GridContainer>
      {board.map((cell, index) => (
        <BoardCell
          key={cell.id}
          cell={cell}
          isMainBoard={isMainBoard}
          setBoards={setBoards}
          boardIndex={boardIndex}
          cellIndex={index}
        />
      ))}
    </GridContainer>
  );
};

export default Board;
