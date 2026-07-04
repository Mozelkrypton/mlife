import { Pressable, View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../constants/theme';
import { Memory } from '../types';

type Props = {
  memory: Memory;
  onPress: () => void;
};

export function MemoryThumb({ memory, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.thumb} />
      <View style={styles.body}>
        <Text style={styles.title}>{memory.title}</Text>
        {memory.location && <Text style={styles.meta}>{memory.location}</Text>}
        {memory.memory_date && (
          <Text style={styles.date}>{memory.memory_date}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  thumb: {
    width: 72,
    height: 72,
    backgroundColor: colors.yearColors[0],
  },
  body: {
    flex: 1,
    justifyContent: 'center',
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
  date: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});
