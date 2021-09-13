import styled from 'styled-components';

export const Spacer = styled.div<{ width?: number }>`
  flex: ${({ width }) => (width ? `0 0 ${width}px` : '1 1 auto')};
`;
