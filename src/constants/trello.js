export const {
  REACT_APP_TRELLO_MANDAL_ART_ID: TRELLO_MANDAL_ART_ID,
  REACT_APP_TRELLO_LIST_ID: TRELLO_LIST_ID,
  REACT_APP_TRELLO_CARD_ID: TRELLO_CARD_ID,
  REACT_APP_TRELLO_API_KEY: TRELLO_API_KEY,
} = process.env;

export const TRELLO_COLLECTION_TYPE = {
  CARDS: 'cards',
  CHECKLISTS: 'checklists',
  CHECKITEMS: 'checkitems',
  BOARDS: 'boards',
  LISTS: 'lists',
  MEMBERS: 'members',
  ORGANIZATIONS: 'organizations',
  ACTIONS: 'actions',
};

export const TRELLO_LABEL_COLOR = [
  'yellow',
  'purple',
  'blue',
  'red',
  'green',
  'orange',
  'black',
  'sky',
  'pink',
  'lime',
];

export const CHECKITEMS = {
  COMPLETE: 'complete',
  INCOMPLETE: 'incomplete',
};
