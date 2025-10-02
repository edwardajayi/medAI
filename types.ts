
export enum View {
  Doctor = 'Doctor',
  Patient = 'Patient',
}

export interface PatientHistoryItem {
  id: string;
  type: 'Consultation' | 'Lab Test' | 'Prescription' | 'Note';
  title: string;
  date: string;
  details: string;
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
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
