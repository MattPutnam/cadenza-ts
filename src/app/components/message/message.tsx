import styled from 'styled-components';

import { colors } from '..';

interface Props {
  error?: boolean;
}

export const Message = styled.div<Props>`
  margin: 0 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: ${({ error }) => (error ? colors.red[2] : colors.gray[4])};
  border: 1px solid black;
  border-radius: 3px;
`;
