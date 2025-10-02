export enum View {
  Doctor = 'Doctor',
  Patient = 'Patient',
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface PatientHistoryItem {
  id: string;
  type: 'Consultation' | 'Lab Test' | 'Prescription' | 'Note';
  title: string;
  date: string;
  details: string;
}

export interface Medication {
    name: string;
    dosage: string;
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  diagnosis: string;
  allergies: string[];
  medications: Medication[];
  summary: string;
  history: PatientHistoryItem[];
  recommendations: string[];
}

export interface HealthMetric {
    label: string;
    value: string;
    unit: string;
    trend: 'up' | 'down' | 'stable';
}