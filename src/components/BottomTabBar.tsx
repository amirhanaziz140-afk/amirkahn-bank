import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const tabs: Record<string, { label: string; icon: string }> = {
  Home: { label: 'Home', icon: 'home-outline' },
  MyCards: { label: 'My Cards', icon: 'wallet-outline' },
  Statistics: { label: 'Statistics', icon: 'pie-chart-outline' },
  Settings: { label: 'Settings', icon: 'settings-outline' },
};

export default function BottomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const tab = tabs[route.name];

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        const color = focused ? colors.primary : colors.muted;

        return (
          <Pressable key={route.key} style={styles.tab} onPress={onPress}>
            <Ionicons name={tab.icon as any} size={24} color={color} />
            <Text style={[styles.label, { color }]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', backgroundColor: colors.tabBar, paddingTop: 12 },
  tab: { flex: 1, alignItems: 'center', gap: 4 },
  label: { fontFamily: fonts.regular, fontSize: 12 },
});
