import React, { useEffect, useContext } from 'react';

import DragItem from 'components/DragItem/DragItem';
import { GridContext } from 'context/GridContext';
import BoardCell from './BoardCell/BoardCell';
import { BOARD_LENGTH, BOARD_CENTER_INDEX } from 'constants/board';
import { replaceArrayOnArray } from 'utils/utils';

import { GridContainer, GridItemWrapper } from './Board.styles';

const GridItem = ({ forwardedRef, ...props }) => (
  <GridItemWrapper ref={forwardedRef} {...props} />
);

const Board = ({ board, setBoards, boardIndex }) => {
  const {
    state: { dragItems },
    actions: { moveItem, setDragItems },
  } = useContext(GridContext);
  const centerCell = board.filter((el) => el.isCenter);
  // const newBoard = board.filter((el) => !el.isCenter);
  // console.log(board);
  useEffect(() => {
    setDragItems((prevState) =>
      replaceArrayOnArray(
        prevState,
        boardIndex,
        board.filter((el) => !el.isCenter)
      )
    );
  }, [boardIndex, board, setDragItems]);
  // console.log(dragItems[boardIndex]);

  return (
    <GridContainer>
      {dragItems[boardIndex]
        ?.slice(0, BOARD_CENTER_INDEX)
        .map((cell, index) => (
          <DragItem
            key={cell.id}
            id={cell.id}
            boardIndex={boardIndex}
            onMoveItem={moveItem}
          >
            <GridItem>
              <BoardCell
                key={cell.id}
                cell={cell}
                setBoards={setBoards}
                boardIndex={boardIndex}
                cellIndex={index}
              />
            </GridItem>
          </DragItem>
        ))}
      <GridItem>
        <BoardCell
          key={centerCell[0].id}
          cell={centerCell[0]}
          setBoards={setBoards}
          boardIndex={boardIndex}
          cellIndex={BOARD_CENTER_INDEX}
        />
      </GridItem>
      {dragItems[boardIndex]
        ?.slice(BOARD_CENTER_INDEX, BOARD_LENGTH - 1)
        .map((cell, index) => (
          <DragItem
            key={cell.id}
            id={cell.id}
            boardIndex={boardIndex}
            onMoveItem={moveItem}
          >
            <GridItem>
              <BoardCell
                key={cell.id}
                cell={cell}
                setBoards={setBoards}
                boardIndex={boardIndex}
                cellIndex={index + BOARD_CENTER_INDEX + 1}
              />
            </GridItem>
          </DragItem>
        ))}
    </GridContainer>
  );
};

export default Board;
