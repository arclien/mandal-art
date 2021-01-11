import styled from 'styled-components';
import { flexColumnCenterX, flexContainer } from 'remember-ui';

export const Container = styled.div`
  ${flexColumnCenterX};

  padding: 20px;
  height: 100%;
`;

export const Layout = styled.div`
  ${flexContainer('space-evenly', 'center')};
  height: 100%;
`;
export const BoardWrapper = styled.div`
  width: ${({ hasRightSideBar }) =>
    hasRightSideBar ? `calc(100% - 300px)` : `100%`};

  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 5px;
  border-radius: 0.5rem;
`;

export const RightSideBar = styled.div`
  ${flexContainer('flex-start', 'center', 'column')};

  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 5px;
  border-radius: 0.5rem;
  padding: 20px;
  margin-left: 10px;
  width: 300px;
  height: 100%;
`;
