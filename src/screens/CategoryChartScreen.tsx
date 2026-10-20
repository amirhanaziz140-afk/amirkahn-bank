import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import SectionHeader from '../components/SectionHeader';
import TransactionItem from '../components/TransactionItem';
import { transactions } from '../data/transactions';

const SIZE = 240;
const STROKE = 20;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

type Pair = [string, string];

const segments: { share: number; colors: Pair }[] = [
  { share: 0.26, colors: ['#FF6B9D', '#D6B0E8'] }, // Food
  { share: 0.24, colors: ['#D9B8E8', '#C9A6E0'] }, // Shopping
  { share: 0.24, colors: ['#4FE3B0', '#A8F0D0'] }, // Car
  { share: 0.26, colors: ['#B06BFF', '#8F7BFF'] }, // Travel
];

const legend: { label: string; colors: Pair }[] = [
  { label: 'Transaction', colors: ['#FFB86B', '#FF9A5B'] },
  { label: 'Transfer', colors: ['#4FE3B0', '#A8F0D0'] },
  { label: 'Travel', colors: ['#B06BFF', '#6B8BFF'] },
  { label: 'Food', colors: ['#FF6B9D', '#D6B0E8'] },
  { label: 'Shopping', colors: ['#FFB86B', '#FF9A5B'] },
  { label: 'Car', colors: ['#4FE3B0', '#A8F0D0'] },
];

function Donut() {
  let start = -90 + 12; // кішкене бастапқы ығысу
  return (
    <View style={{ width: SIZE, height: SIZE, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={SIZE} height={SIZE} style={StyleSheet.absoluteFill}>
        <Defs>
          {segments.map((s, i) => (
            <SvgGradient key={i} id={`g${i}`} x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={s.colors[0]} />
              <Stop offset="1" stopColor={s.colors[1]} />
            </SvgGradient>
          ))}
        </Defs>
        <Circle cx={SIZE / 2} cy={SIZE / 2} r={R - STROKE / 2 - 6} fill="#F4F4F4" />
        {segments.map((s, i) => {
          const len = s.share * C - STROKE - 14;
          const rot = start;
          start += s.share * 360;
          return (
            <Circle
              key={i}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              stroke={`url(#g${i})`}
              strokeWidth={STROKE}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${len} ${C}`}
              rotation={rot}
              origin={`${SIZE / 2}, ${SIZE / 2}`}
            />
          );
        })}
      </Svg>
      <Text style={styles.percent}>55%</Text>
      <Text style={styles.percentLabel}>Transaction</Text>
    </View>
  );
}

export default function CategoryChartScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.root}>
      <Pressable style={StyleSheet.absoluteFill} onPress={() => navigation.goBack()} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
          <Text style={styles.title}>Category Chart</Text>
          <Donut />

          <View style={styles.legend}>
            {legend.map(l => (
              <View key={l.label} style={styles.legendItem}>
                <LinearGradient colors={l.colors} style={styles.swatch} />
                <Text style={styles.legendText}>{l.label}</Text>
              </View>
            ))}
          </View>

          <SectionHeader title="Transaction History" action="See All" onAction={() => navigation.replace('Transactions')} />
          <SectionHeader title="Today" muted />
          {transactions.slice(0, 2).map(t => (
            <TransactionItem key={t.id} item={t} />
          ))}
          <SectionHeader title="Last 7 Day" muted />
          {transactions.slice(4, 6).map(t => (
            <TransactionItem key={t.id} item={t} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(20,20,35,0.35)' },
  sheet: {
    maxHeight: '88%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  handle: { alignSelf: 'center', width: 40, height: 5, borderRadius: 3, backgroundColor: '#E3E3E8', marginBottom: 14 },
  title: { fontFamily: fonts.medium, fontSize: 20, color: colors.text, marginBottom: 10 },
  percent: { fontFamily: fonts.semibold, fontSize: 40, color: colors.text },
  percentLabel: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: -4 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 24, rowGap: 18 },
  legendItem: { width: '33.33%', flexDirection: 'row', alignItems: 'center', gap: 8 },
  swatch: { width: 16, height: 16, borderRadius: 5 },
  legendText: { fontFamily: fonts.regular, fontSize: 13, color: colors.text },
});
