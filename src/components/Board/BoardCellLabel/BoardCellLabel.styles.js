import styled, { css } from 'styled-components';
import { flexContainer, white, font, BaseInput } from 'remember-ui';

import plusIcon from 'assets/images/ico-plus.png';
import closeIcon from 'assets/images/ico-close.png';

export const Container = styled.div`
  ${flexContainer('flex-start', 'flex-start', 'row')};

  width: 100%;
  padding: 5px;
`;

export const Label = styled.div`
  ${font({ size: '12px', color: white, weight: 'bold' })};
  height: ${({ showFull }) => (showFull ? '25px' : '8px')};
  line-height: ${({ showFull }) => (showFull ? '27px' : '8px')};

  background-color: ${({ color }) =>
    (color === 'green' && '#61bd4f') ||
    (color === 'yellow' && '#f2d600') ||
    (color === 'orange' && '#ff9f1a') ||
    (color === 'red' && '#eb5a46') ||
    (color === 'purple' && '#c377e0') ||
    (color === 'blue' && '#0079bf') ||
    (color === 'sky' && '#00c2e0') ||
    (color === 'lime' && '#51e898') ||
    (color === 'pink' && '#ff78cb') ||
    (color === 'black' && '#344563')};

  ${({ showFull }) =>
    !showFull &&
    css`
      max-width: 30px;
      min-width: 30px;
      padding: 0;
    `};

  position: relative;
  margin: 0px 4px 0px 0;
  padding: 0px 15px;
  border-radius: 10px;
  cursor: pointer;
`;

export const LabelInput = styled(BaseInput)`
  height: 100%;
  cursor: pointer;

  > input {
    ${font({ size: '12px', color: white })};

    background-color: transparent;
    border: 0px;
    width: auto;
    padding: 0px;
    height: 100%;

    &:focus {
      border: 0px;
    }
  }
`;

export const LabelDelete = styled.img.attrs({
  width: 10,
  height: 10,
  alt: 'close',
  src: closeIcon,
})`
  cursor: pointer;
  padding: 5px;
  position: absolute;
  right: 0px;
  top: 3px;
`;

export const LabelAdd = styled.div``;

LabelAdd.Plus = styled.img.attrs({
  width: 20,
  height: 20,
  alt: 'plus',
  src: plusIcon,
})`
  cursor: pointer;
`;
