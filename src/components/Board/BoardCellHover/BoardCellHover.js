import React, { useEffect, useState, useCallback, useContext } from 'react';

import { deleteCardById, archiveListById } from 'services/trello';
import { TRELLO_COLLECTION_TYPE } from 'constants/trello';
import { TrelloContext } from 'context/TrelloContext';
import { ConfirmModalContext } from 'context/ConfirmModalContext';
import { BOARD_CENTER_INDEX } from 'constants/board';
import { browserOpen } from 'utils/utils';
import { Hover, HoverContainer } from '../BoardCell/BoardCell.styles';

const BoardCellHover = ({ boardIndex, cell, cellIndex }) => {
  const {
    state: { boards },
    actions: { setBoards },
  } = useContext(TrelloContext);

  const {
    actions: { openDeleteConfirmModal },
  } = useContext(ConfirmModalContext);

  const deleteOkCallback = useCallback(() => {
    const { id, trelloType } = cell;

    const ids =
      trelloType === TRELLO_COLLECTION_TYPE.LISTS
        ? boards[boardIndex].filter((el) => el.name).map((el) => el.id)
        : [id];

    // trello 삭제 api call
    if (trelloType === TRELLO_COLLECTION_TYPE.LISTS) {
      archiveListById(id, false);
    } else if (trelloType === TRELLO_COLLECTION_TYPE.CARDS) {
      deleteCardById(id);
    }

    // board 데이터 업데이트
    setBoards((prevState) => {
      return prevState.map((els) =>
        els.map((el) =>
          ids.includes(el.id)
            ? {
                ...el,
                name: '',
              }
            : el
        )
      );
    });
  }, [boardIndex, boards, cell, setBoards]);

  const {
    id,
    name,
    idBoard,
    idList,
    url,
    desc,
    badges,
    idChecklists,
    labels,
    isCenter,
  } = cell;

  return (
    <>
      {isCenter && (
        <Hover>
          <HoverContainer>
            <HoverContainer.Plus />
          </HoverContainer>
        </Hover>
      )}

      {cellIndex !== BOARD_CENTER_INDEX && name && (
        <>
          <HoverContainer.Close
            onClick={() => {
              openDeleteConfirmModal(
                deleteOkCallback,
                `"${name}"을 삭제 하시겠습니까?`
              );
            }}
          />
          <HoverContainer.Link
            onClick={() => {
              browserOpen(url);
            }}
          />
        </>
      )}
    </>
  );
};

export default BoardCellHover;
