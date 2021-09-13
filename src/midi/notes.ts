type AccidentalPreference = 'flats' | 'sharps' | 'most-common';

const noteList: Record<AccidentalPreference, string[]> = {
  flats: ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'],
  sharps: ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'],
  'most-common': ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B']
};

export const midiNoteNumberToName = (midiNumber: number, prefer: AccidentalPreference = 'most-common'): string => {
  const octave = Math.floor(midiNumber / 12) - 1;
  const noteIndex = midiNumber % 12;
  return noteList[prefer][noteIndex] + octave;
};
