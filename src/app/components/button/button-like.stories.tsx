import { action } from '@storybook/addon-actions';

import { ButtonLike } from '.';
import { storyWrapper } from '../../../storybook-components';

export default {
  title: 'Components / ButtonLike',
  component: ButtonLike,
  argTypes: {
    text: { type: 'text', defaultValue: 'Clickable', control: { type: 'text' } },
    onClick: { table: { disable: true } },
    style: { table: { disable: true } }
  },
  decorators: storyWrapper
};

export const ButtonLikeStory = ({ text }) => (
  <ButtonLike onClick={action('clicked')}>
    <span>{text}</span>
  </ButtonLike>
);
ButtonLikeStory.storyName = 'ButtonLike';
