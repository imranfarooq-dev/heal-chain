import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheet } from './BottomSheet';
import { PrimaryButton } from './PrimaryButton';
import type { BloodRequest } from '../types';
import { COLORS } from '../theme/colors';

const URGENCY_LABELS: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

const URGENCY_COLORS: Record<string, string> = {
  low: COLORS.success,
  medium: COLORS.warning,
  high: COLORS.primary,
  critical: COLORS.error,
};

interface RequestDetailSheetProps {
  request: BloodRequest | null;
  visible: boolean;
  onClose: () => void;
  onAccept?: () => void;
  showAcceptButton?: boolean;
}

export function RequestDetailSheet({
  request,
  visible,
  onClose,
  onAccept,
  showAcceptButton = false,
}: RequestDetailSheetProps) {
  if (!request) return null;

  const urgencyColor = URGENCY_COLORS[request.urgency || 'medium'] || COLORS.warning;
  const formattedDate = request.createdAt
    ? new Date(request.createdAt).toLocaleDateString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '—';

  const handleCall = () => {
    if (request.contactPhone) {
      Linking.openURL(`tel:${request.contactPhone.replace(/\s/g, '')}`);
    }
  };

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.patientName}>{request.patientName}</Text>
          <View style={[styles.urgencyBadge, { backgroundColor: urgencyColor + '20' }]}>
            <Text style={[styles.urgencyText, { color: urgencyColor }]}>
              {URGENCY_LABELS[request.urgency || 'medium'] || 'Medium'} urgency
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Ionicons name="water" size={20} color={COLORS.primary} />
          <Text style={styles.label}>Blood group</Text>
          <Text style={styles.value}>{request.bloodGroup}</Text>
        </View>
        {request.unitsNeeded != null && (
          <View style={styles.row}>
            <Ionicons name="fitness" size={20} color={COLORS.primary} />
            <Text style={styles.label}>Units needed</Text>
            <Text style={styles.value}>{request.unitsNeeded}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
          <Text style={styles.label}>Requested</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>

        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.card}>
          <Ionicons name="location" size={22} color={COLORS.primary} style={styles.cardIcon} />
          <View style={styles.cardContent}>
            <Text style={styles.hospitalName}>{request.hospital}</Text>
            <Text style={styles.address}>
              {request.location || 'Address not specified'}
            </Text>
          </View>
        </View>

        {request.distance != null && (
          <View style={styles.row}>
            <Ionicons name="navigate" size={20} color={COLORS.primary} />
            <Text style={styles.label}>Distance</Text>
            <Text style={styles.value}>{request.distance} km away</Text>
          </View>
        )}

        {request.contactPhone && (
          <>
            <Text style={styles.sectionTitle}>Contact</Text>
            <TouchableOpacity style={styles.phoneRow} onPress={handleCall}>
              <Ionicons name="call" size={22} color={COLORS.primary} />
              <Text style={styles.phoneText}>{request.contactPhone}</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </>
        )}

        {showAcceptButton && onAccept && (
          <PrimaryButton
            title="Accept request"
            onPress={() => {
              onAccept();
              onClose();
            }}
            style={styles.acceptButton}
          />
        )}
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  patientName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  urgencyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  urgencyText: {
    fontSize: 13,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    flex: 1,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardIcon: {
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  phoneText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  acceptButton: {
    marginTop: 24,
  },
});
