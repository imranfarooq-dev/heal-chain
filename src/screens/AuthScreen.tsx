import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputField, PrimaryButton } from '../components';
import { useAuth } from '../context/AuthContext';
import { BLOOD_GROUPS } from '../data/mockData';
import type { SignUpRole } from '../types';
import { COLORS } from '../theme/colors';

type Tab = 'login' | 'signup';

const SIGNUP_ROLES: { value: SignUpRole; label: string }[] = [
  { value: 'donor', label: 'Donor' },
  { value: 'recipient', label: 'Recipient' },
];

export function AuthScreen() {
  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [role, setRole] = useState<SignUpRole>('donor');
  const [showBloodDropdown, setShowBloodDropdown] = useState(false);

  const router = useRouter();
  const { login, signUp } = useAuth();

  const handleLogin = () => {
    if (!email.trim()) return;
    login(email.trim(), password);
    router.replace('/dashboard');
  };

  const handleSignUp = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !bloodGroup) {
      Alert.alert('Missing fields', 'Please fill all fields and select blood group.');
      return;
    }
    signUp(name, email, password, bloodGroup, role);
    router.replace('/dashboard');
  };

  const handleSubmit = () => {
    if (tab === 'login') handleLogin();
    else handleSignUp();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}
      >
        <Text style={styles.logo}>HEAL CHAIN</Text>
        <Text style={styles.subtitle}>Blood Donation Platform</Text>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, tab === 'login' && styles.tabActive]}
            onPress={() => setTab('login')}
          >
            <Text style={[styles.tabText, tab === 'login' && styles.tabTextActive]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === 'signup' && styles.tabActive]}
            onPress={() => setTab('signup')}
          >
            <Text style={[styles.tabText, tab === 'signup' && styles.tabTextActive]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.form}
          contentContainerStyle={styles.formContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {tab === 'signup' && (
            <InputField
              label="Name"
              placeholder="Full name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          )}

          <InputField
            label="Email"
            placeholder="email@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <InputField
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {tab === 'signup' && (
            <>
              <Text style={styles.label}>Blood Group</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowBloodDropdown(!showBloodDropdown)}
              >
                <Text style={bloodGroup ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {bloodGroup || 'Select blood group'}
                </Text>
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

              <Text style={styles.label}>I want to</Text>
              <View style={styles.roleRow}>
                {SIGNUP_ROLES.map((r) => (
                  <TouchableOpacity
                    key={r.value}
                    style={[styles.roleChip, role === r.value && styles.roleChipActive]}
                    onPress={() => setRole(r.value)}
                  >
                    <Text
                      style={[
                        styles.roleChipText,
                        role === r.value && styles.roleChipTextActive,
                      ]}
                    >
                      {r.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <PrimaryButton
            title={tab === 'login' ? 'Login' : 'Sign Up'}
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboard: {
    flex: 1,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 24,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 32,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 24,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  form: {
    flex: 1,
  },
  formContent: {
    padding: 24,
    paddingBottom: 48,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 6,
  },
  dropdown: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.text,
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
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
  dropdownItemText: {
    fontSize: 16,
    color: COLORS.text,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  roleChip: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  roleChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '15',
  },
  roleChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  roleChipTextActive: {
    color: COLORS.primary,
  },
  submitButton: {
    marginTop: 8,
  },
});
