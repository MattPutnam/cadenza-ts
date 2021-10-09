import React from 'react';

import _ from 'lodash';

import { Label } from '..';
import { useUUID } from '../../../hooks/use-uuid';

type Selectable = string | number | readonly string[] | undefined;

interface Props<T extends Selectable> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: T[];
  selected?: T;
  setSelected: (newValue: T) => void;
  render?: (rawValue: T) => string;
  label?: string;
}

export const Select = <T extends Selectable>({
  options,
  selected,
  setSelected,
  render = _.identity,
  label,
  ref,
  ...props
}: Props<T> & { ref?: React.RefObject<HTMLSelectElement> }): JSX.Element => {
  const id = useUUID(label);

  return (
    <>
      {label && <Label htmlFor={id!}>{label}</Label>}
      <select
        id={id}
        ref={ref}
        value={selected}
        onChange={(e) => setSelected(options[e.target.selectedIndex])}
        {...props}
      >
        {options.map((option, index) => {
          return (
            <option value={option} key={index}>
              {render(option)}
            </option>
          );
        })}
      </select>
    </>
  );
};

Select.displayName = 'Select';
