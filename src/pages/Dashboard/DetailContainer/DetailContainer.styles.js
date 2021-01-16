import styled from 'styled-components';
import { flexContainer } from 'remember-ui';

export const Container = styled.div`
  ${flexContainer('flex-start', 'center', 'column')};

  width: 100%;
  height: 100%;
`;

export const Filler = styled.div`
  display: flex;
  width: 100%;
  flex: 1 1 auto;
`;
