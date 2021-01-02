import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { flexContainer, NewBaseButton, font, white, text } from 'remember-ui';

export const Container = styled.div`
  ${flexContainer('center', 'center', 'column')};

  width: 100%;
  padding: 20px;
  min-height: 100vh;
`;

export const Title = styled.div`
  ${font({ size: '22px', color: text })};
`;

export const BoardLink = styled(Link)`
  margin: 20px;
`;

BoardLink.Button = styled(NewBaseButton)`
  ${font({ size: '15px', color: white })};
`;

export const Filler = styled.div`
  display: flex;
  width: 100%;
  flex: 1 1 auto;
`;
