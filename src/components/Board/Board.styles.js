import styled from 'styled-components';
import {
  flexContainer,
  gray80,
  gray200,
  yellow100,
  blue30,
  green50,
  red50,
} from 'remember-ui';

export const GridContainer = styled.div`
  border: 1px solid ${gray200};

  width: 32vw;
  height: 300px;
  padding: 10px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

export const GridItem = styled.div`
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
