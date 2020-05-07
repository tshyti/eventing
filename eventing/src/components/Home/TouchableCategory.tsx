import React, { useState } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import styles from './styles';
import { Button, Text, Icon } from 'native-base';
import theme from '../../utils/theme';

export interface TouchableCategoryProps {
  style?: StyleProp<ViewStyle>;
  text: string;
  iconName: string;
  onPress?: (id: number) => void;
}

export default function TouchableCategory({
  style,
  text,
  iconName,
}: TouchableCategoryProps) {
  const [active, setActive] = useState(false);

  const componentStyle: StyleProp<ViewStyle> = active
    ? [styles.active]
    : [styles.inActive];

  const textStyle: StyleProp<TextStyle> = active
    ? { color: theme.backgroundColor }
    : { color: theme.primaryColor };

  if (style) {
    componentStyle.push(style);
  }

  function handlePress() {
    setActive(!active);
  }

  return (
    <Button rounded iconLeft style={componentStyle} onPress={handlePress}>
      <Icon type="MaterialCommunityIcons" name={iconName} style={textStyle} />
      <Text style={textStyle}>{text}</Text>
    </Button>
  );
}
