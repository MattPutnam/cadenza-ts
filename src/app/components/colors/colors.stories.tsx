import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { colors } from '.';

const Swatch = styled.div`
  flex: none;
  height: 80px;
  width: 80px;
  padding: 5px;
`;

const SwatchRow = styled.div`
  position: relative;
  display: flex;
  color: white;
`;

const SwatchLabel = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
`;

const ColorStick = ({ name, colors }: { name: string; colors: string[] }) => (
  <SwatchRow>
    <SwatchLabel>{name}</SwatchLabel>
    {colors.map((color, index) => (
      <Swatch style={{ backgroundColor: color }}>{index}</Swatch>
    ))}
  </SwatchRow>
);

storiesOf('Colors', module).add('Color Palette', () => (
  <>
    {Object.keys(colors).map((key) => (
      <ColorStick name={key} colors={colors[key]} />
    ))}
  </>
));
