import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../constants/theme';

export const timelineStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: colors.headerBg,
    padding: spacing.xl,
    paddingTop: spacing.headerTop,
  },
  headerTitle: {
    ...typography.appTitle,
    color: colors.textOnDark,
  },
  headerSub: {
    ...typography.caption,
    color: colors.textOnDarkMuted,
    marginTop: spacing.xs,
  },
  list: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: 100,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    ...typography.screenTitle,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptySub: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.xxl,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: spacing.lg,
    backgroundColor: colors.black,
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  fabText: {
    color: colors.textOnDark,
    fontSize: 14,
    fontWeight: '500',
  },
});
