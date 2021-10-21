export type Selection =
  | {
      type: 'song';
      selectedId: number;
    }
  | {
      type: 'cue';
      selectedId: number;
    }
  | {
      type: 'globals';
    }
  | undefined;
