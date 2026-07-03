import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useYears, useCreateYear } from '../../hooks/useYears';
import { useAuth } from '../../hooks/useAuth';
import { Year } from '../../types';

export default function TimelineScreen() {
  const { user } = useAuth();
  const { data: years, isLoading } = useYears();
  const createYear = useCreateYear();

  async function handleAddYear() {
    const currentYear = new Date().getFullYear();
    if (years?.find(y => y.year === currentYear)) {
      router.push(`/year/${years.find(y => y.year === currentYear)?.id}`);
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

  function renderYear({ item }: { item: Year }) {
    return (
      <Pressable style={styles.card} onPress={() => router.push(`/year/${item.id}`)}>
        <View style={[styles.cardCover, { backgroundColor: getYearColor(item.year) }]}>
          <Text style={styles.cardYear}>{item.year}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{item.title ?? 'Untitled chapter'}</Text>
          <Text style={styles.cardMeta}>Tap to open</Text>
        </View>
      </Pressable>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0a0a0a" />
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
        keyExtractor={item => item.id}
        renderItem={renderYear}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No years yet</Text>
            <Text style={styles.emptySub}>Tap the button below to start your first chapter</Text>
          </View>
        }
      />

      <Pressable style={styles.fab} onPress={handleAddYear}>
        <Text style={styles.fabText}>+ Add {new Date().getFullYear()}</Text>
      </Pressable>
    </View>
  );
}

function getYearColor(year: number) {
  const colors = ['#c9bfb3', '#a8c4d4', '#c4a8b8', '#a8c4a8', '#d4c4a8', '#b8a8c4'];
  return colors[year % colors.length];
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#0a0a0a', padding: 24, paddingTop: 56 },
  headerTitle: { fontSize: 28, fontWeight: '600', color: '#fff' },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 },
  list: { padding: 16, gap: 12, paddingBottom: 100 },
  card: { backgroundColor: '#f9f9f7', borderRadius: 16, overflow: 'hidden', borderWidth: 0.5, borderColor: '#e8e8e4' },
  cardCover: { height: 90, justifyContent: 'flex-end', padding: 14 },
  cardYear: { fontSize: 28, fontWeight: '500', color: '#fff' },
  cardBody: { padding: 14 },
  cardTitle: { fontSize: 15, fontWeight: '500', color: '#0a0a0a' },
  cardMeta: { fontSize: 12, color: '#888', marginTop: 3 },
  empty: { alignItems: 'center', paddingTop: 80 },
  emptyTitle: { fontSize: 18, fontWeight: '500', color: '#0a0a0a', marginBottom: 8 },
  emptySub: { fontSize: 13, color: '#888', textAlign: 'center', paddingHorizontal: 32 },
  fab: { position: 'absolute', bottom: 80, right: 20, backgroundColor: '#0a0a0a', borderRadius: 24, paddingVertical: 12, paddingHorizontal: 20 },
  fabText: { color: '#fff', fontSize: 14, fontWeight: '500' },
});
