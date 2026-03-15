import React from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { DonorDashboardScreen } from './DonorDashboardScreen';
import { RecipientDashboardScreen } from './RecipientDashboardScreen';
import { AdminDashboardScreen } from './AdminDashboardScreen';

export function DashboardScreen() {
  const { user } = useAuth();
  const role = user?.role ?? 'donor';

  if (role === 'donor') return <DonorDashboardScreen />;
  if (role === 'recipient') return <RecipientDashboardScreen />;
  return <AdminDashboardScreen />;
}
