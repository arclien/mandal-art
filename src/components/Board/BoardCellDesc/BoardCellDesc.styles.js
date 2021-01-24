import styled from 'styled-components';
import { font, text, gray100 } from 'remember-ui';

export const TextArea = styled.textarea.attrs({
  type: 'text',
})`
  ${font({ size: '16px', color: text })};

  background-color: transparent;
  width: 100%;
  height: 150px;
  padding: 5px;
  border: 1px solid ${gray100};
  border-radius: 5px;
  text-align: left;
  resize: none;
`;
