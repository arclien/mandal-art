import React, { useState, useEffect } from 'react';

import { getFormattedDate } from 'utils/day';
import { CalendarFormat } from 'constants/calendar';
import { browserOpen } from 'utils/utils';
import { getActionsOnCard } from 'services/trello';
import { TRELLO_COLLECTION_TYPE } from 'constants/trello';
import { BOARD_CENTER_INDEX } from 'constants/board';
import BoardCellLabel from 'components/Board/BoardCellLabel/BoardCellLabel';
import BoardCellBadge from 'components/Board/BoardCellBadge/BoardCellBadge';
import BoardCellTitle from 'components/Board/BoardCellTitle/BoardCellTitle';
import BoardCellDesc from 'components/Board/BoardCellDesc/BoardCellDesc';
import BoardCellCheckList from 'components/Board/BoardCellCheckList/BoardCellCheckList';

import { Container, Info, Divider, Row, CheckList } from './Card.styles';

const Card = ({ card, list, boardIndex, cellIndex }) => {
  // console.log(card);
  const { id, badges, idBoard, idList, idChecklists, labels, shortUrl } = card;
  const { name: nameList } = list;
  const [commentList, setCommentList] = useState([]);
  const [idChecklistsOnCard, setIdCheckListsOnCard] = useState([
    ...idChecklists,
  ]);

  useEffect(() => {
    (async () => {
      const comments = await getActionsOnCard(id);
      setCommentList(comments);
    })();
  }, [id]);

  // console.log(commentList);
  return (
    <Container>
      <Info>
        <Info.Title>
          <BoardCellTitle
            cell={{ ...card, trelloType: TRELLO_COLLECTION_TYPE.CARDS }}
            boardIndex={boardIndex}
            cellIndex={cellIndex}
            showFull
          />

          <Info.TrelloLink
            onClick={() => {
              browserOpen(shortUrl);
            }}
          />
        </Info.Title>
        <Info.Attr>
          <Info.Attr.Type>
            in list &nbsp;
            <Info.Attr.Link
              to={`/board/${idBoard}?listId=${idList}&boardIndex=${BOARD_CENTER_INDEX}&cellIndex=${boardIndex}`}
            >
              {nameList}
            </Info.Attr.Link>
          </Info.Attr.Type>
          <Info.Attr.Type>Type: Card</Info.Attr.Type>
        </Info.Attr>
      </Info>

      <Divider />

      {labels && labels.length > 0 && (
        <>
          <Row>
            <Row.Title>Labels</Row.Title>
            <BoardCellLabel labels={labels} isCardView showFull />
          </Row>
          <Divider />
        </>
      )}

      {badges && (
        <>
          <Row>
            <Row.Title>Date</Row.Title>
            <BoardCellBadge badges={badges} isCardView />
          </Row>
          <Divider />
        </>
      )}

      <Row>
        <Row.Title>Description</Row.Title>
        <BoardCellDesc
          cell={{ ...card, trelloType: TRELLO_COLLECTION_TYPE.CARDS }}
          boardIndex={boardIndex}
        />
      </Row>

      <Divider />

      {idChecklistsOnCard.length > 0 && (
        <>
          <Row>
            <Row.Title>CheckLists</Row.Title>
            <BoardCellCheckList
              idCard={id}
              idChecklists={idChecklistsOnCard}
              setIdCheckListsOnCard={setIdCheckListsOnCard}
            />
          </Row>

          <Divider />
        </>
      )}

      {commentList.length > 0 && (
        <>
          <Row>
            <Row.Title>CommentList</Row.Title>
            {commentList.map((comment) => {
              return (
                <CheckList key={comment.id}>
                  <CheckList.Title>{comment.data.text}</CheckList.Title>
                  <CheckList.Title>
                    {getFormattedDate(
                      comment.date.split('T')[0],
                      CalendarFormat
                    )}
                  </CheckList.Title>
                </CheckList>
              );
            })}
          </Row>

          <Divider />
        </>
      )}
    </Container>
  );
};

export default Card;
