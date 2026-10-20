import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

interface Props {
  label: string;
  value: [string, string, string];
  onChange: (v: [string, string, string]) => void;
}

export default function DateFields({ label, value, onChange }: Props) {
  const set = (i: number, text: string) => {
    const next = [...value] as [string, string, string];
    next[i] = text;
    onChange(next);
  };

  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {value.map((v, i) => (
          <TextInput key={i} value={v} onChangeText={t => set(i, t)} style={styles.input} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontFamily: fonts.regular, fontSize: 15, color: colors.muted, marginBottom: 6 },
  row: { flexDirection: 'row', gap: 24 },
  input: {
    flex: 1,
    height: 44,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 0,
  },
});
