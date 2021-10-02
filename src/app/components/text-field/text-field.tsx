import React from 'react';

import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { Label } from '..';

interface Props {
  value: string;
  setValue: (newValue: string) => void;
  size?: number;
  label?: string;
  style?: React.CSSProperties;
}

const StyledInput = styled.input``;

export const TextField = React.forwardRef<HTMLInputElement, React.PropsWithChildren<Props>>(
  ({ value, setValue, size, label, style }, ref) => {
    const id = label && uuid();

    return (
      <>
        {id && <Label htmlFor={id}>{label}</Label>}
        <StyledInput type="text" onChange={(e) => setValue(e.target.value)} {...{ id, ref, value, size, style }} />
      </>
    );
  }
);

TextField.displayName = 'TextField';
