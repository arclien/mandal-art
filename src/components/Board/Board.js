import React from 'react';

import BoardCell from './BoardCell/BoardCell';
import { BOARD_LENGTH } from 'constants/board';

import { GridContainer } from './Board.styles';

const Board = ({ board, setBoards, boardIndex }) => {
  // console.log(board);
  return (
    <GridContainer>
      {board.slice(0, BOARD_LENGTH).map((cell, index) => (
        <BoardCell
          key={cell.id}
          cell={cell}
          setBoards={setBoards}
          board={board}
          boardIndex={boardIndex}
          cellIndex={index}
        />
      ))}
    </GridContainer>
  );
};

export default Board;
