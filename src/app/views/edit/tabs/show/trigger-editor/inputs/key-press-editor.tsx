import { useKeyboards } from '../../../../../../../state';
import { KeyPressTriggerInput, TriggerInput } from '../../../../../../../types';
import { Center, KeyboardPanel, Placeholder } from '../../../../../../components';

interface Props {
  input: TriggerInput;
  setInput: (input: KeyPressTriggerInput) => void;
}

export const KeyPressEditor = ({ input, setInput }: Props) => {
  const { keyboards } = useKeyboards();

  if (!(input instanceof KeyPressTriggerInput)) {
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
              onKeyClick={(key, keyboardId) => setInput(new KeyPressTriggerInput(key, keyboardId))}
            />
          </Center>
        );
      })}
    </>
  );
};
