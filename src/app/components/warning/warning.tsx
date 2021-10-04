import styled from 'styled-components';

import { colors } from '..';

export const Warning = styled.span`
  color: ${colors.yellow[0]};
  background-color: ${colors.yellow[4]};
  border: 1px solid ${colors.yellow[0]};
  border-radius: 3px;
  padding: 2px 0.5rem;
  margin: -0.5rem 0.5rem;
`;
