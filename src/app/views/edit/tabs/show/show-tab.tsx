import React from 'react';

import styled from 'styled-components';

import { Flex } from '../../../../components';
import { CueList } from './cue-list';
import { Selection } from './selection';

const StyledFlex = styled(Flex)`
  flex: 1 1 auto;
  overflow: hidden;
`;

export const ShowTab = () => {
  const [selection, setSelection] = React.useState<Selection>(undefined);

  return (
    <StyledFlex align="stretch">
      <CueList selection={selection} setSelection={setSelection} />
      {/* {this.editPane()} */}
    </StyledFlex>
  );
};
