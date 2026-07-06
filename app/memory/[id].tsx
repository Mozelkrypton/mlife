import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Memory } from '../../types';
import { memoryStyles as styles } from '../../styles/memory';

export default function MemoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [memory, setMemory] = useState<Memory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMemory() {
      const { data } = await supabase
        .from('memories')
        .select('*')
        .eq('id', id)
        .single();
      if (data) setMemory(data);
      setLoading(false);
    }
    loadMemory();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!memory) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Memory not found.</Text>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      </View>
      <View style={styles.photoBg} />
      <View style={styles.body}>
        <Text style={styles.title}>{memory.title}</Text>
        <View style={styles.tags}>
          {memory.location && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>📍 {memory.location}</Text>
            </View>
          )}
          {memory.memory_date && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>🗓 {memory.memory_date}</Text>
            </View>
          )}
        </View>
        {memory.note && <Text style={styles.note}>{memory.note}</Text>}
      </View>
    </ScrollView>
  );
}
