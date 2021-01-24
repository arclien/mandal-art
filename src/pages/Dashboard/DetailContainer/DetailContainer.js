import React, { useEffect, useState, useContext } from 'react';

import { BOARD_CENTER_INDEX } from 'constants/board';
import { TrelloContext } from 'context/TrelloContext';
import Card from './Card/Card';
import List from './List/List';

import { Container, Filler } from './DetailContainer.styles';

const DetailContainer = ({ cardId, listId, boardIndex, cellIndex }) => {
  const {
    state: { boards },
  } = useContext(TrelloContext);

  const [card, setCard] = useState(null);
  const [list, setList] = useState(null);

  useEffect(() => {
    if (cardId) {
      setCard(boards[boardIndex][cellIndex]);
      setList(boards[boardIndex][BOARD_CENTER_INDEX]);
    } else if (listId) {
      setList(boards[boardIndex][cellIndex]);
      setCard(null);
    }
  }, [boardIndex, boards, cardId, cellIndex, listId]);

  return (
    <Container>
      {card && list && (
        <Card
          card={card}
          list={list}
          boardIndex={boardIndex}
          cellIndex={cellIndex}
        />
      )}
      {!card && list && (
        <List list={list} boardIndex={boardIndex} cellIndex={cellIndex} />
      )}

      <Filler />
    </Container>
  );
};

export default DetailContainer;
