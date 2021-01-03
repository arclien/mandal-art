import React, { useState, createContext, useEffect } from 'react';

import { errorToast } from 'utils/toast';
import {
  getLabelsOnBoard,
  getCardsOnBoard,
  getListsOnBoard,
  getBoard,
} from 'services/trello';
import { authTrello } from 'services/trelloApi';
import { insertItemOnArray, getUUID } from 'utils/utils';

const CENTER_INDEX = 4;
const BOARD_LENGTH = 9;

const getDummyList = (currentLength, trelloType) =>
  Array.from({ length: BOARD_LENGTH - 1 - currentLength }, () => ({
    id: `${getUUID()}`,
    name: '',
    trelloType,
  }));

const getCardsByListId = (cards, listId) =>
  cards.filter((card) => card.idList === listId);

const generateBoard = (board, lists, cards) => {
  // console.log(board, lists, cards);
  const newLists = insertItemOnArray(
    [...lists, ...getDummyList(lists.length, 'list')],
    CENTER_INDEX,
    {
      id: board.id,
      name: board.name,
      trelloType: 'board',
      isCenter: true,
    }
  );

  return newLists.map((list, index) => {
    if (index === CENTER_INDEX) {
      const _lists = lists.map(({ id, name }) => ({
        id,
        name,
        trelloType: 'list',
      }));
      return insertItemOnArray(
        [..._lists, ...getDummyList(lists.length, 'list')],
        CENTER_INDEX,
        {
          id: list.id,
          name: list.name,
          trelloType: 'board',
          isCenter: true,
        }
      );
    }
    const _cards = getCardsByListId(cards, list.id).map(({ id, name }) => ({
      id,
      name,
      trelloType: 'card',
    }));

    return insertItemOnArray(
      [..._cards, ...getDummyList(_cards.length, 'card')],
      CENTER_INDEX,
      {
        id: list.id,
        name: list.name,
        trelloType: 'list',
        isCenter: true,
      }
    );
  });
};

const Context = createContext();

const { Provider, Consumer: TrelloConsumer } = Context;
const defaultTrelloObjects = {
  board: {},
  lists: [],
  cards: [],
  labels: [],
  isAuthorized: true,
  isLoaded: false,
};

const TrelloProvider = ({ children }) => {
  const [trelloBoardId, setTrelloBoardId] = useState();
  const [boards, setBoards] = useState([[]]);
  const [trelloObjects, setTrelloObjects] = useState({
    ...defaultTrelloObjects,
  });

  useEffect(() => {
    (async () => {
      if (!trelloBoardId) return;
      await authTrello().then(async () => {
        try {
          const board = await getBoard(trelloBoardId);
          const lists = await getListsOnBoard(trelloBoardId);
          const cards = await getCardsOnBoard(trelloBoardId);
          const labels = await getLabelsOnBoard(trelloBoardId);

          const _boards = generateBoard(board, lists, cards, labels);
          setBoards(_boards);
          // console.log(_boards);
          setTrelloObjects((prevState) => ({
            ...prevState,
            board,
            lists,
            cards,
            labels,
            isLoaded: true,
          }));
        } catch (e) {
          setTrelloObjects({
            ...defaultTrelloObjects,
            isAuthorized: false,
          });
          errorToast('유효하지 않은 접근입니다.');
        }
      });
    })();
  }, [trelloBoardId]);

  return (
    <Provider
      value={{
        state: {
          boards,
          trelloObjects,
        },
        actions: {
          setBoards,
          setTrelloBoardId,
          setTrelloObjects,
        },
      }}
    >
      {children}
    </Provider>
  );
};

const TrelloContext = Context;

export { TrelloProvider, TrelloConsumer, TrelloContext };
