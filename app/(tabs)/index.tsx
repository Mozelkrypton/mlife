import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useYears, useCreateYear } from '../../hooks/useYears';
import { useAuth } from '../../hooks/useAuth';
import { YearCard } from '../../components/YearCard';
import { colors, spacing, typography, radius } from '../../constants/theme';
import { Year } from '../../types';

export default function TimelineScreen() {
  const { user } = useAuth();
  const { data: years, isLoading } = useYears();
  const createYear = useCreateYear();
  const currentYear = new Date().getFullYear();

  async function handleAddYear() {
    const existing = years?.find(y => y.year === currentYear);
    if (existing) {
      router.push(`/year/${existing.id}`);
      return;
    }
    const newYear = await createYear.mutateAsync({
      user_id: user?.id,
      year: currentYear,
      title: null,
      reflection: null,
      cover_image_url: null,
    });
    router.push(`/year/${newYear.id}`);
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mlife</Text>
        <Text style={styles.headerSub}>Your life, chapter by chapter</Text>
      </View>

      <FlatList
        data={years}
        keyExtractor={(item: Year) => item.id}
        renderItem={({ item }) => (
          <YearCard year={item} onPress={() => router.push(`/year/${item.id}`)} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No years yet</Text>
            <Text style={styles.emptySub}>
              Tap the button below to start your first chapter
            </Text>
          </View>
        }
      />

      <Pressable style={styles.fab} onPress={handleAddYear}>
        <Text style={styles.fabText}>+ Add {currentYear}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
