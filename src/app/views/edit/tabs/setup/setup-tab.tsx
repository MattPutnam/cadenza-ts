import _ from 'lodash';

import { SetupKeyboards } from './setup-keyboards';

export const SetupTab = () => {
  return (
    <>
      <SetupKeyboards />
      {/* <Container collapse>
        <Header>
          <Title>Synthesizers</Title>
          <HeaderButton icon={Icons.add} onClick={() => this.addSynthesizer()}/>
        </Header>
        {_.isEmpty(synthesizers) && <Placeholder>No synthesizers defined.</Placeholder>}
        {synthesizers.map((synth, index) => {
          return <SynthConfig key={synth.id}
            deleteSelf={() => this.deleteItem('synthesizers', index)}
            moveUp={index > 0 ? moveUp('synthesizers', index) : undefined}
            moveDown={index < synthesizers.length-1 ? moveDown('synthesizers', index) : undefined}
            {...{ synth, midiInterfaces, data, setData }}/>;
        })}
      </Container>
      <MidiListener id='SETUP_TAB' dispatch={msg => this.handleMidi(msg)}/> */}
    </>
  );
};
