import _ from 'lodash';

import { ActionPedalConfig } from './action-pedal';
import { SetupKeyboards } from './keyboards';
import { SetupSynths } from './synths/setup-synths';

export const SetupTab = () => {
  return (
    <>
      <SetupKeyboards />
      <ActionPedalConfig />
      <SetupSynths />
    </>
  );
};
