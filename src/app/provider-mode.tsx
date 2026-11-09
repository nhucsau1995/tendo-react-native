import { router } from 'expo-router';
import { StyleSheet, Switch, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Screen } from '../components/Screen';
import { T } from '../components/Text';
import { Avatar, Card, Section } from '../components/ui';
import { providerToday, providerWeek } from '../data/seed';
import { money } from '../logic/pricing';
import { useStore } from '../store';
import { colors, font, radius, shadow } from '../theme/tokens';

// The other side of the marketplace, simulated: a pro accepts or declines incoming jobs.
export default function ProviderMode() {
  const requests = useStore((s) => s.requests);
  const respond = useStore((s) => s.respond);
  const online = useStore((s) => s.online);
  const setOnline = useStore((s) => s.setOnline);
  const setRole = useStore((s) => s.setRole);
  const open = requests.filter((r) => r.state === 'new');
  const accepted = requests.filter((r) => r.state === 'accepted');
  const earned = providerWeek.earnings + accepted.reduce((n, r) => n + r.price, 0);
  return (
    <Screen testID="screen-provider-mode">
      <View style={styles.head}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 }}>
          <Icon name="repeat" size={16} color={colors.accentFill} />
          <T
            variant="label"
            testID="switch-customer"
            style={{ color: colors.accentFill, fontFamily: font.semibold }}
            onPress={() => {
              setRole('customer');
              if (router.canGoBack()) router.back();
              else router.replace('/home');
            }}
          >
            Switch to customer
          </T>
        </View>
        <View style={styles.toggle}>
          <View style={[styles.onDot, !online && { backgroundColor: colors.text3 }]} />
          <T variant="label" style={{ color: online ? colors.success : colors.text2, fontFamily: font.semibold }}>{online ? 'Online' : 'Offline'}</T>
          <Switch value={online} onValueChange={setOnline} trackColor={{ true: colors.success, false: colors.borderStrong }} thumbColor={colors.white} testID="online-toggle" />
        </View>
      </View>
      <T variant="display" style={{ marginTop: 12 }}>Provider mode</T>
      <View style={styles.earn}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <T variant="label" style={{ color: colors.white }}>This week</T>
          <View style={styles.range}><T variant="caption" style={{ color: colors.white }}>{providerWeek.range}</T></View>
        </View>
        <T variant="display" style={{ color: colors.white, fontSize: 38, lineHeight: 46, marginTop: 4 }} testID="earnings">{money(earned)}</T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 8 }}>
          <T variant="label" style={{ color: colors.white }}>{providerWeek.jobs + accepted.length} jobs</T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="star" size={14} color={colors.white} />
            <T variant="label" style={{ color: colors.white }}>{providerWeek.rating} rating</T>
          </View>
        </View>
      </View>

      <Section title={`New requests (${open.length})`}>
        {!online ? (
          <Card><T variant="body" style={{ color: colors.text2 }}>You are offline. Go online to receive job requests.</T></Card>
        ) : open.length === 0 ? (
          <Card><T variant="body" style={{ color: colors.text2 }}>All caught up. New requests appear here.</T></Card>
        ) : (
          open.map((r) => (
            <Card key={r.id} style={{ marginBottom: 12 }} testID={`request-${r.id}`}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Avatar img={r.avatar} size={52} />
                <View style={{ flex: 1 }}>
                  <T variant="body" bold>{r.customer}</T>
                  <T variant="label" style={{ color: colors.text2 }}>{r.service}</T>
                  <View style={[styles.tag, r.tag === 'New client' && { backgroundColor: colors.successTint }]}>
                    <T variant="caption" style={{ color: r.tag === 'New client' ? colors.success : colors.accentFill }}>{r.tag}</T>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <T variant="title" style={{ fontFamily: font.display, fontSize: 24 }}>${r.price}</T>
                  <T variant="caption">Est. {r.hours} hrs</T>
                </View>
              </View>
              <View style={styles.when}>
                <Icon name="calendar" size={16} color={colors.accentFill} />
                <T variant="label" style={{ flex: 1, fontFamily: font.medium }}>{r.when}</T>
                <Icon name="navigation" size={14} color={colors.text2} />
                <T variant="label" style={{ color: colors.text2 }}>{r.distance} mi</T>
              </View>
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
                <Button label="Decline" kind="secondary" small style={{ flex: 1 }} testID={`decline-${r.id}`} onPress={() => respond(r.id, false)} />
                <Button label="Accept" small style={{ flex: 1 }} testID={`accept-${r.id}`} onPress={() => respond(r.id, true)} />
              </View>
            </Card>
          ))
        )}
      </Section>

      <Section title="Today">
        {[...accepted.map((r) => ({ key: r.id, avatar: r.avatar, name: r.customer, line: `${r.service}, ${r.when}` })), { key: 'liam', avatar: providerToday.avatar, name: providerToday.customer, line: `${providerToday.service}, ${providerToday.time}` }].map((j) => (
          <Card key={j.key} style={styles.today}>
            <Avatar img={j.avatar} size={48} />
            <View style={{ flex: 1 }}>
              <T variant="body" bold>{j.name}</T>
              <T variant="caption">{j.line}</T>
            </View>
            <View style={styles.confirmed}><T variant="caption" style={{ color: colors.success, fontFamily: font.semibold }}>Confirmed</T></View>
          </Card>
        ))}
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  toggle: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.surface, borderRadius: radius.pill, paddingLeft: 12, paddingRight: 4, height: 44, ...shadow },
  onDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success },
  earn: { marginTop: 16, backgroundColor: colors.accentFill, borderRadius: radius.card, padding: 20, ...shadow },
  range: { backgroundColor: colors.onAccentChip, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 3 },
  tag: { alignSelf: 'flex-start', backgroundColor: colors.accentTint, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 2, marginTop: 4 },
  when: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, backgroundColor: colors.surfaceAlt, borderRadius: radius.control, padding: 12 },
  today: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  confirmed: { backgroundColor: colors.successTint, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
});
