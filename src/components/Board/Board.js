import React, { useEffect, useContext } from 'react';

import DragItem from 'components/DragItem/DragItem';
import { GridContext } from 'context/GridContext';
import BoardCell from './BoardCell/BoardCell';
import { BOARD_LENGTH } from 'constants/board';
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

  useEffect(() => {
    setDragItems((prevState) =>
      replaceArrayOnArray(prevState, boardIndex, board)
    );
  }, [setDragItems, board, boardIndex]);
  // console.log(dragItems[boardIndex]);

  return (
    <GridContainer>
      {dragItems[boardIndex]?.slice(0, BOARD_LENGTH).map((cell, index) => (
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
    </GridContainer>
  );
};

export default Board;
