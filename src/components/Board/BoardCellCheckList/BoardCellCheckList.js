import React, { useState, useEffect, useCallback } from 'react';

import { getBatchApi, updateCheckListById } from 'services/trello';
import { errorToast } from 'utils/toast';

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

  const onEnter = useCallback(async (target) => {
    if (!target.name.trim()) {
      errorToast(`목표 내용은 빈 값이 될 수 없습니다.`);
      return;
    }
    updateCheckListById(target.id, target.name);
  }, []);

  const onEnterPress = (e, target) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      onEnter(target);
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
              onKeyDown={(e) => onEnterPress(e, checkList[index])}
              onChange={(e) => {
                checkList[index].name = e.target.value;
                setCheckList([...checkList]);
              }}
            />
            {check.checkItems.map((item) => {
              return (
                <CheckList.Items key={item.id}>
                  <CheckList.Item>
                    <CheckList.Item.Title>{item.name}</CheckList.Item.Title>
                    <CheckList.Item.Status>{item.state}</CheckList.Item.Status>
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
