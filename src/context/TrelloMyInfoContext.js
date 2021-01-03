import React, { useState, createContext } from 'react';

import { errorToast } from 'utils/toast';
import { isEmptyObject } from 'utils/utils';
import { getMyBoards, getMe } from 'services/trello';
import { authTrello } from 'services/trelloApi';

const Context = createContext();

const { Provider, Consumer: TrelloMyInfoConsumer } = Context;

const defaultMyInfoObjects = {
  boards: [],
  me: {},
};

const TrelloMyInfoProvider = ({ children }) => {
  const [myInfo, setMyInfo] = useState({ ...defaultMyInfoObjects });

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
        actions: {
          getMyInfo,
        },
      }}
    >
      {children}
    </Provider>
  );
};

const TrelloMyInfoContext = Context;

export { TrelloMyInfoProvider, TrelloMyInfoConsumer, TrelloMyInfoContext };
