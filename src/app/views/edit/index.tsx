import { Button } from 'app/components/button';
import React from 'react';

interface Props {
  perform: () => void;
}

export const EditView = ({ perform }: Props) => (
  <div>
    Editing
    <Button onClick={perform}>Perform</Button>
  </div>
);
