export const ccNames: Record<number, { short: string; long: string }> = {
  0: { short: 'BANK', long: 'Bank Select' },
  1: { short: 'MOD', long: 'Modulation Wheel' },
  2: { short: 'BRCTL', long: 'Breath Controller' },
  4: { short: 'FC', long: 'Foot Controller' },
  5: { short: 'PRTTM', long: 'Portamento Time' },
  6: { short: 'DEMSB', long: 'Data Entry MSB' },
  7: { short: 'VOL', long: 'Main Volume' },
  8: { short: 'BAL', long: 'Balance' },
  10: { short: 'PAN', long: 'Pan' },
  11: { short: 'EXPR', long: 'Expression' },
  12: { short: 'EC1', long: 'Effect Control 1' },
  13: { short: 'EC2', long: 'Effect Control 2' },
  16: { short: 'GPC1', long: 'General Purpose Controller 1' },
  17: { short: 'GPC2', long: 'General Purpose Controller 2' },
  18: { short: 'GPC3', long: 'General Purpose Controller 3' },
  19: { short: 'GPC4', long: 'General Purpose Controller 4' },
  64: { short: 'SUST', long: 'Damper Pedal (Sustain)' },
  65: { short: 'PORT', long: 'Portamento' },
  66: { short: 'SOST', long: 'Sostenuto' },
  67: { short: 'SOFT', long: 'Soft Pedal' },
  68: { short: 'LEGFS', long: 'Legato Footswitch' },
  69: { short: 'HOLD2', long: 'Hold 2' },
  70: { short: 'SC1', long: 'Sound Controller 1 (default: Sound Variation)' },
  71: { short: 'SC2', long: 'Sound Controller 2 (default: Timbre/Harmonic Content)' },
  72: { short: 'SC3', long: 'Sound Controller 3 (default: Release Time)' },
  73: { short: 'SC4', long: 'Sound Controller 4 (default: Attack Time)' },
  74: { short: 'SC5', long: 'Sound Controller 5 (default: Brightness)' },
  75: { short: 'SC6', long: 'Sound Controller 6' },
  76: { short: 'SC7', long: 'Sound Controller 7' },
  77: { short: 'SC8', long: 'Sound Controller 8' },
  78: { short: 'SC9', long: 'Sound Controller 9' },
  79: { short: 'SC10', long: 'Sound Controller 10' },
  80: { short: 'GPC5', long: 'General Purpose Controller 5' },
  81: { short: 'GPC6', long: 'General Purpose Controller 6' },
  82: { short: 'GPC7', long: 'General Purpose Controller 7' },
  83: { short: 'GPC8', long: 'General Purpose Controller 8' },
  84: { short: 'PTCTL', long: 'Portamento Control' },
  91: { short: 'FX1D', long: 'Effects 1 Depth (previously External Effects Depth)' },
  92: { short: 'FX2D', long: 'Effects 2 Depth (previously Tremolo Depth)' },
  93: { short: 'FX3D', long: 'Effects 3 Depth (previously Chorus Depth)' },
  94: { short: 'FX4D', long: 'Effects 4 Depth (previously Detune Depth)' },
  95: { short: 'FX5D', long: 'Effects 5 Depth (previously Phaser Depth)' },
  96: { short: 'INC', long: 'Data Increment' },
  97: { short: 'DEC', long: 'Data Decrement' },
  98: { short: 'NPLSB', long: 'Non-Registered Parameter Number LSB' },
  99: { short: 'NPMSB', long: 'Non-Registered Parameter Number MSB' },
  100: { short: 'RPLSB', long: 'Registered Parameter Number LSB' },
  101: { short: 'RPMSB', long: 'Registered Parameter Number MSB' },
  121: { short: 'RESET', long: 'Reset All Controllers' },
  122: { short: 'LOCAL', long: 'Local Control' },
  123: { short: 'PANIC', long: 'All Notes Off' },
  124: { short: 'OMOFF', long: 'Omni Off' },
  125: { short: 'OMON', long: 'Omni On' },
  126: { short: 'MONO', long: 'Mono On (Poly Off)' },
  127: { short: 'POLY', long: 'Poly On (Mono Off)' }
};

export const shortCCName = (cc: number): string => {
  const n = ccNames[cc];
  return n ? n.short : `CC${cc}`;
};

export const longCCName = (cc: number): string => {
  const n = ccNames[cc];
  return n ? n.long : `Controller ${cc}`;
};
