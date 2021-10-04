import { action } from '@storybook/addon-actions';

import { ButtonLike } from '.';
import { disableArg, storyWrapper, textArg } from '../../../storybook-components';

export default {
  title: 'Components / ButtonLike',
  component: ButtonLike,
  argTypes: {
    text: textArg('Clickable'),
    onClick: disableArg,
    style: disableArg
  },
  decorators: storyWrapper
};

export const ButtonLikeStory = ({ text }) => (
  <ButtonLike onClick={action('clicked')}>
    <span>{text}</span>
  </ButtonLike>
);
ButtonLikeStory.storyName = 'ButtonLike';
