import { disableArg, textArg } from '../../../storybook-components';
import { Warning } from './warning';

export default {
  title: 'Components / Warning',
  component: Warning,
  argTypes: {
    text: textArg('Warning Text'),
    ref: disableArg,
    theme: disableArg,
    as: disableArg,
    forwardedAs: disableArg
  }
};

export const WarningStory = ({ text }) => <Warning>{text}</Warning>;
WarningStory.storyName = 'Warning';
