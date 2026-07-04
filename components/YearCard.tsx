import { Pressable, View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../constants/theme';
import { Year } from '../types';

type Props = {
  year: Year;
  onPress: () => void;
};

function getYearColor(year: number) {
  return colors.yearColors[year % colors.yearColors.length];
}

export function YearCard({ year, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={[styles.cover, { backgroundColor: getYearColor(year.year) }]}>
        <Text style={styles.yearNumber}>{year.year}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{year.title ?? 'Untitled chapter'}</Text>
        <Text style={styles.meta}>Tap to open</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  cover: {
    height: 90,
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  yearNumber: {
    ...typography.appTitle,
    color: colors.textOnDark,
  },
  body: {
    padding: spacing.md,
  },
  title: {
    ...typography.cardTitle,
    color: colors.textPrimary,
  },
  meta: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
