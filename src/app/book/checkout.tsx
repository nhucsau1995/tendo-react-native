import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Screen } from '../../components/Screen';
import { T } from '../../components/Text';
import { Avatar, BackHeader, Card, Divider, Row } from '../../components/ui';
import { customer, days, promoCodes, providers } from '../../data/seed';
import { money, quote } from '../../logic/pricing';
import { useStore } from '../../store';
import { colors, font, radius } from '../../theme/tokens';

function Line({ label, value, color = colors.text }: { label: string; value: string; color?: string }) {
  return (
    <View style={styles.line}>
      <T variant="body" style={{ color }}>{label}</T>
      <T variant="body" style={{ color, fontFamily: font.medium }}>{value}</T>
    </View>
  );
}

export default function Checkout() {
  const draft = useStore((s) => s.draft);
  const confirm = useStore((s) => s.confirmBooking);
  const p = providers.find((x) => x.id === draft.providerId)!;
  const pkg = p.packages.find((x) => x.id === draft.packageId)!;
  const day = days.find((d) => d.key === draft.dayKey)!;
  const q = quote(pkg.price, draft.promo, promoCodes);
  return (
    <Screen
      testID="screen-checkout"
      header={<BackHeader title="Checkout" caption="Step 2 of 2" />}
      footer={
        <Button
          label="Confirm booking"
          icon="lock"
          testID="confirm-booking"
          onPress={() => {
            const id = confirm();
            router.dismissTo('/home');
            router.push(`/booking/${id}`);
          }}
        />
      }
    >
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Avatar img={p.avatar} size={52} />
          <View>
            <T variant="body" bold>{p.name}</T>
            <T variant="label" style={{ color: colors.text2 }}>{pkg.name}, {pkg.hours} hrs</T>
          </View>
        </View>
        <Divider />
        <Row icon="calendar" text={`${day.label}, ${draft.time}`} />
        <Row icon="map-pin" text={customer.address.replace(', San Francisco', '')} />
      </Card>

      <Card style={{ marginTop: 16 }} testID="price-card">
        <Line label={`${pkg.name} (${pkg.hours} hrs)`} value={money(q.subtotal)} />
        <Line label="Service fee" value={money(q.fee)} />
        {q.promo ? <Line label={`Promo ${q.promo}`} value={`-${money(q.discount)}`} color={colors.success} /> : null}
        <Divider />
        <View style={[styles.line, { alignItems: 'center' }]}>
          <T variant="body" bold>Total</T>
          <T variant="display" testID="total">{money(q.total)}</T>
        </View>
      </Card>

      <Card style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Icon name="credit-card" size={22} color={colors.text} />
        <View style={{ flex: 1 }}>
          <T variant="body" bold>{customer.card}</T>
          <T variant="caption">Expires 08/27</T>
        </View>
        <T variant="label" style={{ color: colors.accentFill }}>Change</T>
      </Card>

      <View style={styles.note}>
        <Icon name="shield" size={18} color={colors.accentFill} />
        <T variant="label" style={{ flex: 1, color: colors.text }}>You are charged only after the job is completed</T>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  line: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  note: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16, backgroundColor: colors.infoTint, borderRadius: radius.control, padding: 14 },
});
