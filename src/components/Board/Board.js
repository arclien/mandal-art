import React, { useEffect, useContext } from 'react';

import DragItem from 'components/DragItem/DragItem';
import { GridContext } from 'context/GridContext';
import BoardCell from './BoardCell/BoardCell';
import { BOARD_CENTER_INDEX } from 'constants/board';
import { replaceArrayOnArray } from 'utils/utils';

import { GridContainer, GridItemWrapper } from './Board.styles';

const GridItem = ({ forwardedRef, ...props }) => (
  <GridItemWrapper ref={forwardedRef} {...props} />
);

const Board = ({ board, setBoards, boardIndex }) => {
  const {
    state: { dragItems },
    actions: { moveItem, dropItem, setDragItems },
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

  const renderDragItem = (item, index) => {
    return (
      <DragItem
        key={item?.id}
        id={item?.id}
        boardIndex={boardIndex}
        onMoveItem={moveItem}
        onDropItem={dropItem}
      >
        <GridItem>
          <BoardCell
            key={item?.id}
            cell={item}
            setBoards={setBoards}
            boardIndex={boardIndex}
            cellIndex={index}
          />
        </GridItem>
      </DragItem>
    );
  };
  return (
    <>
      {dragItems && dragItems[boardIndex] && dragItems[boardIndex].length > 0 && (
        <GridContainer>
          {renderDragItem(dragItems[boardIndex][0], 0)}
          {renderDragItem(dragItems[boardIndex][1], 1)}
          {renderDragItem(dragItems[boardIndex][2], 2)}
          {renderDragItem(dragItems[boardIndex][3], 3)}

          <GridItem>
            <BoardCell
              key={centerCell[0].id}
              cell={centerCell[0]}
              setBoards={setBoards}
              boardIndex={boardIndex}
              cellIndex={BOARD_CENTER_INDEX}
            />
          </GridItem>

          {renderDragItem(dragItems[boardIndex][4], 4)}
          {renderDragItem(dragItems[boardIndex][5], 5)}
          {renderDragItem(dragItems[boardIndex][6], 6)}
          {renderDragItem(dragItems[boardIndex][7], 7)}
        </GridContainer>
      )}
    </>
  );
};

export default Board;
