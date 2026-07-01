import { View, Text, StyleSheet } from 'react-native';

export default function TimelineScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mlife</Text>
      <Text style={styles.subtitle}>Your years will appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '600', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#888' },
});