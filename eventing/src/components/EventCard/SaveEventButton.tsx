import React, { useState, useRef } from 'react';
import { Icon } from 'native-base';
import { createAnimatableComponent } from 'react-native-animatable';
import theme from '../../utils/theme';
import { TouchableOpacity } from 'react-native';

export interface SaveEventButtonProps {
  isSaved: boolean;
}

export default function SaveEventButton({ isSaved }: SaveEventButtonProps) {
  const [saved, setSaved] = useState(isSaved);
  const iconRef = useRef<any>();

  const AnimatedIcon = createAnimatableComponent(Icon);

  async function handlePress() {
    if (saved) {
      await iconRef.current.bounceOut(300);
      setSaved(false);
    } else {
      await iconRef.current.bounceOut(300);
      setSaved(true);
    }
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={handlePress}>
      <AnimatedIcon
        ref={iconRef}
        name={saved ? 'heart' : 'heart-outline'}
        style={{ color: theme.primaryColor }}
        type="MaterialCommunityIcons"
      />
    </TouchableOpacity>
  );
}
