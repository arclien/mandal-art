import styled from 'styled-components';
import { flexContainer, font, text } from 'remember-ui';

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
