import React, { useState, createContext, useEffect } from 'react';

import { TRELLO_MANDAL_ART_ID } from 'constants/trello';
import {
  getLabelsOnBoard,
  getCardsOnBoard,
  getListsOnBoard,
} from 'services/trello';
import { authTrello } from 'services/trelloApi';

const Context = createContext();

const { Provider, Consumer: TrelloConsumer } = Context;

const TrelloProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [labels, setLabels] = useState([]);
  const [listObjectList, setListObjectList] = useState([]);
  const [cardObjectList, setCardObjectList] = useState([]);
  const [labelObjectList, setLabelObjectList] = useState([]);

  useEffect(() => {
    (async () => {
      await authTrello().then(async () => {
        const listObject = await getListsOnBoard(TRELLO_MANDAL_ART_ID);
        setListObjectList(listObject);
        const _lists = listObject.reduce((acc, cur) => {
          return [...acc, cur.name];
        }, []);
        setLists([..._lists]);

        const labelObject = await getLabelsOnBoard(TRELLO_MANDAL_ART_ID);
        setLabelObjectList(labelObject);
        const _labels = labelObject.reduce((acc, cur) => {
          return [...acc, cur.name];
        }, []);
        setLabels([..._labels]);

        const cardObject = await getCardsOnBoard(TRELLO_MANDAL_ART_ID);
        setCardObjectList(cardObject);
        const _cards = cardObject.map((card) => {
          return {
            name: card.name,
            desc: card.desc,
            due: card.due ? card.due.split('T')[0] : '',
            labels: card.labels.map((_label) => _label.name).join('/'),
          };
        });

        setCards(_cards);
      });
    })();
  }, []);

  return (
    <Provider
      value={{
        state: {
          lists,
          cards,
          labels,
          listObjectList,
          labelObjectList,
          cardObjectList,
        },
        actions: { setLabels },
      }}
    >
      {children}
    </Provider>
  );
};

const TrelloContext = Context;

export { TrelloProvider, TrelloConsumer, TrelloContext };
