import React, { useState } from 'react';
import { View, ScrollView, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import ScreenHeader from '../components/ScreenHeader';
import BalanceCard from '../components/BalanceCard';
import FormField from '../components/FormField';
import PrimaryButton from '../components/PrimaryButton';
import { useAppData } from '../state/AppDataContext';

const formatLastFour = (text: string) => text.replace(/\D/g, '').slice(0, 4);

const formatExpiry = (text: string) => {
  const d = text.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

export default function AddCardScreen() {
  const navigation = useNavigation();
  const { addCard } = useAppData();
  const [holder, setHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [lastFour, setLastFour] = useState('');

  const onAdd = () => {
    const digits = lastFour.replace(/\D/g, '');
    const [month, year] = expiry.split('/').map(Number);
    const today = new Date();
    const validExpiry = month >= 1 && month <= 12 && Number.isInteger(year) &&
      (2000 + year > today.getFullYear() ||
        (2000 + year === today.getFullYear() && month >= today.getMonth() + 1));
    if (digits.length !== 4 || !holder.trim() || !validExpiry) {
      Alert.alert('Add New Card', 'Картаның соңғы 4 санын, иесінің атын және жарамды MM/YY мерзімін енгізіңіз.');
      return;
    }
    // Demo-only: store the last four digits; never ask for/store full PAN or CVV.
    addCard({
      type: 'mastercard',
      number: `•••• •••• •••• ${digits}`,
      holder: holder.trim(),
      expiry,
      cvv: '•••',
    });
    Alert.alert('Add New Card', 'Демо картасы қосылды. Қосымшаны жапқанда өзгеріс сақталмайды.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="Add New Card" />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <BalanceCard
          card={{
            type: 'mastercard',
            number: `•••• •••• •••• ${lastFour || '••••'}`,
            holder,
            expiry: expiry || 'MM/YY',
            cvv: '•••',
          }}
        />

        <View style={{ marginTop: 24 }}>
          <FormField label="Cardholder Name" icon="person-circle-outline" value={holder} onChangeText={setHolder} placeholder="Tanya Myroniuk" />

          <View style={{ flexDirection: 'row', gap: 24 }}>
            <FormField
              label="Expiry Date"
              containerStyle={{ flex: 1 }}
              value={expiry}
              onChangeText={t => setExpiry(formatExpiry(t))}
              placeholder="MM/YY"
              keyboardType="number-pad"
            />

          </View>

          <FormField
            label="Card Last 4 Digits (Demo)"
            icon="card-outline"
            value={lastFour}
            onChangeText={t => setLastFour(formatLastFour(t))}
            placeholder="1234"
            keyboardType="number-pad"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label="Add Card" onPress={onAdd} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 },
  footer: { paddingHorizontal: 20, paddingBottom: 8, paddingTop: 8 },
});
