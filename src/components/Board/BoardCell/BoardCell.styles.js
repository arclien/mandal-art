import styled from 'styled-components';
import { flexContainer, blue30, green50, red50 } from 'remember-ui';
import { Link } from 'react-router-dom';

import detailIcon from 'assets/images/ico-detail.svg';
import closeIcon from 'assets/images/ico-close.png';
import linkIcon from 'assets/images/ico-external-link.svg';

export const Container = styled.div`
  ${flexContainer('center', 'center', 'column')};

  background-color: ${({ isMainBoard, isCenter }) =>
    (isMainBoard && isCenter && red50) ||
    (isMainBoard && !isCenter && green50) ||
    (!isMainBoard && isCenter && green50) ||
    (!isMainBoard && !isCenter && blue30)};

  width: 100%;
  height: calc((100vh - 190px) / 9);
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 7px;
  word-break: keep-all;
  text-align: center;

  cursor: ${({ isMainBoard }) => (isMainBoard ? 'pointer' : 'move')};
`;

export const Hover = styled.div`
  ${Container}:hover & {
    display: block;
  }

  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(243, 241, 239, 0.8);
`;

export const HoverContainer = styled.div`
  ${flexContainer('center', 'center')};

  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
`;

HoverContainer.Detail = styled.img.attrs({
  width: 30,
  height: 30,
  alt: 'detail',
  src: detailIcon,
})`
  cursor: pointer;
`;

HoverContainer.DetailLink = styled(Link)``;

HoverContainer.Detail.Top = styled(HoverContainer.Detail)`
  ${Container}:hover & {
    display: block;
  }
  display: none;

  width: 20px;
  height: 20px;
  position: absolute;
  top: -10px;
  right: 15px;
  padding: 5px;
`;

HoverContainer.Detail.TopRight = styled(HoverContainer.Detail.Top)`
  right: -10px;
`;

HoverContainer.Close = styled.img.attrs({
  width: 20,
  height: 20,
  alt: 'close',
  src: closeIcon,
})`
  ${Container}:hover & {
    display: block;
  }
  display: none;

  cursor: pointer;
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px;
`;

HoverContainer.Link = styled.img.attrs({
  width: 20,
  height: 20,
  alt: 'link',
  src: linkIcon,
})`
  ${Container}:hover & {
    display: block;
  }
  display: none;

  cursor: pointer;
  position: absolute;
  top: -10px;
  left: -10px;
  padding: 5px;
`;
