import React from 'react';

import _ from 'lodash';
import { v4 as uuid } from 'uuid';

export const useUUID = (...dependencies: any[]) => {
  return React.useMemo(() => (_.every(dependencies) ? uuid() : undefined), [dependencies]);
};
