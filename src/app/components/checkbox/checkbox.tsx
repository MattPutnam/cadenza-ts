import React from 'react';

import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { Label } from '../label';

interface Props {
  label?: string;
  checked: boolean;
  onChange: (newValue: boolean) => void;
}

const StyledCheckbox = styled.input`
  cursor: pointer;
`;

export const Checkbox: React.FC<Props> = ({ label, checked, onChange }) => {
  const id = label && uuid();

  return (
    <div>
      <StyledCheckbox id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {id && <Label htmlFor={id}>{label}</Label>}
    </div>
  );
};
