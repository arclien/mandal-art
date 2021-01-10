import React from 'react';

import { getFormattedDate, isSameOrAfterDate, getTodayDate } from 'utils/day';
import { CalendarFormatShort } from 'constants/calendar';

import { Container, Due, Check, Comment } from './BoardCellBadge.styles';

const BoardCellBadge = ({ badges, labels, idChecklists }) => {
  const {
    checkItems,
    checkItemsChecked,
    dueComplete,
    due,
    start,
    comments,
  } = badges;
  return (
    <Container>
      {due && (
        <Due
          isComplete={dueComplete}
          isOverDue={isSameOrAfterDate(getTodayDate(), getFormattedDate(due))}
        >
          <Due.Icon />
          {getFormattedDate(due.split('T')[0], CalendarFormatShort)}
        </Due>
      )}
      {checkItems > 0 && (
        <Check isComplete={checkItemsChecked === checkItems}>
          <Check.Icon />
          {`${checkItemsChecked}/${checkItems}`}
        </Check>
      )}
      {/* 
      {comments > 0 && (
        <Comment>
          <Comment.Icon />
          {comments}
        </Comment>
      )} */}
    </Container>
  );
};

export default BoardCellBadge;
