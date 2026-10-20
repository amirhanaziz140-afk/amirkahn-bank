import React from 'react';
import { View, Text, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

interface Props {
  title: string;
  action?: string;
  onAction?: () => void;
  muted?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function SectionHeader({ title, action, onAction, muted, style }: Props) {
  return (
    <View style={[styles.row, style]}>
      <Text style={[styles.title, muted && styles.muted]}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction}>
          <Text style={styles.action}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 6 },
  title: { fontFamily: fonts.medium, fontSize: 20, color: colors.text },
  muted: { fontSize: 15, fontFamily: fonts.regular, color: colors.muted },
  action: { fontFamily: fonts.medium, fontSize: 14, color: colors.primary },
});
