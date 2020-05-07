import React from 'react';
import { Container, Content, Header, Item, Icon, Input } from 'native-base';
import style from './style';
import { StyleProp, ViewStyle } from 'react-native';
import theme from '../../utils/theme';

export interface RootLayoutProps {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
}

export default function RootLayout({ children, styles }: RootLayoutProps) {
  return (
    <Container style={[style.backgroundColor, styles]}>
      <Header searchBar rounded transparent>
        <Item>
          <Icon name="ios-search" style={{ color: theme.primaryColor }} />
          <Input placeholder="Search" />
          <Icon
            name="sliders-h"
            type="FontAwesome5"
            style={{ color: theme.primaryColor }}
          />
        </Item>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
}
