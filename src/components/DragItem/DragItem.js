import React, { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DragItem = memo(({ id, onMoveItem, boardIndex, children }) => {
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
});

export default DragItem;
