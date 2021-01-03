import React, { useContext } from 'react';

import { insertItemOnArray, getUUID } from 'utils/utils';
import { TrelloContext, TrelloConsumer } from 'context/TrelloContext';
import BoardCell from './BoardCell/BoardCell';

import { GridContainer } from './Board.styles';

const CENTER_INDEX = 4;
const BOARD_LENGTH = 9;

const getCardsByListId = (cards, listId) =>
  cards.filter((card) => card.idList === listId);

const generateBoard = (list, listId, name) => {
  const shortCount = BOARD_LENGTH - 1 - list.length;
  const dummyList = Array.from({ length: shortCount }, () => ({
    id: `${getUUID()}`,
    name: '',
  }));
  return insertItemOnArray([...list, ...dummyList], CENTER_INDEX, {
    id: listId,
    name,
    isCenter: true,
  });
};

const Board = ({ isMainBoard, listId, boardName }) => {
  return (
    <TrelloConsumer>
      {({
        state: {
          trelloObjects: { lists, cards },
        },
      }) => {
        const cells = isMainBoard
          ? generateBoard(lists, listId, boardName)
          : generateBoard(getCardsByListId(cards, listId), listId, boardName);
        return (
          <GridContainer>
            {cells.map((cell) => (
              <BoardCell key={cell.id} cell={cell} isMainBoard={isMainBoard} />
            ))}
          </GridContainer>
        );
      }}
    </TrelloConsumer>
  );
};

export default Board;
