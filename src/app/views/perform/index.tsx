import { Button } from 'app/components/button';
import React from 'react';

interface Props {
  close: () => void;
}

export const PerformView = ({ close }: Props) => (
  <div>
    Perform
    <Button onClick={close}>Close</Button>
  </div>
);
