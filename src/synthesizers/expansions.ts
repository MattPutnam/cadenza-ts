import _ from 'lodash';

import { ExpansionCard, ExpansionCardType } from '../types/expansion';
import { srJV80_02 } from './expansions/SR-JV80/SR-JV80-02';
import { srJV80_04 } from './expansions/SR-JV80/SR-JV80-04';
import { srJV80_05 } from './expansions/SR-JV80/SR-JV80-05';
import { srJV80_06 } from './expansions/SR-JV80/SR-JV80-06';
import { srJV80_07 } from './expansions/SR-JV80/SR-JV80-07';
import { srJV80_08 } from './expansions/SR-JV80/SR-JV80-08';
import { srJV80_09 } from './expansions/SR-JV80/SR-JV80-09';
import { srJV80_10 } from './expansions/SR-JV80/SR-JV80-10';
import { srJV80_16 } from './expansions/SR-JV80/SR-JV80-16';
import { srx01 } from './expansions/SRX/SRX-01';
import { srx02 } from './expansions/SRX/SRX-02';
import { srx03 } from './expansions/SRX/SRX-03';
import { srx04 } from './expansions/SRX/SRX-04';
import { srx05 } from './expansions/SRX/SRX-05';
import { srx06 } from './expansions/SRX/SRX-06';
import { srx07 } from './expansions/SRX/SRX-07';
import { srx08 } from './expansions/SRX/SRX-08';
import { srx09 } from './expansions/SRX/SRX-09';
import { srx10 } from './expansions/SRX/SRX-10';
import { srx11 } from './expansions/SRX/SRX-11';
import { srx12 } from './expansions/SRX/SRX-12';
import { srx97 } from './expansions/SRX/SRX-97';
import { srx98 } from './expansions/SRX/SRX-98';

const expansions: Record<ExpansionCardType, ExpansionCard[]> = {
  'SR-JV80': [srJV80_02, srJV80_04, srJV80_05, srJV80_06, srJV80_07, srJV80_08, srJV80_09, srJV80_10, srJV80_16],
  SRX: [srx01, srx02, srx03, srx04, srx05, srx06, srx07, srx08, srx09, srx10, srx11, srx12, srx97, srx98]
};

export const expansionsOfType = (expansionType: ExpansionCardType): ExpansionCard[] => expansions[expansionType];

export const getExpansionByTypeAndNumber = (expType: ExpansionCardType, number: string): ExpansionCard =>
  _.find(expansions[expType], { number })!;
