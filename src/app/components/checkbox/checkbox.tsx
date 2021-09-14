import React from 'react';

import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { Label } from '../label';

interface Props {
  label?: string;
  checked: boolean;
  onChange: (newValue: boolean) => void;
}

const CheckboxWrapper = styled.input`
  cursor: pointer;
`;

const LabelWrapper = styled(Label)`
  cursor: pointer;
`;

export const Checkbox: React.FC<Props> = ({ label, checked, onChange }) => {
  const id = label && uuid();

  return (
    <div>
      <CheckboxWrapper id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {id && <LabelWrapper htmlFor={id}>{label}</LabelWrapper>}
    </div>
  );
};
