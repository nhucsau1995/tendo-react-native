import { StyleSheet, View } from 'react-native';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, font } from '../theme/tokens';
import { Icon, type IconName } from './Icon';
import { ScalePressable } from './Pressable';
import { T } from './Text';

// Shared nav from DESIGN.md: exactly Home, Bookings, Inbox, Profile on a flat white bar.
const TABS: Record<string, { label: string; icon: IconName }> = {
  home: { label: 'Home', icon: 'home' },
  bookings: { label: 'Bookings', icon: 'calendar' },
  inbox: { label: 'Inbox', icon: 'message-circle' },
  profile: { label: 'Profile', icon: 'user' },
};

export function TabBar({ state, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {state.routes.map((route, i) => {
        const tab = TABS[route.name];
        if (!tab) return null;
        const active = state.index === i;
        const color = active ? colors.accentFill : colors.text2;
        return (
          <ScalePressable
            key={route.key}
            testID={`tab-${route.name}`}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={tab.label}
            onPress={() => !active && navigateToTab(route.key)}
            containerStyle={{ flex: 1 }}
            style={styles.item}
          >
            <View style={[styles.pill, active && { backgroundColor: colors.accentTint }]}>
              <Icon name={tab.icon} color={color} size={22} />
            </View>
            <T variant="tab" style={{ color, fontFamily: active ? font.semibold : font.medium }}>{tab.label}</T>
          </ScalePressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8 },
  item: { flex: 1, alignItems: 'center', gap: 2, minHeight: 50 },
  pill: { width: 56, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
});
