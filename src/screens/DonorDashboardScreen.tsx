import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, UserAvatar, RequestCard, RequestDetailSheet } from '../components';
import { useAuth } from '../context/AuthContext';
import { donors, requests } from '../data/mockData';
import type { BloodRequest } from '../types';
import { COLORS } from '../theme/colors';

export function DonorDashboardScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const donor = donors[0];
  const userBloodGroup = user?.bloodGroup || donor.bloodGroup;
  const lastDonation = user?.lastDonation ?? donor.lastDonation;
  const nextEligible = user?.nextEligibleDays ?? donor.nextEligibleDays;
  const nearbyRequests = requests.filter(
    (r) => r.status === 'searching' && (!userBloodGroup || r.bloodGroup === userBloodGroup)
  );

  const openDetail = (request: BloodRequest) => {
    setSelectedRequest(request);
    setDetailVisible(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <UserAvatar name={user?.name ?? 'Donor'} size={48} />
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.welcome}>{user?.name ?? 'Ahmed'}</Text>
          </View>
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
        <View style={styles.heroCard}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="water" size={32} color={COLORS.white} />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.heroLabel}>Your blood group</Text>
            <Text style={styles.heroValue}>{userBloodGroup}</Text>
          </View>
        </View>

        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="calendar" size={20} color={COLORS.primary} />
              <Text style={styles.statLabel}>Last donation</Text>
              <Text style={styles.statValue}>{lastDonation}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="time" size={20} color={COLORS.primary} />
              <Text style={styles.statLabel}>Next eligible</Text>
              <Text style={styles.statValue}>{nextEligible} days</Text>
            </View>
          </View>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby requests</Text>
          <Text style={styles.sectionSubtitle}>Matching your blood type</Text>
        </View>
        {nearbyRequests.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>No matching requests right now. Check back later.</Text>
          </Card>
        ) : (
          nearbyRequests.map((item) => (
            <RequestCard
              key={item.id}
              request={item}
              onAccept={() => {}}
              onViewDetails={() => openDetail(item)}
              showActions
            />
          ))
        )}
      </ScrollView>

      <RequestDetailSheet
        request={selectedRequest}
        visible={detailVisible}
        onClose={() => setDetailVisible(false)}
        onAccept={() => {}}
        showAcceptButton
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  greeting: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  welcome: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 20,
    padding: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    gap: 16,
  },
  heroIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {},
  heroLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  heroValue: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
  },
  statsCard: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 6,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 2,
  },
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
  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
