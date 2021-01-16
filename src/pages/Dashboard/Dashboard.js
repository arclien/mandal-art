import React, { useEffect, useContext } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Spinner } from 'remember-ui';
import qs from 'qs';
import { useLocation } from 'react-router';

import DetailContainer from './DetailContainer/DetailContainer';
import LabelContainer from './LabelContainer/LabelContainer';
import { TrelloContext, TrelloConsumer } from 'context/TrelloContext';
import Board from 'components/Board/Board';
import { getUUID } from 'utils/utils';
import { BOARD_LENGTH } from 'constants/board';

import {
  Container,
  BoardWrapper,
  Layout,
  RightSideBar,
} from './Dashboard.styles';

const Dashboard = () => {
  const {
    params: { boardId },
  } = useRouteMatch();
  const history = useHistory();

  const { search } = useLocation();
  const { cardId, listId } = qs.parse(search, {
    ignoreQueryPrefix: true,
  });

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
      {({ state: { boards }, actions: { setBoards } }) => {
        return (
          <Container>
            {isAuthorized && !isLoaded && <Spinner />}
            {isAuthorized && isLoaded && (
              <>
                <LabelContainer />
                <Layout>
                  <BoardWrapper hasRightSideBar={cardId || listId}>
                    {boards?.length > 0 &&
                      boards
                        .slice(0, BOARD_LENGTH)
                        .map((board, index) => (
                          <Board
                            key={getUUID()}
                            board={board}
                            setBoards={setBoards}
                            boardIndex={index}
                          />
                        ))}
                  </BoardWrapper>
                  {(cardId || listId) && (
                    <RightSideBar>
                      <DetailContainer cardId={cardId} listId={listId} />
                    </RightSideBar>
                  )}
                </Layout>
              </>
            )}
          </Container>
        );
      }}
    </TrelloConsumer>
  );
};

export default Dashboard;
