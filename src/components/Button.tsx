import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors, font, radius } from '../theme/tokens';
import { Icon, type IconName } from './Icon';
import { ScalePressable } from './Pressable';
import { T } from './Text';

type Kind = 'primary' | 'secondary' | 'white' | 'ghost' | 'danger';

export function Button({ label, onPress, kind = 'primary', icon, iconRight, disabled, testID, style, small }: {
  label: string;
  onPress?: () => void;
  kind?: Kind;
  icon?: IconName;
  iconRight?: IconName;
  disabled?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  small?: boolean;
}) {
  const fg = kind === 'primary' ? colors.white : kind === 'secondary' ? colors.text : kind === 'danger' ? colors.danger : colors.accentFill;
  return (
    <ScalePressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      containerStyle={style}
      style={[styles.base, small && styles.small, styles[kind], disabled && { opacity: 0.4 }]}
    >
      <View style={styles.row}>
        {icon ? <Icon name={icon} size={small ? 16 : 18} color={fg} /> : null}
        <T variant="label" style={{ color: fg, fontFamily: font.semibold, fontSize: small ? 14 : 16 }}>{label}</T>
        {iconRight ? <Icon name={iconRight} size={small ? 16 : 18} color={fg} /> : null}
      </View>
    </ScalePressable>
  );
}

const styles = StyleSheet.create({
  base: { height: 56, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  small: { height: 44, paddingHorizontal: 18 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  primary: { backgroundColor: colors.accentFill },
  secondary: { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.borderStrong },
  white: { backgroundColor: colors.white },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: 'transparent' },
});
