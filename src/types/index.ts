export type UserRole = 'donor' | 'recipient' | 'admin';

export type BloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'O+'
  | 'O-'
  | 'AB+'
  | 'AB-';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bloodGroup?: BloodGroup;
  lastDonation?: string;
  nextEligibleDays?: number;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  hospital: string;
  distance?: number;
  status: 'searching' | 'matched' | 'fulfilled';
  createdAt: string;
  location?: string;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  unitsNeeded?: number;
  contactPhone?: string;
}

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  lastDonation: string;
  nextEligibleDays: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bloodGroup?: BloodGroup;
  lastDonation?: string;
  nextEligibleDays?: number;
}

export type SignUpRole = 'donor' | 'recipient';
