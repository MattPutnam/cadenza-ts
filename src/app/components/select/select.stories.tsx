import React from 'react';

import { disableArg, storyWrapper, textArg } from '../../../storybook-components';
import { Select } from './select';

export default {
  title: 'Components / Select',
  component: Select,
  decorators: storyWrapper,
  argTypes: {
    label: textArg('Select:'),
    useTransform: {
      control: { type: 'boolean' }
    },
    options: disableArg,
    selected: disableArg,
    setSelected: disableArg,
    render: disableArg,
    ref: disableArg
  }
};

export const String = ({ label, useTransform }) => {
  const options = ['Apples', 'Oranges', 'Bananas'];
  const [selected, setSelected] = React.useState(options[0]);

  return (
    <>
      <Select
        label={label}
        options={options}
        selected={selected}
        setSelected={setSelected}
        render={useTransform ? (option) => option.toUpperCase() : undefined}
      />
      <div>Selected item: {selected}</div>
    </>
  );
};

export const Number = ({ label }) => {
  const options = [1, 2, 3, 4];
  const [selected, setSelected] = React.useState(options[0]);

  return (
    <>
      <Select label={label} options={options} selected={selected} setSelected={setSelected} />
      <div>Selected item squared: {selected * selected}</div>
    </>
  );
};
