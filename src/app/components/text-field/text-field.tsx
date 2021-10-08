import React from 'react';

import styled from 'styled-components';

import { Label } from '..';
import { useUUID } from '../../../hooks/use-uuid';

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
    const id = useUUID(label);

    return (
      <>
        {id && <Label htmlFor={id}>{label}</Label>}
        <StyledInput type="text" onChange={(e) => setValue(e.target.value)} {...{ id, ref, value, size, style }} />
      </>
    );
  }
);

TextField.displayName = 'TextField';
