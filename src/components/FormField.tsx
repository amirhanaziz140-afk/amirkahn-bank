import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

interface Props extends TextInputProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  right?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function FormField({ label, icon, right, containerStyle, ...inputProps }: Props) {
  return (
    <View style={[styles.wrap, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {icon ? <Ionicons name={icon} size={22} color={colors.muted} style={{ marginRight: 14 }} /> : null}
        <TextInput
          {...inputProps}
          style={styles.input}
          placeholderTextColor={colors.muted}
        />
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 18 },
  label: { fontFamily: fonts.regular, fontSize: 15, color: colors.muted, marginBottom: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    height: 48,
  },
  input: { flex: 1, fontFamily: fonts.regular, fontSize: 15, color: colors.text, paddingVertical: 0 },
});
