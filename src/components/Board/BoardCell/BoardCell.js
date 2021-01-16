import React from 'react';

import BoardCellHover from '../BoardCellHover/BoardCellHover';
import BoardCellLabel from '../BoardCellLabel/BoardCellLabel';
import BoardCellBadge from '../BoardCellBadge/BoardCellBadge';
import BoardCellTitle from '../BoardCellTitle/BoardCellTitle';
import { BOARD_CENTER_INDEX } from 'constants/board';

import { Container } from './BoardCell.styles';

const BoardCell = ({ cell, boardIndex, cellIndex }) => {
  const { badges, idChecklists, labels, isCenter } = cell;

  return (
    <Container
      isCenter={isCenter}
      isMainBoard={boardIndex === BOARD_CENTER_INDEX}
    >
      {labels && labels.length > 0 && (
        <BoardCellLabel labels={labels} showFull={false} />
      )}

      <BoardCellTitle
        cell={cell}
        boardIndex={boardIndex}
        cellIndex={cellIndex}
        disabled={isCenter}
      />

      {cell.name && badges && (
        <BoardCellBadge
          badges={badges}
          idChecklists={idChecklists}
          isCardView={false}
        />
      )}

      {cell.name && (
        <BoardCellHover
          boardIndex={boardIndex}
          cell={cell}
          cellIndex={cellIndex}
        />
      )}
    </Container>
  );
};

export default BoardCell;
