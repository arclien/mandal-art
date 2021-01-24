import React, { useEffect, useState, useCallback, useContext } from 'react';

import { TrelloContext } from 'context/TrelloContext';
import { errorToast } from 'utils/toast';
import { updateCard } from 'services/trello';
import { TRELLO_COLLECTION_TYPE } from 'constants/trello';

import { TextArea } from './BoardCellDesc.styles';

const validateBeforeSave = (cell, board, text) => {
  const { trelloType } = cell;
  if (!text.trim()) {
    errorToast(`${trelloType}는 빈 값이 될 수 없습니다.`);
    return false;
  }

  return true;
};

const BoardCellDesc = ({ cell, boardIndex }) => {
  const {
    state: { boards },
    actions: { setBoards },
  } = useContext(TrelloContext);

  const [text, setText] = useState(cell?.desc);

  useEffect(() => {
    setText(cell?.desc);
  }, [cell]);

  const onEnter = useCallback(async () => {
    const { id, trelloType, desc } = cell;
    if (!validateBeforeSave(cell, boards[boardIndex], text)) {
      setText(desc);
      return;
    }

    if (trelloType === TRELLO_COLLECTION_TYPE.CARDS) {
      if (desc) {
        updateCard({ ...cell, desc: text });
      }
    }

    setBoards((prevState) => {
      return prevState.map((els) =>
        els.map((el) =>
          el.id === id
            ? {
                ...el,
                desc: text,
              }
            : el
        )
      );
    });
  }, [cell, boards, boardIndex, text, setBoards]);

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <TextArea
      value={text}
      onKeyDown={onEnterPress}
      onChange={(e) => {
        setText(e.target.value);
      }}
    />
  );
};

export default BoardCellDesc;
