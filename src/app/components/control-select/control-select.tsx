import React from 'react';

import _ from 'lodash';

import { Select } from '..';
import * as Midi from '../../../midi';

interface Props {
  selected: number;
  setSelected: (value: number) => void;
}

const options = _.range(0, 128);
const render = Midi.longCCName;

export const ControlSelect: React.FC<Props> = ({ selected, setSelected }) => {
  return <Select {...{ options, selected, setSelected, render }} />;
};
