import styled from 'styled-components';
import { flexColumnCenterX } from 'remember-ui';

export const Container = styled.div`
  ${flexColumnCenterX};

  padding: 20px;
`;

export const BoardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;
