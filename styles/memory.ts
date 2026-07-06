import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../constants/theme';

export const memoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 60,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  errorText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  backBtn: {
    backgroundColor: colors.black,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  backBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  header: {
    position: 'absolute',
    top: spacing.headerTop,
    left: spacing.lg,
    zIndex: 10,
  },
  back: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
  backText: {
    color: colors.white,
    fontSize: 14,
  },
  photoBg: {
    width: '100%',
    height: 260,
    backgroundColor: colors.yearColors[0],
  },
  body: {
    padding: spacing.xl,
  },
  title: {
    ...typography.appTitle,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  tags: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  tag: {
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  tagText: {
    ...typography.small,
    color: colors.textSecondary,
  },
  note: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
});
