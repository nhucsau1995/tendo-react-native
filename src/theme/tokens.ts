// Tokens from design/DESIGN.md (palette P03, Tendo).
export const colors = {
  bg: '#FCF4F5',
  surface: '#FFFFFF',
  surfaceAlt: '#F8EAEC',
  accent: '#E60023',
  accentFill: '#CD001E',
  accentPressed: '#CA001F',
  accentTint: '#FCDBE0',
  support: '#5CC8A8',
  supportStrong: '#38A685',
  text: '#1F0C0F',
  text2: '#5A4549',
  text3: '#7A6468',
  border: '#EADADC',
  borderStrong: '#B4898B',
  white: '#FFFFFF',
  star: '#D97706',
  success: '#0E7C3A',
  successTint: '#E3F4E9',
  warning: '#A75906',
  warningTint: '#FAEFE1',
  danger: '#B91C1C',
  dangerTint: '#F7E4E4',
  infoTint: '#F9E0E4',
  onAccentChip: 'rgba(31,12,15,0.28)',
  gradient: ['#CD001E', '#CA001F'] as const,
};

export const font = {
  regular: 'Rubik_400Regular',
  medium: 'Rubik_500Medium',
  semibold: 'Rubik_600SemiBold',
  bold: 'Rubik_700Bold',
  display: 'YoungSerif_400Regular',
};

// Only the 5 type sizes from the design system (12 is the tab-label minimum).
export const size = { display: 32, title: 20, body: 16, label: 14, caption: 13, tab: 12 };

export const radius = { card: 20, control: 14, input: 12, pill: 999 };

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, edge: 20 };

export const shadow = {
  shadowColor: '#1F0C0F',
  shadowOpacity: 0.06,
  shadowRadius: 24,
  shadowOffset: { width: 0, height: 8 },
  elevation: 3,
};
