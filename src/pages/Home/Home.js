import React, { useEffect, useState, useContext } from 'react';

import { TRELLO_MANDAL_ART_ID } from 'constants/trello';
import { TrelloMyInfoContext } from 'context/TrelloMyInfoContext';

import {
  Container,
  Title,
  Text,
  BoardList,
  BoardLink,
  Filler,
} from './Home.styles';

const Home = () => {
  const {
    actions: { getMyInfo },
  } = useContext(TrelloMyInfoContext);

  const [myInfo, setMyInfo] = useState({
    email: '',
    fullName: '',
    id: '',
    idBoards: [],
    boards: [],
  });

  useEffect(() => {
    (async () => {
      const {
        me: { email, fullName, id, idBoards },
        boards,
      } = await getMyInfo();

      setMyInfo({
        email,
        fullName,
        id,
        idBoards,
        boards,
      });
    })();
  }, [getMyInfo]);

  return (
    <>
      <Container>
        <Title>Mandal Art</Title>
        <Text>유저 이름 : {myInfo?.fullName}</Text>
        <Text>유저 이메일 : {myInfo?.email}</Text>

        <BoardLink to={`/board/${TRELLO_MANDAL_ART_ID}`}>
          <BoardLink.Button theme="yellow" size="xlarge" onClick={() => {}}>
            Test Board 이동
          </BoardLink.Button>
        </BoardLink>

        <BoardList>
          {myInfo?.boards.map(({ name, id }) => (
            <BoardLink key={id} to={`/board/${id}`}>
              <BoardLink.Button theme="yellow" size="large" onClick={() => {}}>
                {name} 이동
              </BoardLink.Button>
            </BoardLink>
          ))}
        </BoardList>

        <Filler />
      </Container>
    </>
  );
};

export default Home;
