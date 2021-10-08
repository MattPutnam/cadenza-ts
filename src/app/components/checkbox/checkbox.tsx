import React from 'react';

import styled from 'styled-components';

import { useUUID } from '../../../hooks/use-uuid';
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
  const id = useUUID(label);

  return (
    <div>
      <StyledCheckbox id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {id && <Label htmlFor={id}>{label}</Label>}
    </div>
  );
};
