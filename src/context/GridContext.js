import React, { useState, createContext } from 'react';

import { updateCard } from 'services/trello';
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

    // console.log(sourceIndex, destinationIndex);
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

  const dropItem = async (boardIndex, destinationId, fetchCardsOnList) => {
    const destinationIndex = dragItems[boardIndex].findIndex(
      (item) => item.id === destinationId
    );
    const items = dragItems[boardIndex]
      .splice(destinationIndex)
      .filter((el) => el.name);

    const promises = items.map((item, index) =>
      updateCard({
        ...item,
        pos: index + destinationIndex,
      })
    );
    await Promise.all(promises);
    await fetchCardsOnList(items[0].idList, boardIndex);
  };

  return (
    <Provider
      value={{
        state: { dragItems },
        actions: { moveItem, dropItem, setDragItems },
      }}
    >
      {children}
    </Provider>
  );
};

const GridContext = Context;

export { GridProvider, GridConsumer, GridContext };
