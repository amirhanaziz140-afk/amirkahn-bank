import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import ScreenHeader from '../components/ScreenHeader';
import FormField from '../components/FormField';
import DateFields from '../components/DateFields';
import { user } from '../data/profile';

export default function EditProfileScreen() {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [birth, setBirth] = useState(user.birth);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="Edit Profile" />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', marginBottom: 22 }}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.role}>{user.role}</Text>
        </View>

        <FormField label="Full Name" icon="person-circle-outline" value={name} onChangeText={setName} />
        <FormField
          label="Email Address"
          icon="mail-outline"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormField label="Phone Number" icon="call-outline" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <DateFields label="Birth Date" value={birth} onChange={setBirth} />
      </ScrollView>

      <Text style={styles.joined}>
        Joined <Text style={{ color: colors.text }}>{user.joined}</Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 },
  avatar: { width: 70, height: 90, borderRadius: 35, backgroundColor: colors.surface },
  name: { fontFamily: fonts.medium, fontSize: 18, color: colors.text, marginTop: 12 },
  role: { fontFamily: fonts.regular, fontSize: 13, color: '#7C8798', marginTop: 6 },
  joined: { textAlign: 'center', fontFamily: fonts.regular, fontSize: 13, color: colors.muted, paddingBottom: 18 },
});
