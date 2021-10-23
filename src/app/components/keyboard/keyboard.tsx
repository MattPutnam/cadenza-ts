import React from 'react';

import _ from 'lodash';

import { colors, MidiListener } from '..';
import { useDocumentListener } from '../../../hooks/use-document-listener';
import * as Midi from '../../../midi';
import { MidiMessage, NoteOffMessage, NoteOnMessage } from '../../../midi';
import { KeyboardDefinition } from '../../../types';
import * as KeyboardUtils from '../../../utils/keyboard-utils';
import { BlackKey, KeyContainer, WhiteKey } from './components';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  keyboard: Pick<KeyboardDefinition, 'id' | 'range'>;
  onKeyClick?: (key: number, keyboardId: number) => void;
  onRangeDrag?: (range: [number, number], keyboardId: number) => void;
  listenerId?: string;
  highlightOnHover?: boolean;
  highlightKeys?: number[];
  lightHighlightKeys?: number[];
}

export const KeyboardPanel = ({
  keyboard,
  onKeyClick,
  onRangeDrag,
  listenerId,
  highlightOnHover = true,
  highlightKeys = [],
  lightHighlightKeys = [],
  style,
  ...props
}: Props) => {
  const [hoverKey, setHoverKey] = React.useState<number | undefined>(undefined);
  const [dragStart, setDragStart] = React.useState<number | undefined>(undefined);
  const [[pressedNotes], setPressedNotes] = React.useState([new Set()]);

  useDocumentListener('mouseup', () => setDragStart(undefined));

  const handleClick = React.useCallback(
    (k: number) => {
      onKeyClick!(k, keyboard.id);
      setDragStart(undefined);
    },
    [keyboard.id, onKeyClick]
  );

  const handleRangeDrag = React.useCallback(() => {
    if (dragStart && dragStart !== hoverKey) {
      onRangeDrag!([dragStart!, hoverKey!].sort((a, b) => a - b) as [number, number], keyboard.id);
      setDragStart(undefined);
    }
  }, [dragStart, hoverKey, keyboard.id, onRangeDrag]);

  const handleMidi = React.useCallback(
    (parsedMessage: MidiMessage) => {
      const { type } = parsedMessage;

      if (type === Midi.NOTE_ON) {
        pressedNotes.add((parsedMessage as NoteOnMessage).note);
      } else if (type === Midi.NOTE_OFF) {
        pressedNotes.delete((parsedMessage as NoteOffMessage).note);
      }
      setPressedNotes([pressedNotes]);
    },
    [pressedNotes]
  );

  const highlightHover = highlightOnHover && !!(onKeyClick || onRangeDrag);
  const { lowNote, highNote } = keyboard.range;

  return (
    <KeyContainer
      style={style}
      onMouseLeave={highlightHover ? () => setHoverKey(undefined) : undefined}
      onMouseUp={onRangeDrag ? handleRangeDrag : undefined}
      {...props}
    >
      {listenerId && <MidiListener id={listenerId} dispatch={handleMidi} keyboardId={keyboard.id} />}
      {_.range(lowNote, highNote + 1).map((key) => {
        let highlightColor: string | undefined;
        if (key === hoverKey || key === dragStart || highlightKeys.includes(key)) {
          highlightColor = colors.blue[2];
        } else if (pressedNotes.has(key) || lightHighlightKeys.includes(key)) {
          highlightColor = colors.blue[3];
        }

        const props = {
          key,
          first: key === lowNote,
          note: key,
          highlightColor,
          onMouseEnter: highlightHover ? () => setHoverKey(key) : undefined,
          onMouseDown: onRangeDrag ? () => setDragStart(key) : undefined,
          onClick: onKeyClick ? () => handleClick(key) : undefined
        };

        return KeyboardUtils.isWhite(key) ? <WhiteKey {...props} /> : <BlackKey {...props} />;
      })}
    </KeyContainer>
  );
};
