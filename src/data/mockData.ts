import type { Donor, BloodRequest, User } from '../types';

export const donors: Donor[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    bloodGroup: 'O+',
    lastDonation: '2 months ago',
    nextEligibleDays: 20,
  },
  {
    id: '2',
    name: 'Sara Khan',
    bloodGroup: 'B+',
    lastDonation: '1 month ago',
    nextEligibleDays: 45,
  },
  {
    id: '3',
    name: 'Omar Ali',
    bloodGroup: 'A+',
    lastDonation: '3 months ago',
    nextEligibleDays: 5,
  },
];

export const requests: BloodRequest[] = [
  {
    id: '1',
    patientName: 'Ali Khan',
    bloodGroup: 'O+',
    hospital: 'City Hospital',
    distance: 3,
    status: 'searching',
    createdAt: '2025-03-14T10:00:00Z',
    location: 'City Hospital, Block A, Emergency Wing, 3rd Floor',
    urgency: 'high',
    unitsNeeded: 2,
    contactPhone: '+92 300 1234567',
  },
  {
    id: '2',
    patientName: 'Fatima Ahmed',
    bloodGroup: 'B+',
    hospital: 'DHQ Hospital',
    distance: 5,
    status: 'searching',
    createdAt: '2025-03-14T09:30:00Z',
    location: 'DHQ Hospital, Main Building, ICU Section',
    urgency: 'critical',
    unitsNeeded: 1,
    contactPhone: '+92 321 9876543',
  },
  {
    id: '3',
    patientName: 'Hassan Raza',
    bloodGroup: 'A+',
    hospital: 'General Hospital',
    distance: 8,
    status: 'matched',
    createdAt: '2025-03-13T14:00:00Z',
    location: 'General Hospital, Ward 5, Room 12',
    urgency: 'medium',
    unitsNeeded: 1,
    contactPhone: '+92 333 5551234',
  },
];

export const recipientRequests: BloodRequest[] = [
  {
    id: '1',
    patientName: 'Self',
    bloodGroup: 'B+',
    hospital: 'DHQ Hospital',
    status: 'searching',
    createdAt: '2025-03-14T11:00:00Z',
    location: 'DHQ Hospital, Main Building, OPD Block',
    urgency: 'high',
    unitsNeeded: 1,
    contactPhone: '+92 300 1112233',
  },
  {
    id: '2',
    patientName: 'Family Member',
    bloodGroup: 'O-',
    hospital: 'City Hospital',
    status: 'fulfilled',
    createdAt: '2025-03-10T09:00:00Z',
    location: 'City Hospital, Block B, Ward 3',
    urgency: 'low',
    unitsNeeded: 2,
    contactPhone: '+92 321 4445566',
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Hassan',
    email: 'hassan@example.com',
    role: 'donor',
    bloodGroup: 'A+',
    lastDonation: '1 month ago',
    nextEligibleDays: 30,
  },
  {
    id: '2',
    name: 'Ayesha',
    email: 'ayesha@example.com',
    role: 'recipient',
    bloodGroup: 'B+',
  },
  {
    id: '3',
    name: 'Imran',
    email: 'imran@example.com',
    role: 'donor',
    bloodGroup: 'O+',
    lastDonation: '2 months ago',
    nextEligibleDays: 20,
  },
  {
    id: '4',
    name: 'Zainab',
    email: 'zainab@example.com',
    role: 'donor',
    bloodGroup: 'AB-',
    lastDonation: '3 months ago',
    nextEligibleDays: 0,
  },
];

export const BLOOD_GROUPS = [
  'A+',
  'A-',
  'B+',
  'B-',
  'O+',
  'O-',
  'AB+',
  'AB-',
] as const;
