import React from 'react';

import { Label } from '..';
import { useUUID } from '../../../hooks/use-uuid';

interface Props {
  value: number;
  setValue: (newValue: number) => void;
  min?: number;
  max?: number;
  label?: string;
  labelProps?: React.HTMLAttributes<HTMLLabelElement>;
}

export const NumberField: React.FC<Props & React.HTMLAttributes<HTMLInputElement>> = ({
  value,
  setValue,
  min = 0,
  max,
  label,
  labelProps,
  ...inputProps
}) => {
  const id = useUUID(label);

  return (
    <>
      {id && (
        <Label htmlFor={id} {...labelProps}>
          {label}
        </Label>
      )}
      <input
        id={id}
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
        {...inputProps}
      />
    </>
  );
};
