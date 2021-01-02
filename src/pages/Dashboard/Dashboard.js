import React, { useEffect, useContext } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Spinner } from 'remember-ui';

import { TrelloContext } from 'context/TrelloContext';

import { Container } from './Dashboard.styles';

const Dashboard = () => {
  const {
    params: { boardId },
  } = useRouteMatch();
  const history = useHistory();

  const {
    state: {
      trelloObjects: { lists, cards, labels, isAuthorized },
    },
    actions: { setBoardId },
  } = useContext(TrelloContext);

  useEffect(() => {
    (async () => {
      setBoardId(boardId);
    })();
  }, [boardId, setBoardId]);

  useEffect(() => {
    if (!isAuthorized) history.replace('/home');
  }, [isAuthorized, history]);

  return (
    <Container>
      {isAuthorized && lists.length === 0 && <Spinner />}

      {lists.map(({ id, name }) => (
        <div key={id}>
          {id} - {name}
        </div>
      ))}

      <br />
      <br />
      <br />

      {cards.map(({ id, desc, idList, idLabels, name }) => (
        <div key={id}>
          {idList} - {name} - {desc}
        </div>
      ))}
    </Container>
  );
};

export default Dashboard;
