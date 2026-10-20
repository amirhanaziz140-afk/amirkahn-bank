import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { BankCard } from '../data/cards';

export function MastercardLogo({ size = 22 }: { size?: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#EB001B' }} />
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: '#F79E1B',
          marginLeft: -size * 0.35,
        }}
      />
    </View>
  );
}

interface Props {
  card: Pick<BankCard, 'type' | 'number' | 'holder' | 'expiry' | 'cvv'>;
  style?: StyleProp<ViewStyle>;
}

export default function BalanceCard({ card, style }: Props) {
  const isVisa = card.type === 'visa';
  const groups = card.number.split(' ');

  return (
    <LinearGradient
      colors={isVisa ? [colors.cardDark, colors.cardDark] : [colors.cardNavy, colors.cardNavyDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, style]}
    >
      <View style={styles.top}>
        <Ionicons name="hardware-chip-outline" size={36} color={colors.cardAccent} />
        {!isVisa && (
          <Ionicons
            name="wifi"
            size={22}
            color={colors.cardAccent}
            style={{ transform: [{ rotate: '90deg' }] }}
          />
        )}
      </View>

      {isVisa ? (
        <Text style={styles.numberSingle}>{card.number}</Text>
      ) : (
        <View style={styles.numberRow}>
          {groups.map((g, i) => (
            <Text key={i} style={[styles.number, i > 1 && { color: colors.cardTextSoft }]}>
              {g}
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.holder}>{card.holder || 'Cardholder Name'}</Text>

      <View style={{ flex: 1 }} />

      <View style={styles.bottom}>
        <View style={{ flexDirection: 'row', gap: 28 }}>
          <View>
            <Text style={styles.small}>Expiry Date</Text>
            <Text style={styles.value}>{card.expiry}</Text>
          </View>
          {!isVisa && (
            <View>
              <Text style={styles.small}>CVV</Text>
              <Text style={styles.value}>{card.cvv}</Text>
            </View>
          )}
        </View>

        {isVisa ? (
          <Text style={styles.visa}>VISA</Text>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <MastercardLogo />
            <Text style={styles.mc}>Mastercard</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 198,
    borderRadius: 24,
    padding: 20,
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  numberRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  number: { color: colors.white, fontFamily: fonts.medium, fontSize: 22 },
  numberSingle: { color: colors.white, fontFamily: fonts.medium, fontSize: 22, marginTop: 16 },
  holder: { color: colors.white, fontFamily: fonts.regular, fontSize: 13, marginTop: 6 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  small: { color: 'rgba(255,255,255,0.55)', fontFamily: fonts.regular, fontSize: 10 },
  value: { color: colors.white, fontFamily: fonts.regular, fontSize: 13, marginTop: 2 },
  visa: { color: colors.white, fontFamily: fonts.semibold, fontSize: 18, fontStyle: 'italic' },
  mc: { color: colors.white, fontFamily: fonts.regular, fontSize: 11, marginTop: 2 },
});
