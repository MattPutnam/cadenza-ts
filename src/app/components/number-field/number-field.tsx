import React from 'react';

import { v4 as uuid } from 'uuid';

import { Label } from '..';

interface Props {
  value: number;
  setValue: (newValue: number) => void;
  min?: number;
  max?: number;
  label?: string;
  style?: React.CSSProperties;
}

export const NumberField: React.FC<Props> = ({ value, setValue, min = 0, max, label, style }) => {
  const id = label && uuid();

  return (
    <>
      {id && <Label htmlFor={id}>{label}</Label>}
      <input
        id={id}
        type="number"
        value={value}
        min={min}
        max={max}
        style={style}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
      />
    </>
  );
};
