import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { Transaction, formatAmount } from '../data/transactions';

interface Props {
  item: Transaction;
  onPress?: () => void;
}

export default function TransactionItem({ item, onPress }: Props) {
  const { icon } = item;
  const iconColor = icon.color ?? colors.text;
  const positive = item.amount > 0;

  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.iconWrap}>
        {icon.lib === 'ion' ? (
          <Ionicons name={icon.name as any} size={22} color={iconColor} />
        ) : (
          <MaterialCommunityIcons name={icon.name as any} size={24} color={iconColor} />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.sub}>{item.category}</Text>
      </View>

      <Text style={[styles.amount, positive && { color: colors.primary }]}>
        {formatAmount(item.amount)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1, marginLeft: 16 },
  title: { fontFamily: fonts.medium, fontSize: 16, color: colors.text },
  sub: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted, marginTop: 1 },
  amount: { fontFamily: fonts.medium, fontSize: 16, color: colors.text },
});
