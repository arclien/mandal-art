import React, { useContext } from 'react';

import { TrelloContext } from 'context/TrelloContext';
import BoardCellLabel from 'components/Board/BoardCellLabel/BoardCellLabel';

const LabelContainer = () => {
  const {
    state: {
      trelloObjects: { labels, board },
    },
  } = useContext(TrelloContext);

  return (
    <>
      {labels && labels.length > 0 && (
        <BoardCellLabel idBoard={board.id} labels={labels} showFull />
      )}
    </>
  );
};

export default LabelContainer;
