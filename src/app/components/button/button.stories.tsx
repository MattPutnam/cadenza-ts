import { action } from '@storybook/addon-actions';

import { Button } from '.';

export default {
  title: 'Components / Button',
  component: Button,
  argTypes: {
    text: { type: 'text', defaultValue: 'Button', control: { type: 'text' } },
    large: 'boolean',
    disabled: 'boolean',
    onClick: { table: { disable: true } },
    style: { table: { disable: true } }
  }
};

export const ButtonStory = ({ large, disabled, text }) => (
  <Button large={large} disabled={disabled} onClick={action('clicked')}>
    {text}
  </Button>
);
ButtonStory.storyName = 'Button';
