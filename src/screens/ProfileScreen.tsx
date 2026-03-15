import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, UserAvatar, PrimaryButton } from '../components';
import { useAuth } from '../context/AuthContext';
import { donors } from '../data/mockData';
import { COLORS } from '../theme/colors';

export function ProfileScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const donor = donors[0];
  const lastDonation = user?.lastDonation ?? donor?.lastDonation ?? '—';
  const nextEligible = user?.nextEligibleDays ?? donor?.nextEligibleDays ?? '—';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarSection}>
          <UserAvatar name={user?.name ?? 'User'} size={96} />
          <Text style={styles.name}>{user?.name ?? 'User'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>
              {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : '—'}
            </Text>
          </View>
        </View>

        <Card style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="water-outline" size={22} color={COLORS.primary} />
            <Text style={styles.label}>Blood group</Text>
            <Text style={styles.value}>{user?.bloodGroup ?? '—'}</Text>
          </View>
          {user?.role === 'donor' && (
            <>
              <View style={[styles.row, styles.rowBorder]}>
                <Ionicons name="calendar-outline" size={22} color={COLORS.primary} />
                <Text style={styles.label}>Last donation</Text>
                <Text style={styles.value}>{lastDonation}</Text>
              </View>
              <View style={styles.row}>
                <Ionicons name="time-outline" size={22} color={COLORS.primary} />
                <Text style={styles.label}>Next eligible</Text>
                <Text style={styles.value}>
                  {typeof nextEligible === 'number' ? `${nextEligible} days` : nextEligible}
                </Text>
              </View>
            </>
          )}
        </Card>

        <PrimaryButton
          title="Edit profile"
          onPress={() => router.push('/edit-profile')}
          style={styles.editButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: COLORS.text },
  placeholder: { width: 40 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32 },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 28,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 12,
  },
  email: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  roleBadge: {
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: COLORS.primary + '18',
    borderRadius: 20,
  },
  roleText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  card: { marginHorizontal: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  label: { fontSize: 15, color: COLORS.textSecondary, flex: 1 },
  value: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  editButton: { marginHorizontal: 16, marginTop: 24 },
});
