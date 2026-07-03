import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { useMemories } from '../../hooks/useMemories';
import { supabase } from '../../lib/supabase';
import { Memory } from '../../types';

export default function YearScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: memories, isLoading } = useMemories(id);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [reflection, setReflection] = useState('');

  async function saveReflection() {
    await supabase.from('years').update({ title, reflection }).eq('id', id);
    setEditing(false);
    Alert.alert('Saved!');
  }

  function renderMemory({ item }: { item: Memory }) {
    return (
      <Pressable style={styles.memCard} onPress={() => router.push(`/memory/${item.id}`)}>
        <View style={[styles.memThumb, { backgroundColor: '#c9bfb3' }]} />
        <View style={styles.memBody}>
          <Text style={styles.memTitle}>{item.title}</Text>
          {item.location && <Text style={styles.memMeta}>{item.location}</Text>}
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        {editing ? (
          <View style={styles.editBlock}>
            <TextInput
              style={styles.input}
              placeholder="Chapter title…"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Write your reflection for this year…"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={reflection}
              onChangeText={setReflection}
              multiline
            />
            <Pressable style={styles.saveBtn} onPress={saveReflection}>
              <Text style={styles.saveBtnText}>Save</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={() => setEditing(true)}>
            <Text style={styles.headerTitle}>{title || 'Tap to add a title'}</Text>
            <Text style={styles.headerReflection}>{reflection || 'Tap to write your reflection…'}</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.body}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionLabel}>Memories</Text>
          <Pressable onPress={() => router.push(`/memory/new?yearId=${id}`)}>
            <Text style={styles.addBtn}>+ Add</Text>
          </Pressable>
        </View>

        {isLoading ? (
          <ActivityIndicator color="#0a0a0a" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={memories}
            keyExtractor={item => item.id}
            renderItem={renderMemory}
            contentContainerStyle={{ gap: 10, paddingBottom: 40 }}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No memories yet — add your first one!</Text>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#0a0a0a', padding: 24, paddingTop: 56, paddingBottom: 28 },
  back: { marginBottom: 16 },
  backText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  headerTitle: { fontSize: 24, fontWeight: '500', color: '#fff', marginBottom: 8 },
  headerReflection: { fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 20 },
  editBlock: { gap: 10 },
  input: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: 12, color: '#fff', fontSize: 14 },
  textArea: { height: 100, textAlignVertical: 'top' },
  saveBtn: { backgroundColor: '#fff', borderRadius: 10, padding: 12, alignItems: 'center' },
  saveBtnText: { color: '#0a0a0a', fontWeight: '500' },
  body: { flex: 1, padding: 16 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionLabel: { fontSize: 13, fontWeight: '500', color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 },
  addBtn: { fontSize: 14, fontWeight: '500', color: '#0a0a0a' },
  memCard: { flexDirection: 'row', gap: 12, backgroundColor: '#f9f9f7', borderRadius: 12, overflow: 'hidden', borderWidth: 0.5, borderColor: '#e8e8e4' },
  memThumb: { width: 72, height: 72 },
  memBody: { flex: 1, justifyContent: 'center', paddingRight: 12 },
  memTitle: { fontSize: 14, fontWeight: '500', color: '#0a0a0a' },
  memMeta: { fontSize: 12, color: '#888', marginTop: 3 },
  emptyText: { color: '#aaa', fontSize: 13, textAlign: 'center', marginTop: 40 },
});
