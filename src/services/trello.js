import { getRandomInt } from 'utils/utils';
import {
  getTrello,
  getColletionTrello,
  deleteTrello,
  postTrello,
  putTrello,
} from 'services/trelloApi';
import { TRELLO_COLLECTION_TYPE, TRELLO_LABEL_COLOR } from 'constants/trello';

export const getMe = () => {
  return getTrello('members/me');
};

export const getMyBoards = () => {
  return getTrello('members/me/boards');
};

/** 
################ Get from board
* */

export const getBoard = (boardId) => {
  return getTrello(`boards/${boardId}`);
};

export const getListsOnBoard = (boardId, field = 'open') => {
  return getTrello(`boards/${boardId}/lists/${field}`);
};

export const getLabelsOnBoard = (boardId) => {
  const params = {
    limit: 100,
  };
  return getTrello(`boards/${boardId}/labels`, params);
};

export const getCardsOnBoard = (boardId, field = 'visible') => {
  return getTrello(`boards/${boardId}/cards/${field}`);
};

export const getCardOnBoardById = (boardId, cardId) => {
  return getTrello(`boards/${boardId}/cards/${cardId}`);
};

/** 
################ Get from List
* */

export const getCardsOnList = (listId) => {
  return getTrello(`lists/${listId}/cards/`);
};

/** 
################ Get collections by id
* */
export const getCardById = (cardId) => {
  return getColletionTrello(TRELLO_COLLECTION_TYPE.CARDS, cardId);
};

export const getListById = (listId) => {
  return getColletionTrello(TRELLO_COLLECTION_TYPE.LISTS, listId);
};

export const createLabel = async (tagName, idBoard) => {
  const index = getRandomInt(0, TRELLO_LABEL_COLOR.length);
  const newLabel = {
    name: tagName,
    color: TRELLO_LABEL_COLOR[index],
    idBoard,
  };
  const res = await postTrello('labels', newLabel);
  return res;
};

// eslint-disable-next-line no-unused-vars
export const createCard = async (name, idList, pos) => {
  const newCard = {
    idList,
    name,
    pos,
  };
  return postTrello('cards', newCard);
};

export const updateCard = async (cell) => {
  if (!cell) return;

  const { id, name, pos } = cell;
  const card = {
    name,
    pos,
  };
  return putTrello(`${TRELLO_COLLECTION_TYPE.CARDS}/${id}`, card);
};

export const createList = async (name, idBoard, pos) => {
  const newList = {
    idBoard,
    name,
    pos,
  };
  return postTrello('lists', newList);
};

export const updateList = async (list) => {
  if (!list) return;
  const { id } = list;

  return putTrello(`${TRELLO_COLLECTION_TYPE.LISTS}/${id}`, { ...list });
};

/** 
################ delete collections by id
* */
export const deleteCardById = (cardId) => {
  return deleteTrello(`${TRELLO_COLLECTION_TYPE.CARDS}/${cardId}`);
};

/** 리스트 상태에 따라(closed == archive) archive/unarchive 토글  */
export const archiveListById = (listId, isArchived) => {
  return putTrello(`${TRELLO_COLLECTION_TYPE.LISTS}/${listId}`, {
    closed: !isArchived,
  });
};

/** 리스트에 속한 모든 카드를 archive */
export const archiveAllCardsByListId = (listId) => {
  return postTrello(
    `${TRELLO_COLLECTION_TYPE.LISTS}/${listId}/archiveAllCards`
  );
};
