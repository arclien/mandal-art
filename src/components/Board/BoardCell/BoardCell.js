import React, { useState, useCallback, useContext } from 'react';

import { ConfirmModalContext } from 'context/ConfirmModalContext';
import { TrelloContext } from 'context/TrelloContext';
import { BOARD_CENTER_INDEX } from 'constants/board';
import { errorToast } from 'utils/toast';
import {
  updateList,
  createList,
  updateCard,
  createCard,
  deleteCardById,
  archiveListById,
} from 'services/trello';
import { TRELLO_COLLECTION_TYPE } from 'constants/trello';
import { getUUID } from 'utils/utils';

import { Container, Input, Hover, HoverContainer } from './BoardCell.styles';

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

const BoardCell = ({ cell, setBoards, board, boardIndex, cellIndex }) => {
  const {
    actions: { openDeleteConfirmModal },
  } = useContext(ConfirmModalContext);

  const {
    state: { boards },
  } = useContext(TrelloContext);

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

  const deleteOkCallback = useCallback(() => {
    const { id, trelloType } = cell;

    const ids =
      trelloType === TRELLO_COLLECTION_TYPE.LISTS
        ? boards[cellIndex].filter((el) => el.name).map((el) => el.id)
        : [id];

    // trello 삭제 api call
    if (trelloType === TRELLO_COLLECTION_TYPE.LISTS) {
      archiveListById(id, false);
    } else if (trelloType === TRELLO_COLLECTION_TYPE.CARDS) {
      deleteCardById(id);
    }

    // TODO list 지울 경우, uuid, idList가 달라져서 바로 재생성 안됨
    // board 데이터 업데이트
    setBoards((prevState) => {
      return prevState.map((els) =>
        els.map((el) =>
          ids.includes(el.id)
            ? {
                ...el,
                id: `${getUUID()}`,
                name: '',
              }
            : el
        )
      );
    });
  }, [cell, boards, cellIndex, setBoards]);

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
        disabled={cellIndex === BOARD_CENTER_INDEX}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      {cellIndex === BOARD_CENTER_INDEX && (
        <Hover>
          <HoverContainer>
            <HoverContainer.Plus />
          </HoverContainer>
        </Hover>
      )}
      {cellIndex !== BOARD_CENTER_INDEX && cell.name && (
        <HoverContainer.Close
          onClick={() => {
            openDeleteConfirmModal(
              deleteOkCallback,
              `"${cell.name}"을 삭제 하시겠습니까?`
            );
          }}
        />
      )}
    </Container>
  );
};

export default BoardCell;
