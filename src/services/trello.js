import { getRandomInt } from 'utils/utils';
import {
  getTrello,
  getColletionTrello,
  deleteTrello,
  postTrello,
  putTrello,
} from 'services/trelloApi';
import {
  TRELLO_COLLECTION_TYPE,
  TRELLO_LABEL_COLOR,
  // TRELLO_MANDAL_ART_ID,
} from 'constants/trello';

export const getMe = () => {
  return getTrello('members/me');
};

export const getMyBoards = () => {
  return getTrello('members/me/boards');
};

/** 
################ Get from board
* */
export const getListsOnBoard = (boardId, field = 'all') => {
  return getTrello(`boards/${boardId}/lists/${field}`);
};

export const getLabelsOnBoard = (boardId) => {
  const params = {
    limit: 100,
  };
  return getTrello(`boards/${boardId}/labels`, params);
};

export const getCardsOnBoard = (boardId, field = 'all') => {
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
export const createCard = async (idList, labels) => {
  const newCard = {
    idList,
    name: 'aa',
    desc: JSON.stringify({}),
    pos: 'top',
    idLabels: labels,
  };
  return postTrello('cards', newCard);
};

export const updateCard = async (cell) => {
  if (!cell) return;

  const { id, desc, idLabels } = cell;
  const card = {
    desc,
    idLabels,
  };
  return putTrello(`${TRELLO_COLLECTION_TYPE.CARDS}/${id}`, card);
};

/** 
################ delete collections by id
* */
export const deleteCardById = (cardId) => {
  return deleteTrello(`${TRELLO_COLLECTION_TYPE.CARDS}/${cardId}`);
};
