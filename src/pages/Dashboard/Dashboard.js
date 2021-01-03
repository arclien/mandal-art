import React, { useEffect, useContext } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Spinner } from 'remember-ui';

import { TrelloContext, TrelloConsumer } from 'context/TrelloContext';
import Board from 'components/Board/Board';
import { getUUID } from 'utils/utils';

import { Container, BoardWrapper } from './Dashboard.styles';

const CENTER_INDEX = 4;
const Dashboard = () => {
  const {
    params: { boardId },
  } = useRouteMatch();
  const history = useHistory();

  const {
    state: {
      trelloObjects: { isLoaded, isAuthorized },
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
    <TrelloConsumer>
      {({
        state: {
          trelloObjects: { board, lists },
        },
      }) => (
        <Container>
          {isAuthorized && !isLoaded && <Spinner />}
          {isAuthorized && isLoaded && (
            <BoardWrapper>
              {lists.map(({ id, name }, index) => {
                if (index === CENTER_INDEX) {
                  return (
                    <React.Fragment key={getUUID()}>
                      <Board
                        isMainBoard
                        key={getUUID()}
                        listId="center"
                        boardName={board?.name}
                      />
                      <Board key={id} listId={id} boardName={name} />
                    </React.Fragment>
                  );
                }
                return <Board key={id} listId={id} boardName={name} />;
              })}
            </BoardWrapper>
          )}
        </Container>
      )}
    </TrelloConsumer>
  );
};

export default Dashboard;
