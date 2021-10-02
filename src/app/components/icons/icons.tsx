import React from 'react';

import { IconBaseProps } from 'react-icons';
import {
  FaArrowDown,
  FaArrowUp,
  FaCaretDown,
  FaCaretRight,
  FaCopy,
  FaFolderPlus,
  FaPlus,
  FaSortAlphaDown,
  FaTrash
} from 'react-icons/fa';

export const Icons = {
  add: FaPlus,
  addSong: FaFolderPlus,
  arrowDown: FaArrowDown,
  arrowUp: FaArrowUp,
  clone: FaCopy,
  collapsed: FaCaretRight,
  delete: FaTrash,
  expanded: FaCaretDown,
  sortDown: FaSortAlphaDown,
  treeSeparator: FaCaretRight
};

export type IconName = keyof typeof Icons;

export const icon = (name: IconName, props?: IconBaseProps): React.ReactElement =>
  React.createElement(Icons[name], props);

interface IconProps extends IconBaseProps {
  name: string;
}

export const Icon = ({ name, ...props }: IconProps) => React.createElement(Icons[name], props);
