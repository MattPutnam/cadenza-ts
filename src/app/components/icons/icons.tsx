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
import { MdHearing, MdCancel } from 'react-icons/md';

export const Icons = {
  add: FaPlus,
  addSong: FaFolderPlus,
  arrowDown: FaArrowDown,
  arrowUp: FaArrowUp,
  cancel: MdCancel,
  clone: FaCopy,
  collapsed: FaCaretRight,
  delete: FaTrash,
  ear: MdHearing,
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
