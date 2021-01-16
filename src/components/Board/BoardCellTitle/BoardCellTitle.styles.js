import styled, { css } from 'styled-components';
import { font, text } from 'remember-ui';

export const TextArea = styled.textarea.attrs({
  type: 'text',
  maxLength: 30,
})`
  ${font({ size: '14px', color: text })};

  background-color: transparent;
  width: 100%;
  height: 60%;
  border: 0px;
  padding: 5px 10px;
  text-align: center;
  outline: none;
  resize: none;
  -webkit-appearance: none;

  &:focus {
    border: 0px;
  }

  ${({ showFull }) =>
    showFull &&
    css`
      ${font({ size: '20px', weight: 'bold', color: text })};
      text-align: left;
      padding: 0px;
      height: auto;
    `}
`;
