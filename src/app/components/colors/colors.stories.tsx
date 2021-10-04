import styled from 'styled-components';

import { colors } from '.';
import { noControls } from '../../../storybook-components';
import { luminance } from '../../../utils/color';

interface SwatchProps {
  color: string;
  isLight: boolean;
}

const Swatch = styled.div<SwatchProps>`
  flex: none;
  height: 80px;
  width: 80px;
  padding: 5px;
  background-color: ${(props) => props.color};
  color: ${(props) => (props.isLight ? 'black' : 'white')};
`;

const SwatchRow = styled.div`
  position: relative;
  display: flex;
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
      <Swatch key={index} color={color} isLight={luminance(color) > 0.5}>
        {index}
      </Swatch>
    ))}
  </SwatchRow>
);

export default {
  title: 'Color Palette'
};

export const ColorPalette = noControls(() => (
  <>
    {Object.keys(colors).map((key, index) => (
      <ColorStick key={index} name={key} colors={colors[key]} />
    ))}
  </>
));
