import React, { useContext } from 'react';

import { TrelloContext } from 'context/TrelloContext';

import { Container } from './Dashboard.styles';

const Dashboard = () => {
  const {
    state: { cards, lists },
  } = useContext(TrelloContext);

  return (
    <Container>
      test
      {lists.map((list) => (
        <div>{JSON.stringify(list)}</div>
      ))}
      {cards.map((card) => (
        <div>{JSON.stringify(card)}</div>
      ))}
    </Container>
  );
};

export default Dashboard;
