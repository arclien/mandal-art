import React from 'react';

import { TRELLO_MANDAL_ART_ID } from 'constants/trello';

import { Container, Title, BoardLink, Filler } from './Home.styles';

const Home = () => {
  return (
    <>
      <Container>
        <Title>Mandal Art</Title>
        <BoardLink to={`/board/${TRELLO_MANDAL_ART_ID}`}>
          <BoardLink.Button theme="yellow" size="xlarge" onClick={() => {}}>
            Test Board 이동
          </BoardLink.Button>
        </BoardLink>
        <Filler />
      </Container>
    </>
  );
};

export default Home;
