import React from 'react';

import { Container, Input } from './BoardCell.styles';

const BoardCell = ({ cell, isMainBoard }) => {
  return (
    <Container isCenter={cell.isCenter} isMainBoard={isMainBoard}>
      <Input
        width="100%"
        type="text"
        name={cell.id}
        maxLength={20}
        value={cell.name}
        onChange={(e) => {}}
      />
    </Container>
  );
};

export default BoardCell;
