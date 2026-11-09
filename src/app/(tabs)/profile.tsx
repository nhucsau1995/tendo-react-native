import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { Icon, type IconName } from '../../components/Icon';
import { ScalePressable } from '../../components/Pressable';
import { Screen } from '../../components/Screen';
import { T } from '../../components/Text';
import { Avatar, Card } from '../../components/ui';
import { customer } from '../../data/seed';
import { useStore } from '../../store';
import { colors, font, radius, shadow } from '../../theme/tokens';

const ROWS: { icon: IconName; title: string; sub: string }[] = [
  { icon: 'map-pin', title: 'Saved addresses', sub: 'Home and Work (2)' },
  { icon: 'credit-card', title: 'Payment methods', sub: 'Visa 4242' },
  { icon: 'bell', title: 'Notifications', sub: 'Push and SMS on' },
  { icon: 'tag', title: 'Promo codes', sub: 'SPRING20 active' },
  { icon: 'help-circle', title: 'Help center', sub: 'Answers and support chat' },
];

export default function Profile() {
  const setRole = useStore((s) => s.setRole);
  return (
    <Screen testID="screen-profile">
      <T variant="display">Profile</T>
      <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 16 }}>
        <Avatar img="avatarEmma" size={72} />
        <View style={{ flex: 1 }}>
          <T variant="title">{customer.name}</T>
          <T variant="label" style={{ color: colors.text2 }}>{customer.email}</T>
          <T variant="caption" style={{ color: colors.text3 }}>Member since {customer.since}</T>
        </View>
      </Card>

      <View style={styles.earn} testID="earn-card">
        <T variant="display" style={{ color: colors.white, fontSize: 26, lineHeight: 32 }}>Earn with Tendo</T>
        <T variant="label" style={{ color: colors.white, marginTop: 4 }}>Switch to provider mode to accept jobs</T>
        <Button
          label="Switch to provider"
          kind="white"
          small
          iconRight="arrow-right"
          testID="switch-provider"
          style={{ alignSelf: 'flex-start', marginTop: 14 }}
          onPress={() => {
            setRole('provider');
            router.push('/provider-mode');
          }}
        />
      </View>

      <Card style={{ marginTop: 16, paddingVertical: 4 }}>
        {ROWS.map((r, i) => (
          <ScalePressable key={r.title} style={[styles.row, i > 0 && { borderTopWidth: 1, borderTopColor: colors.border }]}>
            <View style={styles.rowIcon}><Icon name={r.icon} size={20} color={colors.accentFill} /></View>
            <View style={{ flex: 1 }}>
              <T variant="body" style={{ fontFamily: font.medium }}>{r.title}</T>
              <T variant="caption">{r.sub}</T>
            </View>
            <Icon name="chevron-right" size={18} color={colors.borderStrong} />
          </ScalePressable>
        ))}
      </Card>

      <Card style={{ marginTop: 16 }} onPress={() => router.replace('/')} testID="log-out">
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Icon name="log-out" size={20} color={colors.danger} />
          <T variant="body" style={{ color: colors.danger, fontFamily: font.medium }}>Log out</T>
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  earn: { marginTop: 16, backgroundColor: colors.accentFill, borderRadius: radius.card, padding: 20, ...shadow },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  rowIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.accentTint, alignItems: 'center', justifyContent: 'center' },
});
