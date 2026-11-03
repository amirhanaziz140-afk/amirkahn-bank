import React, { useState } from 'react';
import { View, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import ScreenHeader from '../components/ScreenHeader';
import CircleButton from '../components/CircleButton';
import TransactionItem from '../components/TransactionItem';
import { transactions } from '../data/transactions';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const data = transactions.filter(
    t => !q || t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q),
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader
        title="Search"
        right={
          <CircleButton onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={22} color={colors.text} />
          </CircleButton>
        }
      />

      <View style={styles.search}>
        <Ionicons name="search-outline" size={20} color={colors.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        {query ? (
          <Pressable onPress={() => setQuery('')}>
            <Ionicons name="close" size={20} color={colors.muted} />
          </Pressable>
        ) : null}
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    height: 48,
    paddingHorizontal: 14,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 12,
    gap: 10,
  },
  input: { flex: 1, fontFamily: fonts.regular, fontSize: 15, color: colors.text },
});
