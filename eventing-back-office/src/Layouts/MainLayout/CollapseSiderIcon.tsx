import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

export interface CollapseSideIconProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function CollapseSideIcon({
  collapsed,
  setCollapsed,
}: CollapseSideIconProps) {
  if (collapsed) {
    return (
      <MenuUnfoldOutlined
        style={styles}
        onClick={() => setCollapsed(!collapsed)}
      />
    );
  }
  return (
    <MenuFoldOutlined style={styles} onClick={() => setCollapsed(!collapsed)} />
  );
}

const styles: React.CSSProperties = {
  fontSize: '23px',
  margin: '0 10px',
};
