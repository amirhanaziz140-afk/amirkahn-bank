import React, { useState } from 'react';
import { View, Text, Pressable, Switch, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import ScreenHeader from '../components/ScreenHeader';
import CircleButton from '../components/CircleButton';

function Row({ label, value, onPress }: { label: string; value?: string; onPress?: () => void }) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Text style={styles.rowLabel}>{label}</Text>
      {value ? <Text style={styles.rowValue}>{value}</Text> : null}
      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </Pressable>
  );
}

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const [biometric, setBiometric] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader
        title="Settings"
        right={
          <CircleButton>
            <Ionicons name="log-out-outline" size={22} color={colors.text} />
          </CircleButton>
        }
      />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.group}>General</Text>
        <Row label="Language" value="English" onPress={() => navigation.navigate('Language')} />
        <Row label="My Profile" onPress={() => navigation.navigate('Profile')} />
        <Row label="Contact Us" />

        <Text style={[styles.group, { marginTop: 24 }]}>Security</Text>
        <Row label="Change Password" />
        <Row label="Privacy Policy" />

        <Text style={styles.hint}>Choose what data you share with us</Text>
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Text style={[styles.rowLabel, { flex: 1 }]}>Biometric</Text>
          <Switch
            value={biometric}
            onValueChange={setBiometric}
            trackColor={{ false: '#A8A8AD', true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  group: { fontFamily: fonts.regular, fontSize: 15, color: colors.muted, marginTop: 10, marginBottom: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: { flex: 1, fontFamily: fonts.medium, fontSize: 15, color: colors.text },
  rowValue: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginRight: 10 },
  hint: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted, marginTop: 14 },
});
