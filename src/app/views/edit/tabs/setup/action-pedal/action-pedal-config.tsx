import React from 'react';

import _ from 'lodash';

import * as Midi from '../../../../../../midi';
import { useActionPedal, useKeyboards } from '../../../../../../state';
import { Button, Container, Flex, Header, Title, Message, MidiListener } from '../../../../../components';
import { ActionPedalDisplay } from './action-pedal-display';

const STAGE1 = 'Press the pedal...';
const STAGE2 = 'Release the pedal...';
type Stage = typeof STAGE1 | typeof STAGE2 | undefined;

const WAIT_TIME = 1000;

export const ActionPedalConfig = () => {
  const { setActionPedal } = useActionPedal();
  const { keyboards } = useKeyboards();

  const [stage, setStage] = React.useState<Stage>(undefined);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [stage1Signals, setStage1Signals] = React.useState<Midi.ControllerMessage[]>([]);
  const [stage2Signals, setStage2Signals] = React.useState<Midi.ControllerMessage[]>([]);
  const [timeoutID, setTimeoutID] = React.useState<number | undefined>(undefined);

  const startListening = React.useCallback(() => {
    setStage1Signals([]);
    setStage(STAGE1);
    setError(undefined);
  }, []);

  const goToStage2 = React.useCallback(() => {
    clearTimeout(timeoutID);
    setStage2Signals([]);
    setStage(STAGE2);
  }, [timeoutID]);

  const finish = React.useCallback(() => {
    clearTimeout(timeoutID);

    const reduce = ({ type, controller, midiInterfaceName, channel }) => ({
      type,
      controller,
      midiInterfaceName,
      channel
    });
    const uniform = (signals: Midi.ControllerMessage[]) => _.size(_.uniqWith(_.map(signals, reduce), _.isEqual)) === 1;

    if (uniform(_.concat(stage1Signals, stage2Signals))) {
      setStage(undefined);

      const { channel, midiInterfaceName, controller } = stage1Signals[0];
      const keyboard = _.find(keyboards, { channel, midiInterfaceName })!;

      let type: string;
      let reverse: boolean = false;
      if (stage1Signals.length === 1 && stage2Signals.length === 1) {
        const s1 = stage1Signals[0];
        const s2 = stage2Signals[0];
        if (_.isEqual(s1, s2)) {
          type = 'single value';
        } else if (s1.value < s2.value) {
          type = 'alternating value';
          reverse = true;
        } else {
          type = 'alternating value';
        }
      } else {
        type = 'continuous';

        if (stage1Signals[stage1Signals.length - 1].value < stage1Signals[0].value) {
          reverse = true;
        }
      }

      setActionPedal({
        keyboardId: keyboard.id,
        controller,
        type,
        reverse
      });
    } else {
      setError('Unable to determine, received signals from multiple sources.');
      setStage(undefined);
    }
  }, [keyboards, setActionPedal, stage1Signals, stage2Signals, timeoutID]);

  const cancel = React.useCallback(() => {
    setStage(undefined);
    setError(undefined);
  }, []);

  const handleMidi = React.useCallback(
    (parsedMessage: Midi.MidiMessage) => {
      clearTimeout(timeoutID);

      if (parsedMessage instanceof Midi.ControllerMessage) {
        if (stage === STAGE1) {
          setStage1Signals([...stage1Signals, parsedMessage]);
          if (parsedMessage.value === 127) {
            goToStage2();
            return;
          }
        } else if (stage === STAGE2) {
          setStage2Signals([...stage2Signals, parsedMessage]);
          if (parsedMessage.value === 0) {
            finish();
            return;
          }
        }
      }

      setTimeoutID(
        window.setTimeout(() => {
          if (stage === STAGE1) {
            goToStage2();
          } else if (stage === STAGE2) {
            finish();
          }
        }, WAIT_TIME)
      );
    },
    [finish, goToStage2, stage, stage1Signals, stage2Signals, timeoutID]
  );

  return (
    <Container alternate>
      <Header>
        <Title>Action Pedal</Title>
      </Header>
      {stage && <MidiListener id="ActionPedal" dispatch={handleMidi} />}
      <Flex pad align="center">
        <ActionPedalDisplay />
        {stage && <Message>{stage}</Message>}
        {error && <Message error>{error}</Message>}
        {!stage && (
          <Button large onClick={startListening}>
            Listen...
          </Button>
        )}
        {stage && (
          <Button large onClick={cancel}>
            Cancel
          </Button>
        )}
      </Flex>
    </Container>
  );
};
