import { useKeyboards } from '../../../../../../../state';
import { KeyPressTriggerInput } from '../../../../../../../types';
import { Center, KeyboardPanel } from '../../../../../../components';

interface Props {
  input: KeyPressTriggerInput;
  setInput: (input: KeyPressTriggerInput) => void;
}

export const KeyPressEditor = ({ input, setInput }: Props) => {
  const { keyboards } = useKeyboards();

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
