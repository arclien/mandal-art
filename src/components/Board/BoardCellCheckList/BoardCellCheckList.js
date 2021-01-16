import React, { useState, useEffect } from 'react';

import { getBatchApi } from 'services/trello';

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

  return (
    <>
      {checkList.map((check) => {
        return (
          <CheckList key={check.id}>
            <CheckList.Title>{check.name}</CheckList.Title>
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
