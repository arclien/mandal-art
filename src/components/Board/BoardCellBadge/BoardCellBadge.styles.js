import styled, { css } from 'styled-components';
import { flexContainer, white, green70, red100, font, text } from 'remember-ui';

import commentIcon from 'assets/images/ico-comment.svg';
import clockIcon from 'assets/images/ico-clock.svg';
import checkIcon from 'assets/images/ico-checklist.svg';

export const Container = styled.div`
  ${flexContainer('space-between', 'center', 'row')};
  padding: 0px 5px 5px;
  width: 100%;

  ${({ isCardView }) =>
    isCardView &&
    css`
      ${flexContainer('flex-start', 'flex-start', 'column')};

      padding: 0px 5px 0px;
    `};
`;

const Badge = styled.div`
  ${font({ size: '12px', color: text })};
  ${flexContainer('flex-start', 'center', 'row')};

  background-color: ${({ isComplete, isOverDue }) =>
    (isComplete && green70) || (!isComplete && isOverDue && red100)};
  color: ${({ isComplete, isOverDue }) => (isComplete || isOverDue) && white};

  padding: 2px 4px;
  border-radius: 5px;
`;

export const Date = styled.div`
  ${flexContainer('space-between', 'center', 'row')};
  ${({ isCardView }) =>
    isCardView &&
    css`
      ${flexContainer('flex-start', 'flex-start', 'column')};
    `}

  width:100%;
`;

export const Due = styled(Badge)``;
Due.Icon = styled.img.attrs({
  width: 12,
  height: 12,
  alt: 'due',
  src: clockIcon,
})`
  margin-top: -1px;
  margin-right: 1px;
`;

export const Check = styled(Badge)``;
Check.Icon = styled.img.attrs({
  width: 12,
  height: 12,
  alt: 'CheckList',
  src: checkIcon,
})`
  margin-top: -1px;
  margin-right: 1px;
`;

export const Comment = styled(Badge)``;
Comment.Icon = styled.img.attrs({
  width: 12,
  height: 12,
  alt: 'Comment',
  src: commentIcon,
})`
  margin-top: -1px;
  margin-right: 1px;
`;
