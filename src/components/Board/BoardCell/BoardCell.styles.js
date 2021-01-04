import styled from 'styled-components';
import {
  flexContainer,
  blue30,
  green50,
  red50,
  BaseInput,
  font,
  text,
} from 'remember-ui';

import plusIcon from 'assets/images/ico-plus.png';
import closeIcon from 'assets/images/ico-close.png';

export const Container = styled.div`
  ${flexContainer('center', 'center', 'column')};

  background-color: ${({ isMainBoard, isCenter }) =>
    (isMainBoard && isCenter && red50) ||
    (isMainBoard && !isCenter && green50) ||
    (!isMainBoard && isCenter && green50) ||
    (!isMainBoard && !isCenter && blue30)};

  width: 100%;
  height: 100px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 7px;
  word-break: keep-all;
  text-align: center;
`;

export const Input = styled(BaseInput)`
  ${font({ size: '11px', color: text })};

  background-color: transparent;
  width: ${({ width }) => width};

  > input {
    background-color: transparent;
    text-align: center;
    padding: 5px;
    height: 40px;
    border: 0px;
    &:focus {
      border: 0px;
    }
  }
`;

export const Hover = styled.div`
  ${Container}:hover & {
    display: block;
  }

  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(243, 241, 239, 0.8);
`;

export const HoverContainer = styled.div`
  ${flexContainer('center', 'center')};

  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
`;

HoverContainer.Plus = styled.img.attrs({
  width: 20,
  height: 20,
  alt: 'zoom',
  src: plusIcon,
})``;

HoverContainer.Close = styled.img.attrs({
  width: 20,
  height: 20,
  alt: 'zoom',
  src: closeIcon,
})`
  ${Container}:hover & {
    display: block;
  }
  display: none;

  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px;
`;
