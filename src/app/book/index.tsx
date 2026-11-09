import { router } from 'expo-router';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { ScalePressable } from '../../components/Pressable';
import { Screen } from '../../components/Screen';
import { T } from '../../components/Text';
import { Avatar, BackHeader, Card, Rating, Section } from '../../components/ui';
import { customer, days, fullSlots, providers, timeSlots } from '../../data/seed';
import { useStore } from '../../store';
import { colors, font, radius } from '../../theme/tokens';

export default function BookService() {
  const draft = useStore((s) => s.draft);
  const update = useStore((s) => s.updateDraft);
  const p = providers.find((x) => x.id === draft.providerId)!;
  const pkg = p.packages.find((x) => x.id === draft.packageId)!;
  const day = days.find((d) => d.key === draft.dayKey)!;
  const full = fullSlots[draft.dayKey] ?? [];
  return (
    <Screen
      testID="screen-book"
      header={<BackHeader title="Book a service" caption="Step 1 of 2" />}
      footer={
        <View>
          <T variant="caption" style={{ textAlign: 'center', marginBottom: 8 }}>Total ${pkg.price}  {day.label} at {draft.time}</T>
          <Button label="Continue to checkout" iconRight="arrow-right" testID="to-checkout" disabled={full.includes(draft.time)} onPress={() => router.push('/book/checkout')} />
        </View>
      }
    >
      <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar img={p.avatar} size={48} />
        <View>
          <T variant="body" bold>{p.name}</T>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
            <T variant="caption">{p.service}</T>
            <Rating value={p.rating} count={p.reviews} />
          </View>
        </View>
      </Card>

      <Section title="Package">
        {p.packages.map((x) => {
          const sel = x.id === draft.packageId;
          return (
            <ScalePressable key={x.id} testID={`pkg-${x.id}`} onPress={() => update({ packageId: x.id })} accessibilityRole="radio" accessibilityState={{ selected: sel }} style={[styles.pkg, sel && styles.pkgSel]}>
              <View style={[styles.radio, sel && { borderColor: colors.accentFill }]}>{sel ? <View style={styles.dot} /> : null}</View>
              <View style={{ flex: 1 }}>
                <T variant="body" bold>{x.name.replace(' clean', '')}</T>
                <T variant="caption">{x.hours} {x.hours === 1 ? 'hr' : 'hrs'}</T>
              </View>
              <T variant="body" bold>${x.price}</T>
            </ScalePressable>
          );
        })}
      </Section>

      <Section title="Date">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }} contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}>
          {days.map((d) => {
            const sel = d.key === draft.dayKey;
            return (
              <ScalePressable key={d.key} testID={`day-${d.key}`} onPress={() => update({ dayKey: d.key })} style={[styles.day, sel && { backgroundColor: colors.accentFill, borderColor: colors.accentFill }]}>
                <T variant="caption" style={{ color: sel ? colors.white : colors.text2 }}>{d.weekday}</T>
                <T variant="title" style={{ color: sel ? colors.white : colors.text }}>{d.day}</T>
              </ScalePressable>
            );
          })}
        </ScrollView>
      </Section>

      <Section title="Time">
        <View style={styles.slots}>
          {timeSlots.map((t) => {
            const isFull = full.includes(t);
            const sel = t === draft.time && !isFull;
            return (
              <ScalePressable key={t} testID={`slot-${t.replace(/[: ]/g, '')}`} disabled={isFull} onPress={() => update({ time: t })} style={[styles.slot, sel && { backgroundColor: colors.accentFill, borderColor: colors.accentFill }, isFull && { opacity: 0.4 }]}>
                <T variant="label" style={{ color: sel ? colors.white : colors.text, fontFamily: font.medium }}>{isFull ? `${t}  Full` : t}</T>
              </ScalePressable>
            );
          })}
        </View>
      </Section>

      <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 24 }}>
        <Icon name="map-pin" size={20} color={colors.accentFill} />
        <T variant="label" style={{ flex: 1 }}>{customer.address}</T>
        <T variant="label" style={{ color: colors.accentFill }}>Change</T>
      </Card>

      <T variant="label" style={{ marginTop: 20, marginBottom: 6 }}>Notes for your pro</T>
      <TextInput value={draft.notes} onChangeText={(notes) => update({ notes })} multiline accessibilityLabel="Notes" style={styles.notes} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  pkg: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, borderRadius: radius.card, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
  pkgSel: { borderColor: colors.accentFill, borderWidth: 2, backgroundColor: colors.accentTint },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.borderStrong, alignItems: 'center', justifyContent: 'center' },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.accentFill },
  day: { width: 60, height: 72, borderRadius: 18, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  slots: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slot: { height: 44, paddingHorizontal: 16, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: colors.surface, justifyContent: 'center' },
  notes: { minHeight: 72, borderRadius: radius.input, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: colors.surface, padding: 14, fontFamily: font.regular, fontSize: 16, color: colors.text, textAlignVertical: 'top' },
});
