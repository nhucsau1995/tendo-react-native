import Ionicons from '@expo/vector-icons/Ionicons';
import type { ReactNode } from 'react';
import { Image, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { router } from 'expo-router';
import { images, type ImageKey } from '../data/images';
import type { BookingStatus } from '../data/models';
import { STATUS_LABEL } from '../logic/booking';
import { colors, font, radius, shadow } from '../theme/tokens';
import { Icon, type IconName } from './Icon';
import { ScalePressable } from './Pressable';
import { T } from './Text';

export function Card({ children, style, onPress, testID }: { children: ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void; testID?: string }) {
  if (onPress) {
    return (
      <ScalePressable testID={testID} onPress={onPress} scaleTo={0.98} style={[styles.card, style]} accessibilityRole="button">
        {children}
      </ScalePressable>
    );
  }
  return <View testID={testID} style={[styles.card, style]}>{children}</View>;
}

export function Avatar({ img, size = 48, ring }: { img: ImageKey; size?: number; ring?: boolean }) {
  return (
    <Image
      source={images[img]}
      style={{ width: size, height: size, borderRadius: size / 2, borderWidth: ring ? 3 : 0, borderColor: colors.white, backgroundColor: colors.surfaceAlt }}
    />
  );
}

export function Chip({ label, selected, onPress, testID, icon }: { label: string; selected?: boolean; onPress?: () => void; testID?: string; icon?: IconName }) {
  const fg = selected ? colors.white : colors.accentFill;
  return (
    <ScalePressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      style={[styles.chip, { backgroundColor: selected ? colors.accentFill : colors.accentTint }]}
    >
      {icon ? <Icon name={icon} size={14} color={fg} /> : null}
      <T variant="caption" style={{ color: fg, fontFamily: font.medium }}>{label}</T>
    </ScalePressable>
  );
}

const STATUS_TONE: Record<BookingStatus, { fg: string; bg: string }> = {
  requested: { fg: colors.warning, bg: colors.warningTint },
  accepted: { fg: colors.success, bg: colors.successTint },
  on_the_way: { fg: colors.accentFill, bg: colors.infoTint },
  in_progress: { fg: colors.accentFill, bg: colors.infoTint },
  completed: { fg: colors.text2, bg: colors.surfaceAlt },
};

export function StatusChip({ status }: { status: BookingStatus }) {
  const t = STATUS_TONE[status];
  return (
    <View style={[styles.status, { backgroundColor: t.bg }]}>
      <T variant="caption" style={{ color: t.fg, fontFamily: font.semibold }}>{STATUS_LABEL[status]}</T>
    </View>
  );
}

export function Rating({ value, count, color = colors.text }: { value: number; count?: number; color?: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Ionicons name="star" size={14} color={colors.star} />
      <T variant="caption" style={{ color, fontFamily: font.semibold }}>{value.toFixed(1)}</T>
      {count != null ? <T variant="caption" style={{ color: colors.text3 }}>({count})</T> : null}
    </View>
  );
}

export function Stars({ value, size = 40, onChange }: { value: number; size?: number; onChange?: (v: number) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <ScalePressable key={i} testID={`star-${i}`} onPress={() => onChange?.(i)} accessibilityLabel={`${i} stars`}>
          <Ionicons name={i <= value ? 'star' : 'star-outline'} size={size} color={colors.star} />
        </ScalePressable>
      ))}
    </View>
  );
}

export function Section({ title, action, onAction, children, style }: { title: string; action?: string; onAction?: () => void; children?: ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ marginTop: 24 }, style]}>
      <View style={styles.sectionHead}>
        <T variant="title">{title}</T>
        {action ? <T variant="label" onPress={onAction} style={{ color: colors.accentFill }}>{action}</T> : null}
      </View>
      {children}
    </View>
  );
}

export function IconButton({ icon, onPress, testID, label, tint }: { icon: IconName; onPress?: () => void; testID?: string; label: string; tint?: boolean }) {
  return (
    <ScalePressable testID={testID} onPress={onPress} accessibilityRole="button" accessibilityLabel={label} style={[styles.iconBtn, tint && { backgroundColor: colors.accentTint }]}>
      <Icon name={icon} size={20} color={tint ? colors.accentFill : colors.text} />
    </ScalePressable>
  );
}

// Back arrow + Young Serif title + optional caption, used by every pushed screen.
export function BackHeader({ title, caption, right, testID = 'back' }: { title: string; caption?: string; right?: ReactNode; testID?: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <IconButton icon="arrow-left" label="Back" testID={testID} onPress={() => router.back()} />
      <View style={{ flex: 1 }}>
        <T variant="hero" numberOfLines={1}>{title}</T>
        {caption ? <T variant="caption">{caption}</T> : null}
      </View>
      {right}
    </View>
  );
}

export function Row({ icon, text, color = colors.text2 }: { icon: IconName; text: string; color?: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 }}>
      <Icon name={icon} size={16} color={colors.text3} />
      <T variant="label" style={{ color, flex: 1 }}>{text}</T>
    </View>
  );
}

export function Divider() {
  return <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 12 }} />;
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.card, padding: 16, ...shadow },
  chip: { height: 34, paddingHorizontal: 14, borderRadius: radius.pill, flexDirection: 'row', alignItems: 'center', gap: 6 },
  status: { paddingHorizontal: 10, height: 26, borderRadius: radius.pill, justifyContent: 'center', alignSelf: 'flex-start' },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', ...shadow },
});
