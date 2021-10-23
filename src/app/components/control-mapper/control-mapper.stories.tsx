import React from 'react';

import { disableArg } from '../../../storybook-components';
import { MappingType } from '../../../types';
import { ControlMapper } from './control-mapper';

export default {
  title: 'Components / Control Mapper',
  component: ControlMapper,
  argTypes: {
    alternate: 'boolean',
    mapping: disableArg,
    setMapping: disableArg
  }
};

export const ControlMapperStory = ({ alternate }) => {
  const [mapping, setMapping] = React.useState<MappingType>({});

  return <ControlMapper mapping={mapping} setMapping={setMapping} alternate={alternate} />;
};
ControlMapperStory.storyName = 'Control Mapper';
