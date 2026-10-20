import React from 'react';
import { Text, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

interface Props {
  label: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
}

export default function PrimaryButton({ label, onPress, icon, style }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, pressed && { opacity: 0.85 }, style]}>
      <Text style={styles.label}>{label}</Text>
      {icon ? <Ionicons name={icon} size={20} color={colors.white} style={{ marginLeft: 8 }} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { color: colors.white, fontFamily: fonts.medium, fontSize: 16 },
});
