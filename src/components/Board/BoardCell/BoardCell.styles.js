import styled from 'styled-components';
import {
  flexContainer,
  gray80,
  yellow100,
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

  position: relative;
  width: 32%;
  min-width: 32%;
  height: 32%;
  padding: 10px;

  border: solid 1px ${gray80};
  margin-bottom: 1%;

  &:nth-child(3n + 2) {
    margin-left: 1%;
    margin-right: 1%;
  }

  &:nth-last-child(-n + 3) {
    margin-bottom: 0px;
  }

  &:hover {
    cursor: pointer;
    border: solid 1px ${yellow100};
  }
`;

export const Input = styled(BaseInput)`
  ${font({ size: '11px', color: text })};

  width: ${({ width }) => width};
  margin-right: 3px;
  > input {
    text-align: center;
    padding: 5px;
    height: 40px;
    border: 0px;
  }
`;
