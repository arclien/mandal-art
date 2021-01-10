import React, { useEffect, useContext } from 'react';
import { Spinner } from 'remember-ui';

import DragItem from 'components/DragItem/DragItem';
import { GridContext } from 'context/GridContext';
import { TrelloContext } from 'context/TrelloContext';
import BoardCell from './BoardCell/BoardCell';
import { BOARD_CENTER_INDEX } from 'constants/board';
import { replaceArrayOnArray } from 'utils/utils';

import { GridContainer, GridItemWrapper, GridOverlay } from './Board.styles';

const GridItem = ({ forwardedRef, ...props }) => (
  <GridItemWrapper ref={forwardedRef} {...props} />
);

const Board = ({ board, setBoards, boardIndex }) => {
  const {
    state: { dragItems },
    actions: { moveItem, dropItem, setDragItems },
  } = useContext(GridContext);

  const {
    state: { canDrag },
  } = useContext(TrelloContext);

  const centerCell = board.filter((el) => el.isCenter);

  useEffect(() => {
    setDragItems((prevState) =>
      replaceArrayOnArray(
        prevState,
        boardIndex,
        board.filter((el) => !el.isCenter)
      )
    );
  }, [boardIndex, board, setDragItems]);

  const renderDragItem = (item, index) => {
    return (
      <DragItem
        key={item?.id}
        id={item?.id}
        boardIndex={boardIndex}
        onMoveItem={moveItem}
        onDropItem={dropItem}
        canDrag={boardIndex !== BOARD_CENTER_INDEX && canDrag}
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
          {!canDrag && (
            <GridOverlay>
              <Spinner />
            </GridOverlay>
          )}
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
