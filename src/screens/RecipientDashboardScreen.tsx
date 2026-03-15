import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, RequestCard, PrimaryButton, RequestDetailSheet } from '../components';
import { useAuth } from '../context/AuthContext';
import { recipientRequests } from '../data/mockData';
import type { BloodRequest } from '../types';
import { COLORS } from '../theme/colors';

export function RecipientDashboardScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name ?? 'User'}</Text>
          <Text style={styles.subtitle}>Request or track blood</Text>
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
        <View style={styles.ctaCard}>
          <View style={styles.ctaIconWrap}>
            <Ionicons name="water" size={28} color={COLORS.primary} />
          </View>
          <View style={styles.ctaText}>
            <Text style={styles.ctaTitle}>Need blood?</Text>
            <Text style={styles.ctaSubtitle}>Create a request for yourself or a patient</Text>
          </View>
          <PrimaryButton title="Request Blood" onPress={() => {}} style={styles.ctaButton} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent requests</Text>
        </View>
        {recipientRequests.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedRequest(item);
              setDetailVisible(true);
            }}
          >
            <RequestCard request={item} showActions={false} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <RequestDetailSheet
        request={selectedRequest}
        visible={detailVisible}
        onClose={() => setDetailVisible(false)}
      />
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
  ctaCard: {
    marginHorizontal: 16,
    marginTop: 20,
    padding: 20,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ctaIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary + '18',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  ctaText: { marginBottom: 16 },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  ctaButton: {},
  sectionHeader: {
    marginHorizontal: 16,
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
});
