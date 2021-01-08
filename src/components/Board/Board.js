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
    <>
      {dragItems && dragItems[boardIndex] && dragItems[boardIndex].length > 0 && (
        <GridContainer>
          <DragItem
            key={dragItems[boardIndex][0]?.id}
            id={dragItems[boardIndex][0]?.id}
            boardIndex={boardIndex}
            onMoveItem={moveItem}
          >
            <GridItem>
              <BoardCell
                key={dragItems[boardIndex][0]?.id}
                cell={dragItems[boardIndex][0]}
                setBoards={setBoards}
                boardIndex={boardIndex}
                cellIndex={0}
              />
            </GridItem>
          </DragItem>

          <DragItem
            key={dragItems[boardIndex][1]?.id}
            id={dragItems[boardIndex][1]?.id}
            boardIndex={boardIndex}
            onMoveItem={moveItem}
          >
            <GridItem>
              <BoardCell
                key={dragItems[boardIndex][1]?.id}
                cell={dragItems[boardIndex][1]}
                setBoards={setBoards}
                boardIndex={boardIndex}
                cellIndex={1}
              />
            </GridItem>
          </DragItem>

          <DragItem
            key={dragItems[boardIndex][2]?.id}
            id={dragItems[boardIndex][2]?.id}
            boardIndex={boardIndex}
            onMoveItem={moveItem}
          >
            <GridItem>
              <BoardCell
                key={dragItems[boardIndex][2]?.id}
                cell={dragItems[boardIndex][2]}
                setBoards={setBoards}
                boardIndex={boardIndex}
                cellIndex={2}
              />
            </GridItem>
          </DragItem>

          <DragItem
            key={dragItems[boardIndex][3]?.id}
            id={dragItems[boardIndex][3]?.id}
            boardIndex={boardIndex}
            onMoveItem={moveItem}
          >
            <GridItem>
              <BoardCell
                key={dragItems[boardIndex][3]?.id}
                cell={dragItems[boardIndex][3]}
                setBoards={setBoards}
                boardIndex={boardIndex}
                cellIndex={3}
              />
            </GridItem>
          </DragItem>

          <GridItem>
            <BoardCell
              key={centerCell[0].id}
              cell={centerCell[0]}
              setBoards={setBoards}
              boardIndex={boardIndex}
              cellIndex={BOARD_CENTER_INDEX}
            />
          </GridItem>

          <DragItem
            key={dragItems[boardIndex][4]?.id}
            id={dragItems[boardIndex][4]?.id}
            boardIndex={boardIndex}
            onMoveItem={moveItem}
          >
            <GridItem>
              <BoardCell
                key={dragItems[boardIndex][4]?.id}
                cell={dragItems[boardIndex][4]}
                setBoards={setBoards}
                boardIndex={boardIndex}
                cellIndex={4}
              />
            </GridItem>
          </DragItem>

          <DragItem
            key={dragItems[boardIndex][5]?.id}
            id={dragItems[boardIndex][5]?.id}
            boardIndex={boardIndex}
            onMoveItem={moveItem}
          >
            <GridItem>
              <BoardCell
                key={dragItems[boardIndex][5]?.id}
                cell={dragItems[boardIndex][5]}
                setBoards={setBoards}
                boardIndex={boardIndex}
                cellIndex={5}
              />
            </GridItem>
          </DragItem>

          <DragItem
            key={dragItems[boardIndex][6]?.id}
            id={dragItems[boardIndex][6]?.id}
            boardIndex={boardIndex}
            onMoveItem={moveItem}
          >
            <GridItem>
              <BoardCell
                key={dragItems[boardIndex][6]?.id}
                cell={dragItems[boardIndex][6]}
                setBoards={setBoards}
                boardIndex={boardIndex}
                cellIndex={6}
              />
            </GridItem>
          </DragItem>

          <DragItem
            key={dragItems[boardIndex][7]?.id}
            id={dragItems[boardIndex][7]?.id}
            boardIndex={boardIndex}
            onMoveItem={moveItem}
          >
            <GridItem>
              <BoardCell
                key={dragItems[boardIndex][7]?.id}
                cell={dragItems[boardIndex][7]}
                setBoards={setBoards}
                boardIndex={boardIndex}
                cellIndex={7}
              />
            </GridItem>
          </DragItem>
        </GridContainer>
      )}
    </>
  );
};

export default Board;
