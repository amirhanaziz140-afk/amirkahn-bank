import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import ScreenHeader from '../components/ScreenHeader';
import { languages } from '../data/profile';

export default function LanguageScreen() {
  const [selected, setSelected] = useState('en');
  const [query, setQuery] = useState('');

  const data = languages.filter(l => l.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Language" />

      <View style={styles.search}>
        <Ionicons name="search-outline" size={20} color={colors.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search Language"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={l => l.id}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => setSelected(item.id)}>
            <View style={styles.flag}>
              <Text style={{ fontSize: 30 }}>{item.flag}</Text>
            </View>
            <Text style={styles.name}>{item.name}</Text>
            {selected === item.id && <Ionicons name="checkmark-circle" size={24} color={colors.primary} />}
          </Pressable>
        )}
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
    marginVertical: 12,
    gap: 10,
  },
  input: { flex: 1, fontFamily: fonts.regular, fontSize: 15, color: colors.text },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  flag: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  name: { flex: 1, marginLeft: 16, fontFamily: fonts.medium, fontSize: 17, color: colors.text },
});
