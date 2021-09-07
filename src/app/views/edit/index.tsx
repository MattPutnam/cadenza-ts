import React from 'react';

import { Button } from '../../components/button';

interface Props {
  perform: () => void;
}

export const EditView = ({ perform }: Props) => (
  <div>
    Editing
    <Button onClick={perform}>Perform</Button>
  </div>
);
