import styled from 'styled-components';
import { gray200 } from 'remember-ui';

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
