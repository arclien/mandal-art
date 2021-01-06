import React, { useState, createContext } from 'react';

import { replaceArrayOnArray } from 'utils/utils';

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

    // If source/destination is unknown, do nothing.
    if (sourceId === -1 || destinationId === -1) {
      return;
    }

    const offset = destinationIndex - sourceIndex;

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
