import React from 'react';

import { getFormattedDate, isSameOrAfterDate, getTodayDate } from 'utils/day';
import { CalendarFormatShort, CalendarFormat } from 'constants/calendar';

import { Container, Date, Due, Check, Comment } from './BoardCellBadge.styles';

const BoardCellBadge = ({ badges, isCardView }) => {
  const {
    checkItems,
    checkItemsChecked,
    dueComplete,
    due,
    start,
    comments,
  } = badges;
  return (
    <Container isCardView={isCardView}>
      {isCardView && start && (
        <Date>
          Start Date
          <Due>
            <Due.Icon />
            {getFormattedDate(
              start.split('T')[0],
              isCardView ? CalendarFormat : CalendarFormatShort
            )}
          </Due>
        </Date>
      )}
      {due && (
        <Date>
          {isCardView && 'Due Date'}
          <Due
            isComplete={dueComplete}
            isOverDue={isSameOrAfterDate(getTodayDate(), getFormattedDate(due))}
          >
            <Due.Icon />
            {getFormattedDate(
              due.split('T')[0],
              isCardView ? CalendarFormat : CalendarFormatShort
            )}
          </Due>
        </Date>
      )}
      {!isCardView && checkItems > 0 && (
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
