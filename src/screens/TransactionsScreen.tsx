import React from 'react';
import { SectionList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import ScreenHeader from '../components/ScreenHeader';
import CircleButton from '../components/CircleButton';
import SectionHeader from '../components/SectionHeader';
import TransactionItem from '../components/TransactionItem';
import { transactions } from '../data/transactions';

const sections = (['Today', 'Last 7 Day'] as const).map(group => ({
  title: group,
  data: transactions.filter(t => t.group === group),
}));

export default function TransactionsScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader
        title="Transaction History"
        right={
          <CircleButton onPress={() => navigation.navigate('CategoryChart')}>
            <Ionicons name="time-outline" size={22} color={colors.text} />
          </CircleButton>
        }
      />

      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <SectionHeader
            title={section.title}
            muted={section.title !== 'Today'}
            action={section.title === 'Today' ? 'See All' : undefined}
            style={{ backgroundColor: colors.background }}
          />
        )}
        renderItem={({ item }) => <TransactionItem item={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
});
