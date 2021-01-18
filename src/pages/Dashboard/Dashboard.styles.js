import styled from 'styled-components';
import { flexColumnCenterX, flexContainer } from 'remember-ui';

import rightIcon from 'assets/images/ico-arrow-right.png';
import leftIcon from 'assets/images/ico-arrow-left.png';

export const Container = styled.div`
  ${flexColumnCenterX};

  padding: 20px;
  height: 100%;
`;

export const Layout = styled.div`
  ${flexContainer('space-evenly', 'center')};
  height: calc(100vh - 40px - 40px);
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
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 5px;
  border-radius: 0.5rem;
  padding: 20px;
  margin-left: 10px;
  width: ${({ isExpanded }) => (isExpanded ? '700px' : '300px')};
  height: 100%;
  -webkit-transition: width 1s ease-in-out;
  -moz-transition: width 1s ease-in-out;
  -o-transition: width 1s ease-in-out;
  transition: width 1s ease-in-out;
`;

export const ExpandIcon = styled.img.attrs(({ isExpanded }) => ({
  width: 40,
  height: 40,
  alt: 'arrow',
  src: isExpanded ? rightIcon : leftIcon,
}))`
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: -30px;
  padding: 5px;
`;
