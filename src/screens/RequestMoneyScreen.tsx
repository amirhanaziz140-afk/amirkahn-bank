import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import ScreenHeader from '../components/ScreenHeader';
import FormField from '../components/FormField';
import DateFields from '../components/DateFields';
import PrimaryButton from '../components/PrimaryButton';

export default function RequestMoneyScreen() {
  const navigation = useNavigation();
  const [payer, setPayer] = useState('Tanya Myroniuk');
  const [email, setEmail] = useState('tanya.myroniuk@gmail.com');
  const [description, setDescription] = useState('Tanya Myroniuk');
  const [due, setDue] = useState<[string, string, string]>(['28', '09', '2000']);
  const [amount, setAmount] = useState('26.00');

  const onSend = () =>
    Alert.alert('Request Money', `${payer} — USD ${amount} сұралды`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="Request Money" />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <FormField label="Payer Name" icon="person-circle-outline" value={payer} onChangeText={setPayer} />
        <FormField
          label="Email Address"
          icon="mail-outline"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormField label="Description" icon="person-circle-outline" value={description} onChangeText={setDescription} />
        <DateFields label="Monthly Due By" value={due} onChange={setDue} />

        <View style={styles.box}>
          <View style={styles.rowBetween}>
            <Text style={styles.small}>Enter Your Amount</Text>
            <Text style={styles.currency}>Change Currency?</Text>
          </View>
          <View style={styles.amountRow}>
            <Text style={styles.usd}>USD</Text>
            <TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" style={styles.amount} />
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
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 },
  box: { borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 16, marginTop: 6 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  small: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted },
  currency: { fontFamily: fonts.regular, fontSize: 12, color: colors.danger },
  amountRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  usd: { fontFamily: fonts.semibold, fontSize: 24, color: '#9DB0D6' },
  amount: { flex: 1, marginLeft: 14, fontFamily: fonts.semibold, fontSize: 24, color: colors.text, paddingVertical: 0 },
  footer: { paddingHorizontal: 20, paddingBottom: 8, paddingTop: 8 },
});
