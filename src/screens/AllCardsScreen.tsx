import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import ScreenHeader from '../components/ScreenHeader';
import BalanceCard from '../components/BalanceCard';
import PrimaryButton from '../components/PrimaryButton';
import { cards } from '../data/cards';

export default function AllCardsScreen() {
  const navigation = useNavigation<any>();

<<<<<<< HEAD
  
=======
>>>>>>> 401dc14 (first commit)
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="All Cards" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {cards.map(c => (
          <BalanceCard key={c.id} card={c} style={{ marginBottom: 16, height: c.type === 'visa' ? 176 : 198 }} />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label="Add Card" icon="add" onPress={() => navigation.navigate('AddCard')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  footer: { paddingHorizontal: 20, paddingBottom: 8, paddingTop: 8 },
});
