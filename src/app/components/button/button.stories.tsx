import React from 'react';

import { storiesOf } from '@storybook/react';

import { Button } from '.';

const onClick = () => {};

storiesOf('Components / Button', module).add('Button', () => (
  <>
    <Button onClick={onClick}>Regular</Button>
    <Button large onClick={onClick}>
      Large
    </Button>
    <Button disabled onClick={onClick}>
      Disabled
    </Button>
    <Button large disabled onClick={onClick}>
      Large Disabled
    </Button>
  </>
));
