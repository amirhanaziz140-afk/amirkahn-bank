import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, TextInput, Alert, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import ScreenHeader from '../components/ScreenHeader';
import BalanceCard from '../components/BalanceCard';
import PrimaryButton from '../components/PrimaryButton';
import { cards } from '../data/cards';
import { contacts } from '../data/profile';

export default function SendMoneyScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const cardWidth = width - 40;
  const [selected, setSelected] = useState<string | null>(contacts[0].id);
  const [amount, setAmount] = useState('36.00');

  const onSend = () => {
    const to = contacts.find(c => c.id === selected);
    if (!to) return Alert.alert('Send Money', 'Алушыны таңдаңыз');
    Alert.alert('Send Money', `${to.name} — USD ${amount} жіберілді`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="Send Money" />

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 16 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + 12}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
          style={{ marginTop: 6 }}
        >
          {cards.map(c => (
            <BalanceCard key={c.id} card={c} style={{ width: cardWidth }} />
          ))}
        </ScrollView>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Send to</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 18, paddingTop: 12 }}>
            <View style={styles.contact}>
              <View style={styles.add}>
                <Ionicons name="add" size={30} color={colors.primary} />
              </View>
              <Text style={styles.contactName}>Add</Text>
            </View>
            {contacts.map(c => (
              <Pressable key={c.id} style={styles.contact} onPress={() => setSelected(c.id)}>
                <View style={[styles.ring, selected === c.id && { borderColor: colors.primary }]}>
                  <Image source={{ uri: c.avatar }} style={styles.avatar} />
                </View>
                <Text style={styles.contactName}>{c.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.box, { marginTop: 18 }]}>
          <View style={styles.rowBetween}>
            <Text style={styles.small}>Enter Your Amount</Text>
            <Text style={styles.currency}>Change Currency?</Text>
          </View>
          <View style={styles.amountRow}>
            <Text style={styles.usd}>USD</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              style={styles.amount}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label="Send Money" onPress={onSend} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  box: {
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 16,
  },
  boxTitle: { fontFamily: fonts.medium, fontSize: 15, color: colors.text },
  contact: { alignItems: 'center', gap: 6 },
  add: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: { padding: 2, borderRadius: 30, borderWidth: 2, borderColor: 'transparent' },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.surface },
  contactName: { fontFamily: fonts.regular, fontSize: 12, color: colors.text },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  small: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted },
  currency: { fontFamily: fonts.regular, fontSize: 12, color: colors.danger },
  amountRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  usd: { fontFamily: fonts.semibold, fontSize: 24, color: '#9DB0D6' },
  amount: { flex: 1, marginLeft: 14, fontFamily: fonts.semibold, fontSize: 24, color: colors.text, paddingVertical: 0 },
  footer: { paddingHorizontal: 20, paddingBottom: 8, paddingTop: 8 },
});
