import React, { useState, useCallback } from 'react';

import { getRandomInt } from 'utils/utils';
import { createLabel, updateLabel, deleteLabel } from 'services/trello';
import { TRELLO_LABEL_COLOR } from 'constants/trello';

import {
  Container,
  Label,
  LabelInput,
  LabelAdd,
  LabelDelete,
} from './BoardCellLabel.styles';

const BoardCellLabel = ({ idBoard, labels, showFull }) => {
  const [labelList, setLabelList] = useState(labels);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setLabelList((prevState) => [
      ...prevState.map((el) => (el.id === name ? { ...el, name: value } : el)),
    ]);
  }, []);

  const onEnter = useCallback(
    async (id) => {
      const label = labelList.find((_label) => _label.id === id);
      if (id.startsWith('new')) {
        const newLabel = await createLabel(label);
        setLabelList((prevState) => [
          ...prevState.filter((el) => el.id !== id),
          newLabel,
        ]);
      } else {
        updateLabel(id, label);
      }
    },
    [labelList]
  );

  const onEnterPress = useCallback(
    (e, id) => {
      if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        onEnter(id);
      }
    },
    [onEnter]
  );

  return (
    <Container>
      {labelList.map(({ color, id, name }) => (
        <Label key={id} id={id} color={color} showFull={showFull}>
          {showFull && (
            <>
              <LabelInput
                type="text"
                name={id}
                maxLength={20}
                value={name}
                onChange={handleChange}
                onKeyDown={(e) => {
                  onEnterPress(e, id);
                }}
              />
              <LabelDelete
                onClick={() => {
                  setLabelList((prevState) => [
                    ...prevState.filter((el) => el.id !== id),
                  ]);

                  deleteLabel(id);
                }}
              />
            </>
          )}
        </Label>
      ))}
      {showFull && (
        <LabelAdd
          onClick={() => {
            const index = getRandomInt(0, TRELLO_LABEL_COLOR.length);
            setLabelList((prevState) => [
              ...prevState,
              {
                color: TRELLO_LABEL_COLOR[index],
                id: `new${index}`,
                name: '',
                idBoard,
              },
            ]);
          }}
        >
          <LabelAdd.Plus />
        </LabelAdd>
      )}
    </Container>
  );
};

export default BoardCellLabel;
