import React from 'react';

import { storyWrapper } from '../../../storybook-components';
import { Transpose } from './transpose';

export default {
  title: 'Components / Transpose',
  component: Transpose,
  decorators: storyWrapper,
  argTypes: {
    alternate: 'boolean',
    transposition: { table: { disable: true } },
    setTransposition: { table: { disable: true } }
  }
};

export const TransposeStory = ({ alternate }) => {
  const [transposition, setTransposition] = React.useState(0);

  return (
    <>
      <Transpose transposition={transposition} setTransposition={setTransposition} alternate={alternate} />
      <div>Transposition value: {transposition}</div>
    </>
  );
};
TransposeStory.storyName = 'Transpose';
