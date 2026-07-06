import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../constants/theme';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.headerBg,
    padding: spacing.xl,
    paddingTop: spacing.headerTop,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.yearColors[1],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '500',
    color: colors.white,
  },
  email: {
    ...typography.caption,
    color: colors.textOnDarkMuted,
  },
  body: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  sectionLabel: {
    ...typography.sectionLabel,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  rowLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  rowValue: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
