import React from 'react';

export type Indexed = {
  index?: number;
};

export type Selectable = {
  selected: boolean;
};

export const select =
  (ifSelected: any, ifNotSelected: any = undefined) =>
  ({ selected }: Selectable) =>
    selected ? ifSelected : ifNotSelected;

export const indexChildren = (children: React.ReactNode) =>
  React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { index });
    }
  });
