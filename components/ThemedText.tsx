import { Text, type TextProps, StyleSheet, Platform } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'pageHeader' | 'title' | 'defaultSemiBold' | 'subtitle' | 'smallSubtitle';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'pageHeader' ? styles.pageHeader : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'smallSubtitle' ? styles.smallSubtitle : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: Platform.OS === 'web' ? 16 : 14,
    lineHeight: Platform.OS === 'web' ? 24 : 18,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  pageHeader: {
    fontSize: Platform.OS === 'web' ? 48 : 36,
    fontWeight: 'bold',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 28 : 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 18 : 14,
    fontStyle: 'italic',
  },
  smallSubtitle: {
    lineHeight: 18,
    fontSize: 14,
    fontStyle: 'italic',
  },
});
