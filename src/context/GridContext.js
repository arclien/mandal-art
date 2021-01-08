import React, { useState, createContext } from 'react';

import { updateCard } from 'services/trello';
import { replaceArrayOnArray } from 'utils/utils';
import { BOARD_CENTER_INDEX } from 'constants/board';

const move = (array, oldIndex, newIndex) => {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
};

const moveElement = (array, index, offset) => {
  const newIndex = index + offset;
  return move(array, index, newIndex);
};

const Context = createContext();

const { Provider, Consumer: GridConsumer } = Context;

const GridProvider = ({ children }) => {
  const [dragItems, setDragItems] = useState([[]]);
  // console.log(dragItems);
  const moveItem = (boardIndex, sourceId, destinationId) => {
    const sourceIndex = dragItems[boardIndex].findIndex(
      (item) => item.id === sourceId
    );
    const destinationIndex = dragItems[boardIndex].findIndex(
      (item) => item.id === destinationId
    );

    // center cell은 drag / drop 불가
    // if (
    //   sourceIndex === BOARD_CENTER_INDEX ||
    //   destinationIndex === BOARD_CENTER_INDEX
    // ) {
    //   return;
    // }

    // console.log(sourceIndex, destinationIndex);
    // If source/destination is unknown, do nothing.
    if (sourceId === -1 || destinationId === -1) {
      return;
    }

    const offset = destinationIndex - sourceIndex;
    // console.log(sourceIndex, destinationIndex);
    // console.log(dragItems[boardIndex][sourceIndex]);
    // console.log(dragItems[boardIndex][destinationIndex]);
    // TODO 한칸씩은 잘 이동되는데, 한번에 여러 칸 이동이 안됨
    // updateCard({
    //   ...dragItems[boardIndex][sourceIndex],
    //   pos: destinationIndex,
    // });
    // updateCard({
    //   ...dragItems[boardIndex][destinationIndex],
    //   pos: sourceIndex,
    // });

    setDragItems((prevState) =>
      replaceArrayOnArray(
        prevState,
        boardIndex,
        moveElement(prevState[boardIndex], sourceIndex, offset)
      )
    );
  };

  return (
    <Provider
      value={{
        state: { dragItems },
        actions: { moveItem, setDragItems },
      }}
    >
      {children}
    </Provider>
  );
};

const GridContext = Context;

export { GridProvider, GridConsumer, GridContext };
