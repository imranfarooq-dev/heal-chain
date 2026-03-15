import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, InteractionManager } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import { COLORS } from '../src/theme/colors';

export default function IndexScreen() {
  const router = useRouter();
  const { hasSeenOnboarding, user } = useAuth();

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      if (!hasSeenOnboarding) {
        router.replace('/onboarding');
      } else if (!user) {
        router.replace('/auth');
      } else {
        router.replace('/dashboard');
      }
    });
    return () => task.cancel();
  }, [hasSeenOnboarding, user]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
