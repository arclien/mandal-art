import styled from 'styled-components';
import { flexColumnCenterX } from 'remember-ui';

export const Container = styled.div`
  ${flexColumnCenterX};

  padding: 20px;
`;

export const BoardWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 5px;
  border-radius: 0.5rem;
`;
