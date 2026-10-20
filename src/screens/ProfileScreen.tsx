import React from 'react';
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import ScreenHeader from '../components/ScreenHeader';
import CircleButton from '../components/CircleButton';
import { user } from '../data/profile';

const items: { label: string; icon: string; route?: string; badge?: number }[] = [
  { label: 'Personal Information', icon: 'person-circle-outline', route: 'EditProfile' },
  { label: 'Payment Preferences', icon: 'card-outline' },
  { label: 'Banks and Cards', icon: 'wallet-outline', route: 'AllCards' },
  { label: 'Notifications', icon: 'notifications-outline', badge: 2 },
  { label: 'Message Center', icon: 'chatbox-ellipses-outline' },
  { label: 'Address', icon: 'location-outline' },
  { label: 'Settings', icon: 'settings-outline', route: 'Settings' },
];

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader
        title="Profile"
        right={
          <CircleButton onPress={() => navigation.navigate('EditProfile')}>
            <MaterialCommunityIcons name="account-edit-outline" size={22} color={colors.text} />
          </CircleButton>
        }
      />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
        <View style={styles.user}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.role}>{user.role}</Text>
          </View>
        </View>

        {items.map(it => (
          <Pressable
            key={it.label}
            style={styles.row}
            onPress={() => it.route && navigation.navigate(it.route === 'Settings' ? 'Tabs' : it.route, it.route === 'Settings' ? { screen: 'Settings' } : undefined)}
          >
            <Ionicons name={it.icon as any} size={22} color={colors.muted} />
            <Text style={styles.label}>{it.label}</Text>
            {it.badge ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{it.badge}</Text>
              </View>
            ) : (
              <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            )}
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  user: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 14 },
  avatar: { width: 58, height: 72, borderRadius: 29, backgroundColor: colors.surface },
  name: { fontFamily: fonts.medium, fontSize: 16, color: colors.text },
  role: { fontFamily: fonts.regular, fontSize: 13, color: '#7C8798', marginTop: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: { flex: 1, marginLeft: 16, fontFamily: fonts.regular, fontSize: 15, color: colors.text },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E8002A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: { color: colors.white, fontFamily: fonts.medium, fontSize: 11 },
});
