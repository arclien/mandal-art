import React, { useState, useEffect, useCallback } from 'react';

import {
  getBatchApi,
  createCheckListById,
  updateCheckListById,
  deleteCheckListById,
  createCheckItemById,
  updateCheckItemById,
  deleteCheckItemById,
} from 'services/trello';
import { errorToast } from 'utils/toast';
import { getUUID } from 'utils/utils';
import { TRELLO_COLLECTION_TYPE, CHECKITEMS } from 'constants/trello';

import { CheckList, AddButton } from './BoardCellCheckList.styles';

const BoardCellCheckList = ({
  idCard,
  idChecklists,
  setIdCheckListsOnCard,
}) => {
  const [checkList, setCheckList] = useState([]);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    (async () => {
      setCheckList([]);
      const _list = idChecklists.map((_id) => `/checklists/${_id}`).join(',');
      if (_list) {
        const checklist = await getBatchApi(_list);
        setCheckList(checklist.map((res) => res['200']));
      }
    })();
  }, [idChecklists, setCheckList]);

  const onEnter = useCallback(
    async (target, type) => {
      if (!target.name.trim()) {
        errorToast(`목표 내용은 빈 값이 될 수 없습니다.`);
        return;
      }
      if (type === TRELLO_COLLECTION_TYPE.CHECKLISTS) {
        // eslint-disable-next-line no-shadow
        const { name, idCard, isNewList } = target;
        if (isNewList) {
          const newList = await createCheckListById(idCard, name);
          const newCheckList = checkList.map((list) =>
            list.isNewList ? newList : list
          );
          setCheckList(newCheckList);
          setIdCheckListsOnCard((prevState) => [...prevState, newList.id]);
        } else {
          updateCheckListById(target.id, target.name);
        }
      } else if (type === TRELLO_COLLECTION_TYPE.CHECKITEMS) {
        const { id, name, idChecklist, state, isNewItem } = target;
        if (isNewItem) {
          const newItem = await createCheckItemById(idChecklist, name);
          const newCheckList = checkList.map((list) =>
            list.id !== newItem.idChecklist
              ? list
              : {
                  ...list,
                  checkItems: list.checkItems.map((item) =>
                    item.isNewItem ? newItem : item
                  ),
                }
          );
          setCheckList(newCheckList);
        } else {
          // eslint-disable-next-line no-shadow
          const { idCard } = checkList.find((el) => el.id === idChecklist);
          updateCheckItemById(idCard, id, name, state);
        }
      }
    },
    [checkList, setIdCheckListsOnCard]
  );

  const onEnterPress = (e, target, type) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      onEnter(target, type);
      setDisabled(false);
    }
  };

  return (
    <>
      <AddButton
        block
        theme="blue"
        size="large"
        disabled={isDisabled}
        onClick={() => {
          setCheckList([
            ...checkList,
            {
              name: '',
              id: getUUID(),
              idCard,
              checkItems: [],
              isNewList: true,
            },
          ]);
          setDisabled(true);
        }}
      >
        Add CheckList
      </AddButton>
      {checkList.map((check) => {
        return (
          <CheckList key={check.id}>
            <CheckList.Top>
              <CheckList.Title
                name={check.id}
                value={check.name}
                autoFocus={check.isNewList}
                onBlur={() => {
                  setCheckList(checkList.filter((el) => !el.isNewList));
                  setDisabled(false);
                }}
                disabled={isDisabled && !check.isNewList}
                onKeyDown={(e) =>
                  onEnterPress(e, check, TRELLO_COLLECTION_TYPE.CHECKLISTS)
                }
                onChange={(e) => {
                  check.name = e.target.value;
                  setCheckList([...checkList]);
                }}
              />
              <CheckList.Delete
                disabled={isDisabled}
                onClick={() => {
                  if (isDisabled) return;
                  deleteCheckListById(check.id);
                  const newCheckList = checkList.filter(
                    (list) => list.id !== check.id
                  );
                  setIdCheckListsOnCard(
                    idChecklists.filter((list) => list !== check.id)
                  );
                  setCheckList(newCheckList);
                }}
              />
            </CheckList.Top>
            {check.checkItems.map((item) => {
              return (
                <CheckList.Items key={item.id}>
                  <CheckList.Item>
                    <CheckList.Item.Status
                      state={item.state === CHECKITEMS.COMPLETE ? 'on' : 'off'}
                      onClick={() => {
                        item.state =
                          item.state === CHECKITEMS.COMPLETE
                            ? CHECKITEMS.INCOMPLETE
                            : CHECKITEMS.COMPLETE;
                        check.checkItems = [...check.checkItems];
                        setCheckList([...checkList]);
                        onEnter(item, TRELLO_COLLECTION_TYPE.CHECKITEMS);
                      }}
                    />
                    <CheckList.Item.Title
                      type="text"
                      name={item.id}
                      maxLength={40}
                      value={item.name}
                      autoFocus={item.isNewItem}
                      disabled={isDisabled && !item.isNewItem}
                      onBlur={() => {
                        check.checkItems = check.checkItems.filter(
                          (el) => !el.isNewItem
                        );
                        setCheckList([...checkList]);
                        setDisabled(false);
                      }}
                      onChange={(e) => {
                        item.name = e.target.value;
                        check.checkItems = [...check.checkItems];
                        setCheckList([...checkList]);
                      }}
                      onKeyDown={(e) =>
                        onEnterPress(e, item, TRELLO_COLLECTION_TYPE.CHECKITEMS)
                      }
                    />
                    <CheckList.Item.Delete
                      disabled={isDisabled}
                      onClick={() => {
                        if (isDisabled) return;
                        deleteCheckItemById(check.idCard, item.id);
                        const newCheckList = checkList.map((list) =>
                          list.id !== item.idChecklist
                            ? list
                            : {
                                ...list,
                                checkItems: list.checkItems.filter(
                                  (_item) => _item.id !== item.id
                                ),
                              }
                        );
                        setCheckList(newCheckList);
                      }}
                    />
                  </CheckList.Item>
                </CheckList.Items>
              );
            })}
            <AddButton
              block
              outline
              disabled={isDisabled}
              theme="blue"
              size="small"
              onClick={() => {
                check.checkItems = [
                  ...check.checkItems,
                  {
                    name: '',
                    idChecklist: check.id,
                    id: getUUID(),
                    isNewItem: true,
                  },
                ];
                setCheckList([...checkList]);
                setDisabled(true);
              }}
            >
              Add CheckItem
            </AddButton>
          </CheckList>
        );
      })}
    </>
  );
};

export default BoardCellCheckList;
