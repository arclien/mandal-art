import React, { useState, createContext, useEffect } from 'react';

import { errorToast } from 'utils/toast';
import {
  getLabelsOnBoard,
  getCardsOnBoard,
  getListsOnBoard,
} from 'services/trello';
import { authTrello } from 'services/trelloApi';

const Context = createContext();

const { Provider, Consumer: TrelloConsumer } = Context;
const defaultTrelloObjects = {
  boards: [],
  lists: [],
  cards: [],
  labels: [],
  isAuthorized: true,
};
const TrelloProvider = ({ children }) => {
  const [boardId, setBoardId] = useState();
  const [trelloObjects, setTrelloObjects] = useState({
    ...defaultTrelloObjects,
  });

  useEffect(() => {
    (async () => {
      if (!boardId) return;
      await authTrello().then(async () => {
        try {
          const lists = await getListsOnBoard(boardId);
          const cards = await getCardsOnBoard(boardId);
          const labels = await getLabelsOnBoard(boardId);

          setTrelloObjects((prevState) => ({
            ...prevState,
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

  return (
    <Provider
      value={{
        state: {
          trelloObjects,
        },
        actions: { setBoardId },
      }}
    >
      {children}
    </Provider>
  );
};

const TrelloContext = Context;

export { TrelloProvider, TrelloConsumer, TrelloContext };
