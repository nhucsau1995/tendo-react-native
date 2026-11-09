import type { ReactNode } from 'react';
import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, space } from '../theme/tokens';

type Props = { children: ReactNode; footer?: ReactNode; header?: ReactNode; testID?: string; contentStyle?: StyleProp<ViewStyle>; edgeless?: boolean };

export function Screen({ children, footer, testID, contentStyle, header, edgeless }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }} testID={testID}>
      {header ? <View style={{ paddingTop: insets.top + 8, paddingHorizontal: space.edge, paddingBottom: 8 }}>{header}</View> : null}
      <ScrollView
        contentContainerStyle={[{ paddingTop: header || edgeless ? 4 : insets.top + 12, paddingHorizontal: edgeless ? 0 : space.edge, paddingBottom: 24 }, contentStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      {footer ? (
        <View style={{ paddingHorizontal: space.edge, paddingBottom: Math.max(insets.bottom, 16), paddingTop: 12, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border }}>
          {footer}
        </View>
      ) : null}
    </View>
  );
}
