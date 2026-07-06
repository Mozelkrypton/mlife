import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';

export const newMemoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingTop: spacing.headerTop,
  },
  header: {
    marginBottom: spacing.xxl,
  },
  back: {
    marginBottom: spacing.md,
  },
  backText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  headerTitle: {
    ...typography.appTitle,
    color: colors.textPrimary,
  },
});
