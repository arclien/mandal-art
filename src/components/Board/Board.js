import React, { useContext } from 'react';

import { insertItemOnArray, getUUID } from 'utils/utils';
import { TrelloContext } from 'context/TrelloContext';

import { GridContainer, GridItem } from './Board.styles';

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
  });
};

const Board = ({ isMainBoard, listId, boardName }) => {
  const {
    state: {
      trelloObjects: { lists, cards },
    },
  } = useContext(TrelloContext);

  const cell = isMainBoard
    ? generateBoard(lists, listId, boardName)
    : generateBoard(getCardsByListId(cards, listId), listId, boardName);

  return (
    <GridContainer>
      {cell.map(({ id, name }) => (
        <GridItem key={id}>{name}</GridItem>
      ))}
    </GridContainer>
  );
};

export default Board;
