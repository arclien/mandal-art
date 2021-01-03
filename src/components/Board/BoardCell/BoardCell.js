import React, { useEffect, useCallback, useState, useContext } from 'react';

import useDebounce from 'hooks/useDebounce';
import { replaceObejctOnArray } from 'utils/utils';
import { TrelloContext } from 'context/TrelloContext';
import { updateList } from 'services/trello';

import { Container, Input } from './BoardCell.styles';

const BoardCell = ({ cell, isMainBoard }) => {
  const {
    actions: { setTrelloObjects },
  } = useContext(TrelloContext);

  const [cellName, setCellName] = useState(cell.name);
  const updateListTitle = useCallback(() => {
    updateList({ ...cell, name: cellName });
    setTrelloObjects((prevState) => {
      return {
        ...prevState,
        lists: [
          ...replaceObejctOnArray([...prevState.lists], {
            ...cell,
            name: cellName,
          }),
        ],
      };
    });
  }, [cell, cellName, setTrelloObjects]);

  const handleChange = ({ target: { value } }) => {
    setCellName(value.trim());
  };

  return (
    <Container isCenter={cell.isCenter} isMainBoard={isMainBoard}>
      <Input
        width="100px"
        type="text"
        name={cell.id}
        maxLength={20}
        value={cellName}
        onEnter={() => {
          updateListTitle();
        }}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </Container>
  );
};

export default BoardCell;
