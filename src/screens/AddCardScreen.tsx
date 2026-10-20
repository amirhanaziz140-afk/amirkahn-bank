import React, { useState } from 'react';
import { View, ScrollView, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import ScreenHeader from '../components/ScreenHeader';
import BalanceCard, { MastercardLogo } from '../components/BalanceCard';
import FormField from '../components/FormField';
import PrimaryButton from '../components/PrimaryButton';

const formatNumber = (text: string) =>
  text.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

const formatExpiry = (text: string) => {
  const d = text.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

export default function AddCardScreen() {
  const navigation = useNavigation();
  const [holder, setHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [number, setNumber] = useState('');

  const onAdd = () => {
    if (number.replace(/\s/g, '').length < 16 || !holder || expiry.length < 5 || cvv.length < 3) {
      return Alert.alert('Add New Card', 'Барлық өрісті толтырыңыз');
    }
    Alert.alert('Add New Card', 'Карта қосылды', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="Add New Card" />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <BalanceCard
          card={{
            type: 'mastercard',
            number: number || '0000 0000 0000 0000',
            holder,
            expiry: expiry || 'MM/YY',
            cvv: cvv || '000',
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
            <FormField
              label="4-digit CVV"
              containerStyle={{ flex: 1 }}
              value={cvv}
              onChangeText={t => setCvv(t.replace(/\D/g, '').slice(0, 4))}
              placeholder="0000"
              keyboardType="number-pad"
              secureTextEntry
            />
          </View>

          <FormField
            label="Card Number"
            icon="card-outline"
            value={number}
            onChangeText={t => setNumber(formatNumber(t))}
            placeholder="0000 0000 0000 0000"
            keyboardType="number-pad"
            right={<MastercardLogo size={20} />}
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
