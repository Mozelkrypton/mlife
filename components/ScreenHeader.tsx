import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, typography } from '../constants/theme';

type Props = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
};

export function ScreenHeader({ title, subtitle, showBack = false }: Props) {
  return (
    <View style={styles.container}>
      {showBack && (
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      )}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerBg,
    padding: spacing.xl,
    paddingTop: spacing.headerTop,
    paddingBottom: spacing.xl,
  },
  back: {
    marginBottom: spacing.lg,
  },
  backText: {
    color: colors.textOnDarkMuted,
    fontSize: 14,
  },
  title: {
    ...typography.appTitle,
    color: colors.textOnDark,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textOnDarkMuted,
    marginTop: spacing.xs,
  },
});
