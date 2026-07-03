import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
};

export function Button({ label, onPress, loading = false, disabled = false, variant = 'primary' }: Props) {
  return (
    <Pressable
      style={[styles.base, variant === 'secondary' ? styles.secondary : styles.primary, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading
        ? <ActivityIndicator color={variant === 'primary' ? colors.white : colors.black} />
        : <Text style={[styles.label, variant === 'secondary' && styles.labelSecondary]}>{label}</Text>
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: colors.black,
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
  labelSecondary: {
    color: colors.black,
  },
});
