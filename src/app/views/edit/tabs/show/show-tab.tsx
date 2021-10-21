import React from 'react';

import styled from 'styled-components';

import { useSynthesizers } from '../../../../../state';
import { Flex, Placeholder } from '../../../../components';
import { CueList } from './cue-list';
import { GlobalsEditor } from './globals-editor';
import { Selection } from './selection';

const StyledFlex = styled(Flex)`
  flex: 1 1 auto;
  overflow: hidden;
`;

export const ShowTab = () => {
  const [selection, setSelection] = React.useState<Selection>(undefined);
  const { synthesizers } = useSynthesizers();

  let mainDisplay: React.ReactNode;
  if (selection && selection.type === 'globals') {
    mainDisplay = <GlobalsEditor />;
  } else if (synthesizers.length === 0) {
    mainDisplay = <Placeholder>Add a synthesizer in the Setup tab</Placeholder>;
  } else if (!selection) {
    mainDisplay = <Placeholder>Select a song or cue to edit it</Placeholder>;
  }

  return (
    <StyledFlex align="stretch">
      <CueList selection={selection} setSelection={setSelection} />
      {mainDisplay}
    </StyledFlex>
  );
};
