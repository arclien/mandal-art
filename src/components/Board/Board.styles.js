import styled from 'styled-components';
import { flexContainer } from 'remember-ui';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
  position: relative;
`;

export const GridItemWrapper = styled.div``;

export const GridOverlay = styled.div`
  ${flexContainer('center', 'center')};

  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.05);
  z-index: 9700;
`;
