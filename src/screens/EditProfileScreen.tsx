import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { InputField, PrimaryButton } from '../components';
import { useAuth } from '../context/AuthContext';
import { BLOOD_GROUPS } from '../data/mockData';
import { COLORS } from '../theme/colors';

export function EditProfileScreen() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.name ?? '');
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup ?? '');
  const [lastDonation, setLastDonation] = useState(user?.lastDonation ?? '');
  const [nextEligibleDays, setNextEligibleDays] = useState(
    user?.nextEligibleDays != null ? String(user.nextEligibleDays) : ''
  );
  const [showBloodDropdown, setShowBloodDropdown] = useState(false);

  const handleSave = () => {
    updateUser({
      name: name.trim() || undefined,
      bloodGroup: bloodGroup ? (bloodGroup as typeof user.bloodGroup) : undefined,
      lastDonation: lastDonation.trim() || undefined,
      nextEligibleDays: nextEligibleDays ? parseInt(nextEligibleDays, 10) : undefined,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <InputField
          label="Name"
          placeholder="Full name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Blood group</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowBloodDropdown(!showBloodDropdown)}
        >
          <Text style={bloodGroup ? styles.dropdownText : styles.dropdownPlaceholder}>
            {bloodGroup || 'Select blood group'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
        {showBloodDropdown && (
          <View style={styles.dropdownList}>
            {BLOOD_GROUPS.map((bg) => (
              <TouchableOpacity
                key={bg}
                style={styles.dropdownItem}
                onPress={() => {
                  setBloodGroup(bg);
                  setShowBloodDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{bg}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {user?.role === 'donor' && (
          <>
            <InputField
              label="Last donation (e.g. 2 months ago)"
              placeholder="2 months ago"
              value={lastDonation}
              onChangeText={setLastDonation}
            />
            <InputField
              label="Next eligible (days)"
              placeholder="20"
              value={nextEligibleDays}
              onChangeText={setNextEligibleDays}
              keyboardType="number-pad"
            />
          </>
        )}

        <PrimaryButton title="Save changes" onPress={handleSave} style={styles.saveButton} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: COLORS.text },
  placeholder: { width: 40 },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 6,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  dropdownText: { fontSize: 16, color: COLORS.text },
  dropdownPlaceholder: { fontSize: 16, color: COLORS.textSecondary },
  dropdownList: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownItemText: { fontSize: 16, color: COLORS.text },
  saveButton: { marginTop: 16 },
});
