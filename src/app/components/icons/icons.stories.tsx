import styled from 'styled-components';

import { icon } from '.';
import { colors } from '..';
import { Icons, IconName } from './icons';

const IconSwatchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const IconSwatch = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 110px;
  height: 50px;
  padding: 5px;
  margin: 5px;
  background-color: ${colors.blue[2]};
`;

export default {
  title: 'Icon Library'
};

export const IconLibrary = () => (
  <IconSwatchContainer>
    {Object.keys(Icons).map((iconName, index) => (
      <IconSwatch key={index}>
        {iconName}
        {icon(iconName as IconName)}
      </IconSwatch>
    ))}
  </IconSwatchContainer>
);
