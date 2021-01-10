import styled from 'styled-components';
import { flexContainer, blue30, green50, red50, font, text } from 'remember-ui';

import plusIcon from 'assets/images/ico-plus.png';
import closeIcon from 'assets/images/ico-close.png';
import linkIcon from 'assets/images/ico-external-link.svg';

export const Container = styled.div`
  ${flexContainer('center', 'center', 'column')};

  background-color: ${({ isMainBoard, isCenter }) =>
    (isMainBoard && isCenter && red50) ||
    (isMainBoard && !isCenter && green50) ||
    (!isMainBoard && isCenter && green50) ||
    (!isMainBoard && !isCenter && blue30)};

  width: 100%;
  height: calc((100vh - 168px) / 9);
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 7px;
  word-break: keep-all;
  text-align: center;

  cursor: ${({ isMainBoard }) => (isMainBoard ? 'pointer' : 'move')};
`;

export const TextArea = styled.textarea.attrs({
  type: 'text',
  maxLength: 30,
})`
  ${font({ size: '14px', color: text })};

  background-color: transparent;
  width: 100%;
  height: 60%;
  border: 0px;
  padding: 5px 10px;
  text-align: center;
  outline: none;
  resize: none;
  -webkit-appearance: none;

  &:focus {
    border: 0px;
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
})`
  cursor: pointer;
`;

HoverContainer.Close = styled.img.attrs({
  width: 20,
  height: 20,
  alt: 'close',
  src: closeIcon,
})`
  ${Container}:hover & {
    display: block;
  }
  display: none;

  cursor: pointer;
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px;
`;

HoverContainer.Link = styled.img.attrs({
  width: 20,
  height: 20,
  alt: 'link',
  src: linkIcon,
})`
  ${Container}:hover & {
    display: block;
  }
  display: none;

  cursor: pointer;
  position: absolute;
  top: -10px;
  left: -10px;
  padding: 5px;
`;
