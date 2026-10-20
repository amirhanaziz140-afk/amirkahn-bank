import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import ScreenHeader from '../components/ScreenHeader';
import CircleButton from '../components/CircleButton';
import BalanceCard from '../components/BalanceCard';
import TransactionItem from '../components/TransactionItem';
import { cards } from '../data/cards';
import { transactions } from '../data/transactions';

const MAX = 10000;

export default function MyCardsScreen() {
  const navigation = useNavigation<any>();
  const [limit, setLimit] = useState(4600);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader
        title="My Cards"
        right={
          <CircleButton onPress={() => navigation.navigate('AddCard')}>
            <Ionicons name="add" size={24} color={colors.text} />
          </CircleButton>
        }
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <BalanceCard card={cards[0]} />

        <View style={{ marginTop: 14 }}>
          {transactions.slice(0, 3).map(t => (
            <TransactionItem key={t.id} item={t} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Monthly spending limit</Text>
        <View style={styles.limitBox}>
          <Text style={styles.amount}>Amount: $8,545.00</Text>
          <Slider
            style={{ marginHorizontal: -8, marginTop: 8 }}
            minimumValue={0}
            maximumValue={MAX}
            step={50}
            value={limit}
            onValueChange={setLimit}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.white}
            thumbTintColor={colors.primary}
          />
          <View style={styles.labels}>
            <Text style={styles.min}>$0</Text>
            <Text style={styles.current}>${limit.toLocaleString('en-US')}</Text>
            <Text style={styles.min}>$10,000</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 24 },
  sectionTitle: { fontFamily: fonts.medium, fontSize: 20, color: colors.text, marginTop: 22, marginBottom: 12 },
  limitBox: { backgroundColor: colors.surface, borderRadius: 18, padding: 16 },
  amount: { fontFamily: fonts.regular, fontSize: 14, color: colors.text },
  labels: { flexDirection: 'row', justifyContent: 'space-between' },
  min: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
  current: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
});
