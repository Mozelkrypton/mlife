import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../constants/theme';

export const yearStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
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
  headerTitle: {
    ...typography.screenTitle,
    color: colors.textOnDark,
    marginBottom: spacing.sm,
  },
  headerReflection: {
    ...typography.caption,
    color: colors.textOnDarkMuted,
    lineHeight: 20,
  },
  editBlock: {
    gap: spacing.sm,
  },
  body: {
    flex: 1,
    padding: spacing.lg,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionLabel: {
    ...typography.sectionLabel,
    color: colors.textSecondary,
  },
  addLink: {
    ...typography.body,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  loader: {
    marginTop: 40,
  },
  list: {
    gap: spacing.sm,
    paddingBottom: 40,
  },
  emptyText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 40,
  },
});
