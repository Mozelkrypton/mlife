import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useEffect } from 'react';
import { useMemories } from '../../hooks/useMemories';
import { MemoryThumb } from '../../components/MemoryThumb';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { supabase } from '../../lib/supabase';
import { colors, spacing, typography, radius } from '../../constants/theme';
import { Memory } from '../../types';

export default function YearScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: memories, isLoading } = useMemories(id);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [reflection, setReflection] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadYear() {
      const { data } = await supabase.from('years').select('*').eq('id', id).single();
      if (data) {
        setTitle(data.title ?? '');
        setReflection(data.reflection ?? '');
      }
    }
    loadYear();
  }, [id]);

  async function handleSave() {
    setSaving(true);
    try {
      await supabase.from('years').update({ title, reflection }).eq('id', id);
      setEditing(false);
    } catch {
      Alert.alert('Error', 'Could not save changes.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        {editing ? (
          <View style={styles.editBlock}>
            <Input
              label="Chapter title"
              placeholder="Name this year…"
              value={title}
              onChangeText={setTitle}
            />
            <Input
              label="Reflection"
              placeholder="Write your reflection for this year…"
              value={reflection}
              onChangeText={setReflection}
              multiline
            />
            <Button label="Save" onPress={handleSave} loading={saving} variant="secondary" />
          </View>
        ) : (
          <Pressable onPress={() => setEditing(true)}>
            <Text style={styles.headerTitle}>
              {title || 'Tap to add a title'}
            </Text>
            <Text style={styles.headerReflection}>
              {reflection || 'Tap to write your reflection…'}
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.body}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionLabel}>Memories</Text>
          <Pressable onPress={() => router.push(`/memory/new?yearId=${id}`)}>
            <Text style={styles.addLink}>+ Add memory</Text>
          </Pressable>
        </View>

        {isLoading ? (
          <ActivityIndicator color={colors.black} style={styles.loader} />
        ) : (
          <FlatList
            data={memories}
            keyExtractor={(item: Memory) => item.id}
            renderItem={({ item }) => (
              <MemoryThumb
                memory={item}
                onPress={() => router.push(`/memory/${item.id}`)}
              />
            )}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No memories yet — add your first one!
              </Text>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.headerBg,
    padding: spacing.xl,
    paddingTop: spacing.headerTop,
    paddingBottom: spacing.xl,
  },
  back: {
    marginBottom: spacing.lg,
  },
  backText: {
    color: colors.textOnDarkMuted,
    fontSize: 14,
  },
  headerTitle: {
    ...typography.screenTitle,
    color: colors.textOnDark,
    marginBottom: spacing.sm,
  },
  headerReflection: {
    ...typography.caption,
    color: colors.textOnDarkMuted,
    lineHeight: 20,
  },
  editBlock: {
    gap: spacing.sm,
  },
  body: {
    flex: 1,
    padding: spacing.lg,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionLabel: {
    ...typography.sectionLabel,
    color: colors.textSecondary,
  },
  addLink: {
    ...typography.body,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  loader: {
    marginTop: 40,
  },
  list: {
    gap: spacing.sm,
    paddingBottom: 40,
  },
  emptyText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 40,
  },
});
