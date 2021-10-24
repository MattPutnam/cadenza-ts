import { useKeyboards } from '../../../../../../../state';
import { TriggerInput } from '../../../../../../../types';
import { Center, KeyboardPanel, Placeholder } from '../../../../../../components';

interface Props {
  input: TriggerInput;
  setInput: (input: TriggerInput) => void;
}

export const KeyPressEditor = ({ input, setInput }: Props) => {
  const { keyboards } = useKeyboards();

  if (input.type !== 'key-press') {
    return <Placeholder>Wrong input type</Placeholder>;
  }

  return (
    <>
      {keyboards.map((keyboard) => {
        return (
          <Center pad key={keyboard.id}>
            <KeyboardPanel
              keyboard={keyboard}
              highlightKeys={input.key !== undefined && input.keyboardId === keyboard.id ? [input.key] : []}
              listenerId={`TriggerInputEditor${keyboard.id}`}
              onKeyClick={(key, keyboardId) => setInput({ ...input, key, keyboardId })}
            />
          </Center>
        );
      })}
    </>
  );
};
