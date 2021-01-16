import React, { useEffect, useState, useContext } from 'react';

import { TrelloContext } from 'context/TrelloContext';
import Card from './Card/Card';
import List from './List/List';

import { Container, Filler } from './DetailContainer.styles';

const DetailContainer = ({ cardId, listId }) => {
  const {
    state: {
      trelloObjects: { lists, cards },
    },
  } = useContext(TrelloContext);

  const [card, setCard] = useState(null);
  const [list, setList] = useState(null);

  useEffect(() => {
    if (cardId) {
      const _card = cards.find((el) => el.id === cardId);
      setCard(_card);
      setList(lists.find((el) => el.id === _card?.idList));
    } else if (listId) {
      setList(lists.find((el) => el.id === listId));
      setCard(null);
    }
  }, [cardId, cards, listId, lists]);

  return (
    <Container>
      {card && list && <Card card={card} list={list} />}
      {!card && list && <List list={list} />}

      <Filler />
    </Container>
  );
};

export default DetailContainer;
