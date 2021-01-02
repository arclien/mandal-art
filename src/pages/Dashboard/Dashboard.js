import React, { useContext } from 'react';

import { TrelloContext } from 'context/TrelloContext';

import { Container } from './Dashboard.styles';

const Dashboard = () => {
  const {
    state: { cards, lists },
  } = useContext(TrelloContext);
  return (
    <Container>
      {lists.map((list) => (
        <div key={list}>{JSON.stringify(list)}</div>
      ))}
      {cards.map((card) => (
        <div key={card.name}>{JSON.stringify(card)}</div>
      ))}
    </Container>
  );
};

export default Dashboard;
