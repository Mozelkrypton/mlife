import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: {
    ...typography.appTitle,
    textAlign: 'center',
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl + spacing.md,
  },
  link: {
    marginTop: spacing.xl,
    alignSelf: 'center',
  },
  linkText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
});
