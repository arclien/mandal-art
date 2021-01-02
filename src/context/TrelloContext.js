import React, { useState, createContext, useEffect } from 'react';

import { errorToast } from 'utils/toast';
import { isEmptyObject } from 'utils/utils';
import {
  getLabelsOnBoard,
  getCardsOnBoard,
  getListsOnBoard,
  getBoard,
  getMyBoards,
  getMe,
} from 'services/trello';
import { authTrello } from 'services/trelloApi';

const Context = createContext();

const { Provider, Consumer: TrelloConsumer } = Context;
const defaultTrelloObjects = {
  board: {},
  lists: [],
  cards: [],
  labels: [],
  isAuthorized: true,
};

const defaultMyInfoObjects = {
  boards: [],
  me: {},
};

const TrelloProvider = ({ children }) => {
  const [myInfo, setMyInfo] = useState({ ...defaultMyInfoObjects });
  const [trelloObjects, setTrelloObjects] = useState({
    ...defaultTrelloObjects,
  });
  const [boardId, setBoardId] = useState();

  useEffect(() => {
    (async () => {
      if (!boardId) return;
      await authTrello().then(async () => {
        try {
          const board = await getBoard(boardId);
          const lists = await getListsOnBoard(boardId);
          const cards = await getCardsOnBoard(boardId);
          const labels = await getLabelsOnBoard(boardId);

          setTrelloObjects((prevState) => ({
            ...prevState,
            board,
            lists,
            cards,
            labels,
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
  }, [boardId]);

  const getMyInfo = async () => {
    if (!isEmptyObject(myInfo?.me)) return myInfo;

    return authTrello().then(async () => {
      try {
        const me = await getMe();
        const boards = await getMyBoards();

        setMyInfo((prevState) => ({
          ...prevState,
          me,
          boards,
        }));

        return myInfo;
      } catch (e) {
        setMyInfo({
          ...defaultMyInfoObjects,
        });
        errorToast('유효하지 않은 접근입니다.');
      }
    });
  };

  return (
    <Provider
      value={{
        state: {
          trelloObjects,
        },
        actions: { setBoardId, getMyInfo },
      }}
    >
      {children}
    </Provider>
  );
};

const TrelloContext = Context;

export { TrelloProvider, TrelloConsumer, TrelloContext };
