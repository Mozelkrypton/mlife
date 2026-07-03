import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useCreateMemory } from '../../hooks/useMemories';
import { useAuth } from '../../hooks/useAuth';

export default function NewMemoryScreen() {
  const { yearId } = useLocalSearchParams<{ yearId: string }>();
  const { user } = useAuth();
  const createMemory = useCreateMemory();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert('Title required', 'Give this memory a name.');
      return;
    }
    setLoading(true);
    try {
      await createMemory.mutateAsync({
        user_id: user?.id,
        year_id: yearId,
        title: title.trim(),
        note: note.trim() || null,
        location: location.trim() || null,
        photo_url: null,
        memory_date: new Date().toISOString().split('T')[0],
      });
      router.back();
    } catch (err: any) {
      Alert.alert('Error', err.message ?? 'Could not save memory.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>New memory</Text>
      </View>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Give this memory a name…"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Note</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="What do you want to remember about this moment?"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Where were you?"
        value={location}
        onChangeText={setLocation}
      />

      <Pressable style={styles.button} onPress={handleSave} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Saving…' : 'Save memory'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, paddingTop: 56 },
  header: { marginBottom: 32 },
  backText: { color: '#888', fontSize: 14, marginBottom: 12 },
  headerTitle: { fontSize: 24, fontWeight: '600', color: '#0a0a0a' },
  label: { fontSize: 12, fontWeight: '500', color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6, marginTop: 16 },
  input: { backgroundColor: '#f4f4f2', borderRadius: 12, padding: 14, fontSize: 15, color: '#0a0a0a' },
  textArea: { height: 120, textAlignVertical: 'top' },
  button: { backgroundColor: '#0a0a0a', borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 32 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '500' },
});
