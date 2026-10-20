import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import ScreenHeader from '../components/ScreenHeader';
import CircleButton from '../components/CircleButton';
import SectionHeader from '../components/SectionHeader';
import LineChart from '../components/LineChart';
import TransactionItem from '../components/TransactionItem';
import { transactions } from '../data/transactions';
import { months, balanceByMonth } from '../data/profile';

export default function StatisticsScreen() {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState(3);

  const balance = balanceByMonth[selected].toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader
        title="Statistics"
        right={
          <CircleButton>
            <Ionicons name="notifications-outline" size={22} color={colors.text} />
          </CircleButton>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <Text style={styles.caption}>Current Balance</Text>
        <Text style={styles.balance}>${balance}</Text>

        <View style={{ marginTop: 16 }}>
          <LineChart data={balanceByMonth} selected={selected} width={width} height={210} />
        </View>

        <View style={styles.months}>
          {months.map((m, i) => {
            const active = i === selected;
            return (
              <Pressable key={m} onPress={() => setSelected(i)} style={[styles.chip, active && styles.chipActive]}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{m}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <SectionHeader title="Transaction" action="Sell All" onAction={() => navigation.navigate('Transactions')} />
          {transactions.slice(0, 4).map(t => (
            <TransactionItem key={t.id} item={t} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  caption: { textAlign: 'center', fontFamily: fonts.regular, fontSize: 18, color: colors.muted, marginTop: 8 },
  balance: { textAlign: 'center', fontFamily: fonts.medium, fontSize: 30, color: colors.text, marginTop: 2 },
  months: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, marginTop: 14 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8 },
  chipActive: { backgroundColor: colors.primary },
  chipText: { fontFamily: fonts.regular, fontSize: 16, color: colors.muted },
  chipTextActive: { color: colors.white, fontFamily: fonts.medium },
});
