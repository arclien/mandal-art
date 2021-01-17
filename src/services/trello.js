import {
  getTrello,
  getColletionTrello,
  deleteTrello,
  postTrello,
  putTrello,
} from 'services/trelloApi';
import { TRELLO_COLLECTION_TYPE } from 'constants/trello';

export const getMe = () => {
  return getTrello('members/me');
};

export const getMyBoards = () => {
  return getTrello('members/me/boards');
};

export const getOrganizaionById = (orgId) => {
  return getTrello(`organizations/${orgId}`);
};

export const getBoardsOnOrganization = (orgId) => {
  return getTrello(`organizations/${orgId}/boards`);
};

export const getBatchApi = (apiList) => getTrello(`/batch`, { urls: apiList });

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
################ Get from Card
default response commentCard
* */
export const getActionsOnCard = (cardId) => {
  return getTrello(`cards/${cardId}/actions`);
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

// checklist 만들기 on card
export const createCheckListById = (cardId, name) => {
  const newCheckList = {
    name,
    pos: 'bottom',
  };
  return postTrello(`cards/${cardId}/checklists`, newCheckList);
};

// checklist 가져오기
export const getCheckListById = (checkListId) => {
  return getColletionTrello(TRELLO_COLLECTION_TYPE.CHECKLISTS, checkListId);
};

// checklist 이름 변경
export const updateCheckListById = async (checkListId, name) => {
  const newCheckList = { name };
  const res = await putTrello(`checklists/${checkListId}`, newCheckList);
  return res;
};

// checklist 삭제
export const deleteCheckListById = async (checkListId) => {
  return deleteTrello(`checklists/${checkListId}`);
};

// checklist 만들기 on checklist
export const createCheckItemById = (checkListId, name) => {
  const newCheckItem = {
    name,
    pos: 'bottom',
    checked: false,
  };
  return postTrello(`checklists/${checkListId}/checkItems`, newCheckItem);
};

// checkitem 이름 변경 on card
export const updateCheckItemById = async (cardId, checkItemId, name, state) => {
  const newCheckList = { name, state };
  const res = await putTrello(
    `cards/${cardId}/checkItem/${checkItemId}`,
    newCheckList
  );
  return res;
};

// checkitem 삭제 on card
export const deleteCheckItemById = async (cardId, checkItemId) => {
  return deleteTrello(`cards/${cardId}/checkItem/${checkItemId}`);
};

export const createLabel = async (label) => {
  const res = await postTrello('labels', label);
  return res;
};

export const updateLabel = async (idLabel, label) => {
  const newLabel = { ...label };
  const res = await putTrello(`labels/${idLabel}`, newLabel);
  return res;
};

export const deleteLabel = async (idLabel) => {
  return deleteTrello(`labels/${idLabel}`);
};

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

  const { id, name, pos, desc } = cell;
  const card = {
    name,
    desc,
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
