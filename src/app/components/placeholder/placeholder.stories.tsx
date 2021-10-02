import { colors } from '..';
import { Placeholder as PlaceholderComponent } from './placeholder';

export default {
  title: 'Components / Placeholder'
};

export const Placeholder = () => (
  <div style={{ height: 300, width: 500, backgroundColor: colors.blue[2] }}>
    <PlaceholderComponent>Placeholder Text</PlaceholderComponent>
  </div>
);
