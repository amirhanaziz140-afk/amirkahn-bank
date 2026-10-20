import React from 'react';
import { Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  onPress?: () => void;
  children: React.ReactNode;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export default function CircleButton({ onPress, children, size = 44, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.btn, { width: size, height: size, borderRadius: size / 2 }, style]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
});
