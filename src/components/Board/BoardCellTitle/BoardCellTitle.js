import React, { useEffect, useState, useCallback, useContext } from 'react';

import { TrelloContext } from 'context/TrelloContext';
import { BOARD_CENTER_INDEX } from 'constants/board';
import { errorToast } from 'utils/toast';
import {
  updateList,
  createList,
  updateCard,
  createCard,
} from 'services/trello';
import { TRELLO_COLLECTION_TYPE } from 'constants/trello';

import { TextArea } from './BoardCellTitle.styles';

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
  return true;
};

const BoardCellTitle = ({
  cell,
  boardIndex,
  disabled = false,
  showFull = false,
}) => {
  const {
    state: { boards },
    actions: { setBoards },
  } = useContext(TrelloContext);

  const [text, setText] = useState(cell?.name);

  useEffect(() => {
    setText(cell?.name);
  }, [cell]);

  const onEnter = useCallback(async () => {
    const { id, trelloType, name, idList, idBoard, pos } = cell;
    // console.log(cell);
    if (!validateBeforeSave(cell, boards[boardIndex], text)) {
      setText(name);
      return;
    }

    // TODO 리스트 삭제 => 속한 카드 모두 삭제 후, 그 상태에서 새롭게 같은  포지션에 리스트 만들고(여기까진 됨), 해당 리스트 속한 카드 추가하면 idList가 달라서 안됨.
    // const ids =
    //   trelloType === TRELLO_COLLECTION_TYPE.LISTS
    //     ? boards[cellIndex].map((el) => el.id)
    //     : [id];
    // console.log(ids);
    let responseOfNewCell;
    if (trelloType === TRELLO_COLLECTION_TYPE.LISTS) {
      if (name) {
        updateList({ ...cell, name: text });
      } else {
        responseOfNewCell = await createList(text, idBoard, pos);
      }
    } else if (trelloType === TRELLO_COLLECTION_TYPE.CARDS) {
      if (name) {
        updateCard({ ...cell, name: text });
      } else {
        responseOfNewCell = await createCard(text, idList, pos);
      }
    }
    // console.log(text);
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
  }, [cell, boards, boardIndex, text, setBoards]);

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <TextArea
      showFull={showFull}
      value={text}
      onKeyDown={onEnterPress}
      disabled={disabled}
      onChange={(e) => {
        setText(e.target.value);
      }}
    />
  );
};

export default BoardCellTitle;
