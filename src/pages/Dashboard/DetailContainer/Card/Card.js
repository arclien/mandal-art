import React, { useState, useEffect } from 'react';

import { getFormattedDate } from 'utils/day';
import { CalendarFormat } from 'constants/calendar';
import { renderHtmlWithNewLine, browserOpen } from 'utils/utils';
import { getActionsOnCard, getBatchApi } from 'services/trello';
import BoardCellLabel from 'components/Board/BoardCellLabel/BoardCellLabel';
import BoardCellBadge from 'components/Board/BoardCellBadge/BoardCellBadge';

import { Container, Info, Divider, Row, CheckList } from './Card.styles';

const Card = ({ card, list }) => {
  // console.log(card);
  const {
    id,
    name,
    badges,
    desc,
    idBoard,
    idList,
    idChecklists,
    labels,
    shortUrl,
  } = card;
  const { name: nameList } = list;
  const [checkList, setCheckList] = useState([]);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    (async () => {
      const _list = idChecklists.map((_id) => `/checklists/${_id}`).join(',');
      const checklist = await getBatchApi(_list);
      const comments = await getActionsOnCard(id);
      setCommentList(comments);
      setCheckList(checklist.map((res) => res['200']));
    })();
  }, [id, idChecklists, setCheckList]);

  // console.log(commentList);
  return (
    <Container>
      <Info>
        <Info.Title>
          {name}
          <Info.TrelloLink
            onClick={() => {
              browserOpen(shortUrl);
            }}
          />
        </Info.Title>
        <Info.Attr>
          <Info.Attr.Type>
            in list &nbsp;
            <Info.Attr.Link to={`/board/${idBoard}?listId=${idList}`}>
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
            <BoardCellBadge
              badges={badges}
              idChecklists={idChecklists}
              isCardView
            />
          </Row>
          <Divider />
        </>
      )}

      <Row>
        <Row.Title>Description</Row.Title>
        {renderHtmlWithNewLine(desc)}
      </Row>

      <Divider />

      {checkList.length > 0 && (
        <>
          <Row>
            <Row.Title>CheckLists</Row.Title>
            {checkList.map((check) => {
              return (
                <CheckList key={check.id}>
                  <CheckList.Title>{check.name}</CheckList.Title>
                  {check.checkItems.map((item) => {
                    return (
                      <CheckList.Items key={item.id}>
                        <CheckList.Item>
                          <CheckList.Item.Title>
                            {item.name}
                          </CheckList.Item.Title>
                          <CheckList.Item.Status>
                            {item.state}
                          </CheckList.Item.Status>
                        </CheckList.Item>
                      </CheckList.Items>
                    );
                  })}
                </CheckList>
              );
            })}
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
