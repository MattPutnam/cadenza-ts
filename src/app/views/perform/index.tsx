import React from 'react';

import { Button } from '../../components';

interface Props {
  close: () => void;
}

export const PerformView = ({ close }: Props) => (
  <div>
    Perform
    <Button onClick={close}>Close</Button>
  </div>
);
