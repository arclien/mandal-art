import React, { useState, createContext, useEffect, useCallback } from 'react';

import { TRELLO_COLLECTION_TYPE } from 'constants/trello';
import { errorToast } from 'utils/toast';
import {
  getLabelsOnBoard,
  getCardsOnBoard,
  getListsOnBoard,
  getBoard,
  getCardsOnList,
} from 'services/trello';
import { authTrello } from 'services/trelloApi';
import { insertItemOnArray, getUUID, replaceArrayOnArray } from 'utils/utils';
import { BOARD_CENTER_INDEX, BOARD_LENGTH } from 'constants/board';

const getDummyList = (currentLength, trelloType, defaultProps = {}) =>
  Array.from({ length: BOARD_LENGTH - 1 - currentLength }, (v, i) => ({
    ...defaultProps,
    id: `${getUUID()}`,
    name: '',
    trelloType,
    pos: currentLength + i + 1,
  }));

const getCardsByListId = (cards, listId) =>
  cards.filter((card) => card.idList === listId);

const generateBoard = (board, lists, cards) => {
  // console.log(board, lists, cards);

  // 리스트 없는 경우 생성
  const newLists = insertItemOnArray(
    [
      ...lists,
      ...getDummyList(lists.length, TRELLO_COLLECTION_TYPE.LISTS, {
        idBoard: board.id,
      }),
    ],
    BOARD_CENTER_INDEX,
    {
      id: board.id,
      name: board.name,
      trelloType: TRELLO_COLLECTION_TYPE.BOARDS,
      isCenter: true,
      pos: BOARD_CENTER_INDEX,
    }
  );

  return newLists.map((list, index) => {
    // 가운데 보드(리스트) 생성(셀)
    if (index === BOARD_CENTER_INDEX) {
      return newLists.map(({ id, name, idBoard }, i) => ({
        id,
        name,
        idBoard,
        url: board.shortUrl,
        trelloType:
          i === BOARD_CENTER_INDEX
            ? TRELLO_COLLECTION_TYPE.BOARDS
            : TRELLO_COLLECTION_TYPE.LISTS,
        isCenter: i === BOARD_CENTER_INDEX,
        pos: i,
      }));
    }

    // 각 리스트(보드)에 종속된 카드 (셀) 필터
    const _cards = getCardsByListId(cards, list.id).map(
      (
        {
          id,
          name,
          idBoard,
          idList,
          shortUrl,
          desc,
          badges,
          idChecklists,
          labels,
          pos,
        },
        _index
      ) => ({
        id,
        name,
        idBoard,
        idList,
        url: shortUrl,
        desc,
        badges,
        idChecklists,
        labels,
        trelloType: TRELLO_COLLECTION_TYPE.CARDS,
        pos,
      })
    );

    // 긱 리스트(보드)에 종속된 카드 (셀) 더미 생성
    return insertItemOnArray(
      [
        ..._cards,
        ...getDummyList(_cards.length, TRELLO_COLLECTION_TYPE.CARDS, {
          idBoard: board.id,
          idList: list.id,
        }),
      ],
      BOARD_CENTER_INDEX,
      {
        id: list.id,
        name: list.name,
        idBoard: list.idBoard,
        trelloType: TRELLO_COLLECTION_TYPE.LISTS,
        isCenter: true,
        pos: BOARD_CENTER_INDEX,
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
  const [canDrag, setCanDrag] = useState(false);
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

          setTrelloObjects((prevState) => ({
            ...prevState,
            board,
            lists,
            cards,
            labels,
            isLoaded: true,
          }));

          setCanDrag(true);
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

  const fetchCardsOnList = useCallback(
    async (_idList, boardIndex) => {
      if (canDrag) setCanDrag(false);
      const _cards = await getCardsOnList(_idList);

      setBoards((prevState) => {
        const { idBoard } = prevState[boardIndex][BOARD_CENTER_INDEX];
        const idList = prevState[boardIndex][BOARD_CENTER_INDEX].id;
        return replaceArrayOnArray(
          prevState,
          boardIndex,
          insertItemOnArray(
            [
              ..._cards.map(
                ({
                  id,
                  name,
                  pos,
                  shortUrl,
                  desc,
                  badges,
                  idChecklists,
                  labels,
                }) => ({
                  id,
                  name,
                  idList,
                  idBoard,
                  url: shortUrl,
                  desc,
                  badges,
                  idChecklists,
                  labels,
                  trelloType:
                    boardIndex === BOARD_CENTER_INDEX
                      ? TRELLO_COLLECTION_TYPE.LISTS
                      : TRELLO_COLLECTION_TYPE.CARDS,
                  isCenter: false,
                  pos,
                })
              ),
              ...getDummyList(_cards.length, TRELLO_COLLECTION_TYPE.CARDS, {
                idBoard,
                idList,
              }),
            ],
            BOARD_CENTER_INDEX,
            prevState[boardIndex][BOARD_CENTER_INDEX]
          )
        );
      });

      setTrelloObjects((prevState) => ({
        ...prevState,
        _cards,
      }));
      setCanDrag(true);
    },
    [canDrag]
  );

  return (
    <Provider
      value={{
        state: {
          canDrag,
          boards,
          trelloObjects,
        },
        actions: {
          setCanDrag,
          setBoards,
          setTrelloBoardId,
          setTrelloObjects,
          fetchCardsOnList,
        },
      }}
    >
      {children}
    </Provider>
  );
};

const TrelloContext = Context;

export { TrelloProvider, TrelloConsumer, TrelloContext };
