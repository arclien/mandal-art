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

export const Container = styled.div`
  ${flexContainer('center', 'center', 'column')};

  background-color: ${({ isMainBoard, isCenter }) =>
    (isMainBoard && isCenter && red50) ||
    (isMainBoard && !isCenter && green50) ||
    (!isMainBoard && isCenter && green50) ||
    (!isMainBoard && !isCenter && blue30)};

  width: 100%;
  height: 100px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 7px;
  word-break: keep-all;
  text-align: center;
`;

export const Input = styled(BaseInput)`
  ${font({ size: '11px', color: text })};

  background-color: transparent;
  width: ${({ width }) => width};
  margin-right: 3px;
  > input {
    background-color: transparent;
    text-align: center;
    padding: 5px;
    height: 40px;
    border: 0px;
  }
`;
