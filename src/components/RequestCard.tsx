import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from './Card';
import { PrimaryButton } from './PrimaryButton';
import type { BloodRequest } from '../types';
import { COLORS } from '../theme/colors';

interface RequestCardProps {
  request: BloodRequest;
  onAccept?: () => void;
  onViewDetails?: () => void;
  showActions?: boolean;
}

const statusColors: Record<string, string> = {
  searching: COLORS.warning,
  matched: COLORS.primary,
  fulfilled: COLORS.success,
};

export function RequestCard({
  request,
  onAccept,
  onViewDetails,
  showActions = true,
}: RequestCardProps) {
  const statusColor = statusColors[request.status] || COLORS.textSecondary;

  return (
    <Card>
      <View style={styles.row}>
        <Text style={styles.patientName}>{request.patientName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </Text>
        </View>
      </View>
      <Text style={styles.bloodGroup}>Blood: {request.bloodGroup}</Text>
      {request.distance != null && (
        <Text style={styles.distance}>Distance: {request.distance} km</Text>
      )}
      <Text style={styles.hospital}>{request.hospital}</Text>
      {showActions && (onAccept || onViewDetails) && (
        <View style={styles.actions}>
          {onAccept && (
            <PrimaryButton
              title="Accept"
              onPress={onAccept}
              style={styles.acceptButton}
            />
          )}
          {onViewDetails && (
            <TouchableOpacity onPress={onViewDetails} style={styles.detailsButton}>
              <Text style={styles.detailsText}>View Details</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bloodGroup: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  distance: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  hospital: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  acceptButton: {
    flex: 1,
  },
  detailsButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  detailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
