import React, { useCallback, useContext } from 'react';

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

  const { id, name, idBoard, url, isCenter, trelloType } = cell;

  return (
    <>
      {isCenter && boardIndex !== BOARD_CENTER_INDEX && (
        <Hover>
          <HoverContainer>
            <HoverContainer.DetailLink
              to={`/board/${idBoard}?listId=${id}&boardIndex=${boardIndex}&cellIndex=${cellIndex}`}
            >
              <HoverContainer.Detail />
            </HoverContainer.DetailLink>
          </HoverContainer>
        </Hover>
      )}

      {cellIndex !== BOARD_CENTER_INDEX && name && (
        <>
          {trelloType === TRELLO_COLLECTION_TYPE.CARDS && (
            <>
              <HoverContainer.DetailLink
                to={`/board/${idBoard}?cardId=${id}&boardIndex=${boardIndex}&cellIndex=${cellIndex}`}
              >
                <HoverContainer.Detail.Top />
              </HoverContainer.DetailLink>
              <HoverContainer.Close
                onClick={() => {
                  openDeleteConfirmModal(
                    deleteOkCallback,
                    `"${name}"을 삭제 하시겠습니까?`
                  );
                }}
              />
            </>
          )}
          {trelloType === TRELLO_COLLECTION_TYPE.LISTS && (
            <HoverContainer.DetailLink
              to={`/board/${idBoard}?listId=${id}&boardIndex=${boardIndex}&cellIndex=${cellIndex}`}
            >
              <HoverContainer.Detail.TopRight />
            </HoverContainer.DetailLink>
          )}

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
