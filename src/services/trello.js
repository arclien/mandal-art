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
export const createCard = async (name, idList) => {
  const newCard = {
    idList,
    name,
    pos: 'bottom',
  };
  return postTrello('cards', newCard);
};

export const updateCard = async (cell) => {
  if (!cell) return;

  const { id, name } = cell;
  const card = {
    name,
  };
  return putTrello(`${TRELLO_COLLECTION_TYPE.CARDS}/${id}`, card);
};

export const createList = async (name, idBoard) => {
  const newList = {
    idBoard,
    name,
    pos: 'bottom',
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
