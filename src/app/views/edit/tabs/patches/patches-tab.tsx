import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { usePatches, useSynthesizers } from '../../../../../state';
import { Flex, Placeholder } from '../../../../components';
import { PatchEditor } from './patch-editor';
import { PatchList } from './patch-list';

const PatchesTabContainer = styled(Flex)`
  flex: 1 1 auto;
  overflow: hidden;
`;

export const PatchesTab = () => {
  const { patches } = usePatches();
  const { synthesizers } = useSynthesizers();

  const [selectedPatchId, setSelectedPatchId] = React.useState<number | undefined>(undefined);

  const patchSelected = _.some(patches, { id: selectedPatchId });
  const getPlaceholder = () => {
    if (_.isEmpty(synthesizers)) {
      return <Placeholder>No synthesizers defined. Go to the Setup tab and define a synthesizer.</Placeholder>;
    } else if (_.isEmpty(patches)) {
      return <Placeholder>No patches defined. Click the '+' button to add one.</Placeholder>;
    } else {
      return <Placeholder>Select a patch to edit it</Placeholder>;
    }
  };

  return (
    <PatchesTabContainer align="stretch">
      <PatchList selectedPatchId={selectedPatchId} setSelectedPatchId={setSelectedPatchId} />
      {patchSelected && (
        <PatchEditor
          key={selectedPatchId!}
          selectedPatchId={selectedPatchId!}
          setSelectedPatchId={setSelectedPatchId}
        />
      )}
      {!patchSelected && getPlaceholder()}
    </PatchesTabContainer>
  );
};
