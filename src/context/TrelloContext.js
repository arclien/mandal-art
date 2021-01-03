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

const getDummyList = (currentLength, trelloType, defaultProps = {}) =>
  Array.from({ length: BOARD_LENGTH - 1 - currentLength }, () => ({
    ...defaultProps,
    id: `${getUUID()}`,
    name: '',
    trelloType,
  }));

const getCardsByListId = (cards, listId) =>
  cards.filter((card) => card.idList === listId);

const generateBoard = (board, lists, cards) => {
  // console.log(board, lists, cards);

  // 리스트 없는 경우 생성
  const newLists = insertItemOnArray(
    [...lists, ...getDummyList(lists.length, 'list', { idBoard: board.id })],
    CENTER_INDEX,
    {
      id: board.id,
      name: board.name,
      trelloType: 'board',
      isCenter: true,
    }
  );

  return newLists.map((list, index) => {
    // 가운데 보드(리스트) 생성(셀)
    if (index === CENTER_INDEX) {
      return newLists.map(({ id, name, idBoard }, i) => ({
        id,
        name,
        idBoard,
        trelloType: i === CENTER_INDEX ? 'board' : 'list',
        isCenter: i === CENTER_INDEX,
      }));
    }

    // 각 리스트(보드)에 종속된 카드 (셀) 필터
    const _cards = getCardsByListId(cards, list.id).map(
      ({ id, name, idBoard, idList }) => ({
        id,
        name,
        idBoard,
        idList,
        trelloType: 'card',
      })
    );

    // 긱 리스트(보드)에 종속된 카드 (셀) 더미 생성
    return insertItemOnArray(
      [
        ..._cards,
        ...getDummyList(_cards.length, 'card', {
          idBoard: board.id,
          isList: list.id,
        }),
      ],
      CENTER_INDEX,
      {
        id: list.id,
        name: list.name,
        idBoard: list.idBoard,
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
