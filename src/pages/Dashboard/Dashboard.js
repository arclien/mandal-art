import React, { useEffect, useContext } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Spinner } from 'remember-ui';

import { TrelloContext, TrelloConsumer } from 'context/TrelloContext';
import Board from 'components/Board/Board';
import { getUUID } from 'utils/utils';

import { Container, BoardWrapper } from './Dashboard.styles';

const Dashboard = () => {
  const {
    params: { boardId },
  } = useRouteMatch();
  const history = useHistory();

  const {
    state: {
      trelloObjects: { isLoaded, isAuthorized },
    },
    actions: { setTrelloBoardId },
  } = useContext(TrelloContext);

  useEffect(() => {
    (async () => {
      setTrelloBoardId(boardId);
    })();
  }, [boardId, setTrelloBoardId]);

  useEffect(() => {
    if (!isAuthorized) history.replace('/home');
  }, [isAuthorized, history]);

  return (
    <TrelloConsumer>
      {({ state: { boards }, actions: { setBoards } }) => (
        <Container>
          {isAuthorized && !isLoaded && <Spinner />}
          {isAuthorized && isLoaded && (
            <BoardWrapper>
              {boards.map((board, index) => (
                <Board
                  key={getUUID()}
                  board={board}
                  isMainBoard={index === 4}
                  setBoards={setBoards}
                  boardIndex={index}
                />
              ))}
            </BoardWrapper>
          )}
        </Container>
      )}
    </TrelloConsumer>
  );
};

export default Dashboard;