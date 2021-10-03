import { useState } from 'react';

import { StoryWrapper } from '../../../storybook-components';
import { Select } from './select';

export default {
  title: 'Components / Select'
};

export const Basic = () => {
  const options = ['Apples', 'Oranges', 'Bananas'];
  const [selected, setSelected] = useState(options[0]);

  return <Select options={options} selected={selected} setSelected={setSelected} />;
};

export const WithAllParams = () => {
  const options = ['Apples', 'Oranges', 'Bananas'];
  const [selected, setSelected] = useState(options[0]);

  return (
    <StoryWrapper>
      <Select
        label="Select:"
        options={options}
        selected={selected}
        setSelected={setSelected}
        render={(option) => option.toUpperCase()}
      />
      <div>Selected item: {selected}</div>
    </StoryWrapper>
  );
};

export const Number = () => {
  const options = [1, 2, 3, 4];
  const [selected, setSelected] = useState(options[0]);

  return (
    <StoryWrapper>
      <Select options={options} selected={selected} setSelected={setSelected} />
      <div>Selected item squared: {selected * selected}</div>
    </StoryWrapper>
  );
};
