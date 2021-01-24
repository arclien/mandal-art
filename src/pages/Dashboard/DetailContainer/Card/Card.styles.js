import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  flexContainer,
  font,
  text,
  gray100,
  gray150,
  gray200,
  gray450,
} from 'remember-ui';

import linkIcon from 'assets/images/ico-external-link.svg';

export const Container = styled.div`
  ${flexContainer('flex-start', 'flex-start', 'column')};

  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

export const Divider = styled.div`
  width: 100%;
  height: 5px;
  min-height: 5px;
  margin: 10px 0px;
  background-color: ${gray100};
`;

export const Title = styled.div`
  ${font({ size: '18px', weight: 'bold', color: gray450 })};
`;

export const Info = styled.div`
  ${flexContainer('flex-start', 'flex-start', 'column')};

  width: 100%;
`;

Info.Title = styled.div`
  ${flexContainer('flex-start', 'flex-start', 'row')};
  ${font({ size: '20px', weight: 'bold', color: text })};

  padding-bottom: 5px;
`;

Info.TrelloLink = styled.img.attrs({
  width: 20,
  height: 20,
  alt: 'link',
  src: linkIcon,
})`
  cursor: pointer;
  padding: 5px;
  margin-top: -6px;
  margin-left: 10px;
`;

Info.Attr = styled.div`
  ${flexContainer('space-between', 'center', 'row')};

  width: 100%;
  padding-left: 10px;
`;

Info.Attr.Type = styled.div`
  ${font({ size: '14px', color: gray150 })};
`;

Info.Attr.Link = styled(Link)`
  ${font({ size: '16px', color: gray200 })};
  text-decoration: underline;
`;

export const Row = styled.div`
  ${flexContainer('flex-start', 'flex-start', 'column')};

  width: 100%;
`;

Row.Title = styled(Title)``;

export const CheckList = styled.div`
  ${flexContainer('flex-start', 'flex-start', 'column')};

  width: 100%;
  padding: 10px 0px;
`;

CheckList.Title = styled.div`
  ${font({ size: '18px', color: text })};
`;

CheckList.Items = styled.div`
  ${flexContainer('flex-start', 'flex-start', 'column')};

  width: 100%;
`;

CheckList.Item = styled.div`
  ${flexContainer('space-between', 'center', 'row')};
  ${font({ size: '16px', color: text })};

  width: 100%;
  padding-left: 10px;
`;

CheckList.Item.Title = styled.div`
  ${font({ size: '16px', color: text })};
`;

CheckList.Item.Status = styled.div`
  ${font({ size: '16px', color: text })};
`;
