import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components';
import { useAuth } from '../context/AuthContext';
import { users } from '../data/mockData';
import { COLORS } from '../theme/colors';

export function AdminDashboardScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Admin</Text>
          <Text style={styles.subtitle}>Manage users and requests</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/profile')}
          >
            <Ionicons name="person-circle-outline" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { logout(); router.replace('/auth'); }}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconWrap}>
              <Ionicons name="people" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statLabel}>Total users</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconWrap}>
              <Ionicons name="heart" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Active donors</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconWrap}>
              <Ionicons name="document-text" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Requests today</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>User list</Text>
        </View>
        {users.map((item) => (
          <Card key={item.id} style={styles.userCard}>
            <View style={styles.userRow}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userMeta}>
                  {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
                  {item.bloodGroup && ` • ${item.bloodGroup}`}
                </Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionBtnTextVerify}>Verify</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionBtnTextSuspend}>Suspend</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: { padding: 4 },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32 },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionHeader: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  userCard: { marginHorizontal: 16 },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: { flex: 1 },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  userMeta: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  actions: { flexDirection: 'row', gap: 8 },
  actionBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  actionBtnTextVerify: { fontSize: 14, fontWeight: '600', color: COLORS.success },
  actionBtnTextSuspend: { fontSize: 14, fontWeight: '600', color: COLORS.warning },
});
