import React, { useState, useCallback } from 'react';

import { updateList, createList } from 'services/trello';

import { Container, Input } from './BoardCell.styles';

const BoardCell = ({ cell, isMainBoard, setBoards, boardIndex, cellIndex }) => {
  const [text, setText] = useState(cell.name);

  const onChange = useCallback(async () => {
    const { id, trelloType, name, isList, idBoard } = cell;
    setBoards((prevState) => {
      return prevState.map((els) =>
        els.map((el) => (el.id === id ? { ...el, name: text } : el))
      );
    });
    if (trelloType === 'list') {
      if (name) {
        updateList({ ...cell, name: text });
      } else {
        createList(text, idBoard);
      }
    }
  }, [setBoards, cell, text]);

  return (
    <Container isCenter={cell.isCenter} isMainBoard={isMainBoard}>
      <Input
        width="100%"
        type="text"
        name={cell.id}
        maxLength={20}
        value={text}
        onEnter={onChange}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </Container>
  );
};

export default BoardCell;
