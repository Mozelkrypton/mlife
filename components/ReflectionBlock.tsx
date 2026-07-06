import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../constants/theme';

type Props = {
  text: string | null;
};

export function ReflectionBlock({ text }: Props) {
  if (!text) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Reflection</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  label: {
    ...typography.sectionLabel,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  text: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
