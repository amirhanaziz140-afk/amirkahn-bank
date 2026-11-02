import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import ScreenHeader from '../components/ScreenHeader';
import FormField from '../components/FormField';
import DateFields from '../components/DateFields';
import { useNavigation } from '@react-navigation/native';
import { useAppData } from '../state/AppDataContext';
import PrimaryButton from '../components/PrimaryButton';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { profile, updateProfile } = useAppData();
  const [name, setName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [birth, setBirth] = useState(profile.birth);

  const onSave = () => {
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !phone.trim()) {
      Alert.alert('Edit Profile', 'Аты-жөніңізді, email мен телефонды дұрыс толтырыңыз.');
      return;
    }
    updateProfile({ name: name.trim(), fullName: name.trim(), email: email.trim(), phone: phone.trim(), birth });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="Edit Profile" />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', marginBottom: 22 }}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{profile.fullName}</Text>
          <Text style={styles.role}>{profile.role}</Text>
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

      <View style={styles.footer}>
        <PrimaryButton label="Save Changes" onPress={onSave} />
        <Text style={styles.joined}>
          Joined <Text style={{ color: colors.text }}>{profile.joined}</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 },
  avatar: { width: 70, height: 90, borderRadius: 35, backgroundColor: colors.surface },
  name: { fontFamily: fonts.medium, fontSize: 18, color: colors.text, marginTop: 12 },
  role: { fontFamily: fonts.regular, fontSize: 13, color: '#7C8798', marginTop: 6 },
  footer: { paddingHorizontal: 20, paddingTop: 8 },
  joined: { textAlign: 'center', fontFamily: fonts.regular, fontSize: 13, color: colors.muted, paddingBottom: 18 },
});
