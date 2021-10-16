import _ from 'lodash';

import { controllerMessage, programChangeMessage } from '../midi';
import * as Expansions from '../synthesizers/expansions';
import { GMPatches } from '../synthesizers/GM';
import * as Synthesizers from '../synthesizers/synthesizers';
import {
  BankDefinition,
  BankSelectionCommand,
  BankSelectionDefinition,
  ExpansionDefinition,
  PatchDefinition,
  SynthesizerConfig,
  isCC,
  isPC
} from '../types';

const GM1Patches = GMPatches.map((topLevel, index) => ({
  name: topLevel[0],
  number: index
}));
const GM2Patches = _.flatMap(GMPatches, (topLevel, index) => {
  return topLevel.map((patch, subIndex) => ({
    name: patch,
    number: [index, subIndex] as [number, number]
  }));
});

const transformPatches = (patches: string[]) => patches.map((name, number) => ({ name, number }));

export type SynthTreePatch = {
  name: string;
  number: number | [number, number];
};

export type SynthTreeBank = {
  name: string;
  patches: SynthTreePatch[];
  index?: number;
};

export type SynthTreeSynth = {
  name: string;
  banks: SynthTreeBank[];
};

export type SynthTree = SynthTreeSynth[];
export type SynthesizerResolution = {
  synthTree: SynthTree;
  allPatches: PatchDefinition[];
};

export const resolveSynthesizersAndPatches = (synthConfigs: SynthesizerConfig[]): SynthesizerResolution => {
  const synthTree: SynthTree = [];
  let allPatches: PatchDefinition[] = [];
  for (const synth of synthConfigs) {
    const synthDefinition = Synthesizers.getSynthByName(synth.name);

    const synthItem: SynthTreeSynth = {
      name: synth.name,
      banks: []
    };

    // eslint-disable-next-line no-loop-func
    synthDefinition.banks.forEach((bank) => {
      if (bank === 'GM' || bank === 'GM1') {
        synthItem.banks.push({
          name: bank,
          patches: GM1Patches
        });
        allPatches = [
          ...allPatches,
          ...GM1Patches.map(({ name, number }) => ({
            synthesizer: synth.name,
            synthesizerId: synth.id,
            bank,
            number,
            name
          }))
        ];
      } else if (bank === 'GM2') {
        synthItem.banks.push({
          name: bank,
          patches: GM2Patches
        });
        allPatches = [
          ...allPatches,
          ...GM2Patches.map(({ name, number }) => ({
            synthesizer: synth.name,
            synthesizerId: synth.id,
            bank,
            number,
            name
          }))
        ];
      } else {
        synthItem.banks.push({
          name: bank.name,
          patches: transformPatches(bank.patches),
          index: bank.index
        });
        allPatches = [
          ...allPatches,
          ...bank.patches.map((patch, index) => ({
            synthesizer: synth.name,
            synthesizerId: synth.id,
            bank: bank.name,
            number: index,
            name: patch
          }))
        ];
      }
    });

    for (const expansion of _.toPairs(synth.expansionCards)) {
      const [slotName, expansionNumber] = expansion;
      const expansionType = _.find(synthDefinition.expansions, { name: slotName })!.type;
      const expansionDefinition = Expansions.getExpansionByTypeAndNumber(expansionType, expansionNumber);

      synthItem.banks.push({
        name: slotName,
        patches: transformPatches(expansionDefinition.patches)
      });
      allPatches = [
        ...allPatches,
        ...expansionDefinition.patches.map((patch, index) => ({
          synthesizer: synth.name,
          synthesizerId: synth.id,
          bank: slotName,
          number: index,
          name: patch
        }))
      ];
    }

    synthTree.push(synthItem);
  }

  return { synthTree, allPatches };
};

const getLoadCommand = (patch: PatchDefinition, synthesizer: SynthesizerConfig): BankSelectionCommand[] => {
  if (patch.bank === 'GM' || patch.bank === 'GM1') {
    return [{ type: 'CC', number: 0, value: 121 }, { type: 'CC', number: 32, value: 0 }, { type: 'PC' }];
  } else if (patch.bank === 'GM2') {
    const [pc, cc] = patch.number as [number, number];
    return [
      { type: 'CC', number: 0, value: 121 },
      { type: 'CC', number: 32, value: cc },
      { type: 'PC', value: pc }
    ];
  }

  const synthDefinition = Synthesizers.getSynthByName(synthesizer.name);
  const banksAndExps = [...synthDefinition.banks, ...synthDefinition.expansions];
  const { toSelect } = _.find(banksAndExps, { name: patch.bank }) as BankDefinition | ExpansionDefinition;

  let selectors: BankSelectionDefinition[];
  if (toSelect === 'SELECT_BY_CARD') {
    const expansionCard = synthesizer.expansionCards[patch.bank];
    selectors = synthDefinition.cardSelectors![expansionCard]!;
  } else {
    selectors = toSelect;
  }

  if (selectors.length === 1) {
    return selectors[0].commands;
  } else {
    return _.find(selectors, (selector) => {
      const rangeHigh = selector.rangeHigh || Infinity;
      const rangeLow = selector.rangeLow || -Infinity;
      return rangeLow <= patch.number && patch.number <= rangeHigh;
    })!.commands;
  }
};

export const loadPatch = (
  patch: PatchDefinition,
  synthesizer: SynthesizerConfig,
  channel: number,
  outputDevice: WebMidi.MIDIOutput
): void => {
  getLoadCommand(patch, synthesizer).forEach((command) => {
    if (isCC(command)) {
      outputDevice.send(controllerMessage(channel, command.number, command.value).unparse());
    } else if (isPC(command)) {
      const number = patch.number as number;
      const value = command.value || number % 128;
      outputDevice.send(programChangeMessage(channel, value).unparse());
    }
  });
};
