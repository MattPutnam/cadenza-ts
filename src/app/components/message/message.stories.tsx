import { disableArg, textArg } from '../../../storybook-components';
import { Message } from './message';

export default {
  title: 'Components / Message',
  component: Message,
  argTypes: {
    text: textArg('Message'),
    error: 'boolean',
    ref: disableArg,
    theme: disableArg,
    as: disableArg,
    forwardedAs: disableArg
  }
};

export const MessageStory = ({ error, text }) => <Message error={error}>{text}</Message>;
MessageStory.storyName = 'Message';
