import React from 'react';

import { Select } from './select';

interface Props<T> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: T[];
  render: (option: T) => string;
  selected: T;
  setSelected: (option: T) => void;
  label?: string;
}

export const ObjectSelect = <T extends any>({
  options,
  render,
  selected,
  setSelected,
  label,
  ref,
  ...props
}: Props<T> & { ref?: React.RefObject<HTMLSelectElement> }) => {
  const mappedOptions = options.map(render);

  const wrappedSetSelected = React.useCallback(
    (newValue: string) => {
      const index = mappedOptions.indexOf(newValue);
      setSelected(options[index]);
    },
    [mappedOptions, options, setSelected]
  );

  return (
    <Select
      ref={ref}
      label={label}
      options={mappedOptions}
      selected={selected && render(selected)}
      setSelected={wrappedSetSelected}
      {...props}
    />
  );
};
