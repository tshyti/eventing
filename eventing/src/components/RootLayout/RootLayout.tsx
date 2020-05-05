import React from 'react';
import { Container, Content, Text } from 'native-base';
import style from './style';
import { StyleProp, ViewStyle } from 'react-native';

export interface RootLayoutProps {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
}

export default function RootLayout({ children, styles }: RootLayoutProps) {
  return (
    <Container style={[style.clearNotificationBar, styles]}>
      <Content>{children}</Content>
    </Container>
  );
}
