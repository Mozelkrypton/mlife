import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, radius, spacing, typography } from '../constants/theme';

type Props = TextInputProps & {
  label: string;
  multiline?: boolean;
};

export function Input({ label, multiline = false, ...props }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'auto'}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.small,
    fontWeight: '500',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 15,
    color: colors.textPrimary,
  },
  multiline: {
    height: 120,
  },
});
