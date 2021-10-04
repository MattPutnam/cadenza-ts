import { colors } from '..';
import { disableArg, textArg } from '../../../storybook-components';
import { Placeholder } from './placeholder';

export default {
  title: 'Components / Placeholder',
  component: Placeholder,
  argTypes: {
    text: textArg('Placeholder Text'),
    height: disableArg,
    width: disableArg
  }
};

export const PlaceholderStory = ({ text }) => (
  <div style={{ height: 300, width: 500, backgroundColor: colors.blue[2] }}>
    <Placeholder>{text}</Placeholder>
  </div>
);
PlaceholderStory.storyName = 'Placeholder';
