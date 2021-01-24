import styled, { css } from 'styled-components';
import {
  flexContainer,
  font,
  text,
  white,
  red100,
  blue100,
  gray100,
  BaseInput,
  Checkbox,
  NewBaseButton,
} from 'remember-ui';

import closeIcon from 'assets/images/ico-close.png';
import trashIconWhite from 'assets/images/ico-trash-white.png';

export const CheckList = styled.div`
  ${flexContainer('flex-start', 'flex-start', 'column')};

  width: 100%;
  padding: 10px 0px;
`;

CheckList.Top = styled.div`
  ${flexContainer('space-between', 'start', 'row')};

  width: 100%;
`;

CheckList.Delete = styled.img.attrs({
  width: 20,
  alt: 'trash',
  src: trashIconWhite,
})`
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  margin-left: 10px;
  background-color: ${red100};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
    `}
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

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
    `}
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

CheckList.Item.Title = styled(BaseInput)`
  width: calc(100% - 100px);

  > input {
    ${font({ size: '16px', color: text })};

    width: 100%;
    background-color: transparent;
    border: 0px;
    padding: 5px;
    height: 100%;

    &:focus {
      border: 1px solid ${gray100};
      border-radius: 5px;
    }

    ${({ disabled }) =>
      disabled &&
      css`
        opacity: 0.3;
        cursor: not-allowed;
      `}
  }
`;

CheckList.Item.Status = styled(Checkbox)``;

export const AddButton = styled(NewBaseButton)`
  ${font({ size: '16px', color: white })};
  ${({ outline }) =>
    outline &&
    css`
      ${font({ size: '16px', color: blue100 })};
    `};
  margin-top: 5px;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
    `}
`;

CheckList.Item.Delete = styled.img.attrs({
  width: 10,
  height: 10,
  alt: 'close',
  src: closeIcon,
})`
  cursor: pointer;
  padding: 5px;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
    `}
`;
