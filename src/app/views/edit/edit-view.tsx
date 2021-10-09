import React from 'react';

import styled from 'styled-components';

import { Button, colors, Flex, Spacer, Toggle, ToggleButton } from '../../components';
import { PatchesTab } from './tabs/patches';
import { SetupTab } from './tabs/setup';
import { ShowTab } from './tabs/show';

const Page = styled(Flex)`
  background-color: ${colors.gray[1]};
  height: 100vh;
`;

interface Props {
  perform: () => void;
}

export const EditView: React.FC<Props> = ({ perform }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <Page column align="stretch">
      <Flex pad>
        <Toggle selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}>
          <ToggleButton>Setup</ToggleButton>
          <ToggleButton>Patches</ToggleButton>
          <ToggleButton>Show</ToggleButton>
        </Toggle>
        <Spacer />
        <Button large onClick={perform}>
          Perform
        </Button>
      </Flex>
      {selectedIndex === 0 && <SetupTab />}
      {selectedIndex === 1 && <PatchesTab />}
      {selectedIndex === 2 && <ShowTab />}
    </Page>
  );
};
