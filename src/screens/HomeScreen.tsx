import React from 'react';
import { View, Text, ScrollView, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import BalanceCard from '../components/BalanceCard';
import CircleButton from '../components/CircleButton';
import SectionHeader from '../components/SectionHeader';
import TransactionItem from '../components/TransactionItem';
import { cards } from '../data/cards';
import { transactions } from '../data/transactions';
import { user } from '../data/profile';

const actions: { label: string; icon: string; route?: string }[] = [
  { label: 'Sent', icon: 'arrow-up-outline', route: 'SendMoney' },
  { label: 'Receive', icon: 'arrow-down-outline', route: 'RequestMoney' },
  { label: 'Loan', icon: 'cash-outline' },
  { label: 'Topup', icon: 'cloud-upload-outline' },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.name}>{user.name}</Text>
          </View>
          <CircleButton onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search-outline" size={20} color={colors.text} />
          </CircleButton>
        </View>

        <Pressable onPress={() => navigation.navigate('AllCards')}>
          <BalanceCard card={cards[0]} />
        </Pressable>

        <View style={styles.actions}>
          {actions.map(a => (
            <Pressable
              key={a.label}
              style={styles.action}
              onPress={() => a.route && navigation.navigate(a.route)}
            >
              <CircleButton size={64}>
                <Ionicons name={a.icon as any} size={26} color={colors.text} />
              </CircleButton>
              <Text style={styles.actionLabel}>{a.label}</Text>
            </Pressable>
          ))}
        </View>

        <SectionHeader title="Transaction" action="Sell All" onAction={() => navigation.navigate('Transactions')} />
        {transactions.slice(0, 6).map(t => (
          <TransactionItem key={t.id} item={t} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 22 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.surface },
  welcome: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
  name: { fontFamily: fonts.medium, fontSize: 16, color: colors.text },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 22, marginBottom: 4 },
  action: { alignItems: 'center', gap: 8 },
  actionLabel: { fontFamily: fonts.regular, fontSize: 13, color: colors.text },
});
