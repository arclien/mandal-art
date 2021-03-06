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
  ${font({ size: '26px', color: text })};
`;

export const Text = styled.div`
  ${font({ size: '22px', color: text })};
`;

export const BoardList = styled.div`
  ${flexContainer('flex-start', 'center', 'row')};

  flex-wrap: wrap;
  padding: 20px;
`;

export const BoardLink = styled(Link)`
  margin: 10px;
`;

BoardLink.Button = styled(NewBaseButton)`
  ${font({ size: '15px', color: white })};
`;

export const Filler = styled.div`
  display: flex;
  width: 100%;
  flex: 1 1 auto;
`;
