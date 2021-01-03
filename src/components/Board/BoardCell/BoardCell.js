import React, { useState, useCallback } from 'react';

import {
  updateList,
  createList,
  updateCard,
  createCard,
} from 'services/trello';

import { Container, Input } from './BoardCell.styles';

const BoardCell = ({ cell, isMainBoard, setBoards }) => {
  const [text, setText] = useState(cell.name);

  const onChange = useCallback(async () => {
    const { id, trelloType, name, idList, idBoard } = cell;

    let responseOfNewCell;
    if (trelloType === 'list') {
      if (name) {
        updateList({ ...cell, name: text });
      } else {
        responseOfNewCell = await createList(text, idBoard);
      }
    } else if (trelloType === 'card') {
      if (name) {
        updateCard({ ...cell, name: text });
      } else {
        responseOfNewCell = await createCard(text, idList);
      }
    }

    setBoards((prevState) => {
      return prevState.map((els) =>
        els.map((el) =>
          el.id === id
            ? {
                ...el,
                ...(responseOfNewCell && { id: responseOfNewCell?.id }),
                name: text,
              }
            : el
        )
      );
    });
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
