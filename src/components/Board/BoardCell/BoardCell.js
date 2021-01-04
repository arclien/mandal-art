import React, { useState, useCallback } from 'react';

import { BOARD_CENTER_INDEX } from 'constants/board';
import { errorToast } from 'utils/toast';
import {
  updateList,
  createList,
  updateCard,
  createCard,
} from 'services/trello';
import { TRELLO_COLLECTION_TYPE } from 'constants/trello';

import { Container, Input } from './BoardCell.styles';

const validateBeforeSave = (cell, board, text) => {
  const { trelloType } = cell;
  if (!text.trim()) {
    errorToast(`${trelloType}는 빈 값이 될 수 없습니다.`);
    return false;
  }

  if (
    !board[BOARD_CENTER_INDEX].name.trim() &&
    trelloType === TRELLO_COLLECTION_TYPE.CARDS
  ) {
    errorToast(`세부 목표를 먼저 생성 후 액션아이템을 생성하세요.`);
    return false;
  }
};

const BoardCell = ({ cell, setBoards, board, boardIndex, cellIndex }) => {
  const [text, setText] = useState(cell.name);

  const onEnter = useCallback(async () => {
    const { id, trelloType, name, idList, idBoard } = cell;

    if (!validateBeforeSave(cell, board, text)) {
      setText(name);
      return;
    }

    let responseOfNewCell;
    if (trelloType === TRELLO_COLLECTION_TYPE.LISTS) {
      if (name) {
        updateList({ ...cell, name: text });
      } else {
        responseOfNewCell = await createList(text, idBoard);
      }
    } else if (trelloType === TRELLO_COLLECTION_TYPE.CARDS) {
      if (name) {
        updateCard({ ...cell, name: text });
      } else {
        responseOfNewCell = await createCard(text, idList);
      }
    }

    setBoards((prevState) => {
      return prevState.map((els) =>
        els.map((el) =>
          el.id === id
            ? {
                ...el,
                ...(responseOfNewCell && { id: responseOfNewCell?.id }),
                name: text,
              }
            : el
        )
      );
    });
  }, [setBoards, board, cell, text]);

  return (
    <Container
      isCenter={cell.isCenter}
      isMainBoard={boardIndex === BOARD_CENTER_INDEX}
    >
      <Input
        width="100%"
        type="text"
        name={cell.id}
        maxLength={20}
        value={text}
        onEnter={onEnter}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </Container>
  );
};

export default BoardCell;
