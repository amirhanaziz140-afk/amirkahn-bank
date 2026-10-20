import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CircleButton from './CircleButton';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

interface Props {
  title: string;
  right?: React.ReactNode;
  hideBack?: boolean;
}

export default function ScreenHeader({ title, right, hideBack }: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.row}>
      <View style={styles.side}>
        {!hideBack && (
          <CircleButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </CircleButton>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.side, { alignItems: 'flex-end' }]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, height: 64 },
  side: { width: 48 },
  title: { flex: 1, textAlign: 'center', fontFamily: fonts.medium, fontSize: 18, color: colors.text },
});
