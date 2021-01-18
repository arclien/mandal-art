import styled from 'styled-components';
import { flexContainer, font, text, gray100 } from 'remember-ui';

export const CheckList = styled.div`
  ${flexContainer('flex-start', 'flex-start', 'column')};

  width: 100%;
  padding: 10px 0px;
`;

CheckList.Title = styled.textarea.attrs({
  type: 'text',
})`
  ${font({ size: '16px', color: text })};

  background-color: transparent;
  width: 100%;
  height: auto;
  padding: 5px;
  border: 1px solid ${gray100};
  border-radius: 5px;
  text-align: left;
  resize: none;
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
