import React from 'react';

import { AppContext } from '../../state';

export const useActionPedal = () => {
  const { actionPedal, setActionPedal } = React.useContext(AppContext);

  return { actionPedal, setActionPedal };
};
