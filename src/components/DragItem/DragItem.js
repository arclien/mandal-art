import React, { useContext, memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { TrelloContext } from 'context/TrelloContext';

const DragItem = memo(
  ({ id, onMoveItem, onDropItem, boardIndex, children }) => {
    const {
      actions: { fetchCardsOnList },
    } = useContext(TrelloContext);

    const ref = useRef(null);

    const [{ isDragging }, connectDrag] = useDrag({
      item: { id, type: id === 4 ? 'CENTER' : `CELL${boardIndex}` },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        };
      },
    });

    const [, connectDrop] = useDrop({
      accept: `CELL${boardIndex}`,
      hover(hoveredOverItem) {
        if (hoveredOverItem.id !== id) {
          onMoveItem(boardIndex, hoveredOverItem.id, id);
        }
      },
      drop() {
        onDropItem(boardIndex, id, fetchCardsOnList);
      },
    });

    connectDrag(ref);
    connectDrop(ref);

    const opacity = isDragging ? 0.5 : 1;
    const containerStyle = { opacity };

    return React.Children.map(children, (child) =>
      React.cloneElement(child, {
        forwardedRef: ref,
        style: containerStyle,
      })
    );
  }
);

export default DragItem;
