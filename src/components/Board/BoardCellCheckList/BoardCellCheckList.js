import React, { useState, useEffect, useCallback } from 'react';

import {
  getBatchApi,
  updateCheckListById,
  updateCheckItemById,
} from 'services/trello';
import { errorToast } from 'utils/toast';
import { TRELLO_COLLECTION_TYPE, CHECKITEMS } from 'constants/trello';

import { CheckList } from './BoardCellCheckList.styles';

const BoardCellCheckList = ({ idChecklists }) => {
  const [checkList, setCheckList] = useState([]);

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
        updateCheckListById(target.id, target.name);
      } else if (type === TRELLO_COLLECTION_TYPE.CHECKITEMS) {
        const { id, name, idChecklist, state } = target;
        const { idCard } = checkList.find((el) => el.id === idChecklist);
        updateCheckItemById(idCard, id, name, state);
      }
    },
    [checkList]
  );

  const onEnterPress = (e, target, type) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      onEnter(target, type);
    }
  };

  return (
    <>
      {checkList.map((check, index) => {
        return (
          <CheckList key={check.id}>
            <CheckList.Title
              name={check.id}
              value={checkList[index].name}
              onKeyDown={(e) =>
                onEnterPress(
                  e,
                  checkList[index],
                  TRELLO_COLLECTION_TYPE.CHECKLISTS
                )
              }
              onChange={(e) => {
                checkList[index].name = e.target.value;
                setCheckList([...checkList]);
              }}
            />
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
                      onChange={(e) => {
                        item.name = e.target.value;
                        check.checkItems = [...check.checkItems];
                        setCheckList([...checkList]);
                      }}
                      onKeyDown={(e) =>
                        onEnterPress(e, item, TRELLO_COLLECTION_TYPE.CHECKITEMS)
                      }
                    />
                  </CheckList.Item>
                </CheckList.Items>
              );
            })}
          </CheckList>
        );
      })}
    </>
  );
};

export default BoardCellCheckList;
