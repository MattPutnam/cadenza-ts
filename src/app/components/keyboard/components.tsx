import styled from 'styled-components';

import * as KeyboardUtils from '../../../utils/keyboard-utils';

interface KeyProps {
  first?: boolean;
  note: number;
  highlightColor?: string;
}

const Key = styled.div<KeyProps>`
  display: inline-block;
  border: 1px solid black;
  margin-left: ${({ first, note }) => (first ? 0 : -KeyboardUtils.leftMargin(note))}px;
`;

export const WhiteKey = styled(Key)`
  background-color: ${({ highlightColor }) => highlightColor || 'white'};
  width: ${KeyboardUtils.WHITE_WIDTH}px;
  height: ${KeyboardUtils.WHITE_HEIGHT}px;
  z-index: 0;
`;

export const BlackKey = styled(Key)`
  background-color: ${({ highlightColor }) => highlightColor || 'black'};
  width: ${KeyboardUtils.BLACK_WIDTH}px;
  height: ${KeyboardUtils.BLACK_HEIGHT}px;
  z-index: 1;
`;

export const KeyContainer = styled.div`
  display: inline-flex;
  align-items: flex-start;
  border: 1px solid black;
  background-color: white;
`;
