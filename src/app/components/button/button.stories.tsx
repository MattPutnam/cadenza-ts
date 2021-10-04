import { action } from '@storybook/addon-actions';

import { Button } from '.';
import { disableArg, textArg } from '../../../storybook-components';

export default {
  title: 'Components / Button',
  component: Button,
  argTypes: {
    text: textArg('Button'),
    large: 'boolean',
    disabled: 'boolean',
    onClick: disableArg,
    style: disableArg
  }
};

export const ButtonStory = ({ large, disabled, text }) => (
  <Button large={large} disabled={disabled} onClick={action('clicked')}>
    {text}
  </Button>
);
ButtonStory.storyName = 'Button';
