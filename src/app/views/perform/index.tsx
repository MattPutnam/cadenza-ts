import React from 'react';

import { Button } from '../../components/button';

interface Props {
  close: () => void;
}

export const PerformView = ({ close }: Props) => (
  <div>
    Perform
    <Button onClick={close}>Close</Button>
  </div>
);
