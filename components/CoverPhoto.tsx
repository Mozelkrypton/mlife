import { View, Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { colors, spacing, radius, typography } from '../constants/theme';

type Props = {
  url: string | null;
  onPress: () => void;
  uploading?: boolean;
  height?: number;
};

export function CoverPhoto({ url, onPress, uploading = false, height = 200 }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.container, { height }]}>
      {url ? (
        <Image source={{ uri: url }} style={styles.image} contentFit="cover" />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>+ Add cover photo</Text>
        </View>
      )}
      {uploading && (
        <View style={styles.overlay}>
          <ActivityIndicator color={colors.white} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    backgroundColor: colors.yearColors[2],
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '500',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
