import _ from 'lodash';

import { Synthesizer } from '../types';
import { rolandJV1080 } from './roland_jv-1080';
import { rolandXV3080 } from './roland_xv-3080';
import { rolandXV5080 } from './roland_xv-5080';

const synthesizers: Synthesizer[] = [rolandJV1080, rolandXV3080, rolandXV5080];

export const synthNames = synthesizers.map((synth) => synth.name);

export const getSynthByName = (name: string): Synthesizer => _.find(synthesizers, { name })!;
