import { Patient, HealthMetric } from './types';

export const PATIENTS: Patient[] = [
  {
    id: 1,
    name: 'Jean Nsengiyumva',
    age: 42,
    gender: 'Male',
    diagnosis: 'Hypertension',
    allergies: ['Penicillin'],
    medications: [{ name: 'Lisinopril', dosage: '10mg daily' }],
    summary: 'Jean presents with recurring migraines and hypertension. Recent blood pressure readings are elevated. He reports high stress levels from his job. Recommended follow-up in 2 weeks to monitor blood pressure medication efficacy.',
    history: [
      { id: 'h1', type: 'Consultation', title: 'Hypertension Follow-up', date: '2024-07-15', details: 'BP: 145/92 mmHg. Patient reports stress.' },
      { id: 'h2', type: 'Prescription', title: 'Lisinopril 10mg', date: '2024-07-01', details: 'Prescribed for hypertension.' },
      { id: 'h3', type: 'Lab Test', title: 'Lipid Panel', date: '2024-06-20', details: 'Total Cholesterol: 210 mg/dL, LDL: 135 mg/dL.' },
      { id: 'h4', type: 'Note', title: 'Patient reports headaches', date: '2024-06-10', details: 'Advised to keep a headache diary.' },
    ],
    recommendations: [
      'Consider adding a low-dose diuretic.',
      'Recommend stress management techniques.',
      'Schedule a cardiac stress test.',
    ],
  },
  {
    id: 2,
    name: 'Marie Uwimana',
    age: 35,
    gender: 'Female',
    diagnosis: 'Type 2 Diabetes',
    allergies: ['None known'],
    medications: [{ name: 'Metformin', dosage: '500mg twice daily' }],
    summary: 'Marie is a type 2 diabetic, generally well-controlled. Recent A1c is 6.8%. She complains of occasional fatigue. Current medication includes Metformin. She is encouraged to continue her diet and exercise regimen.',
    history: [
      { id: 'h5', type: 'Lab Test', title: 'HbA1c', date: '2024-07-10', details: 'Result: 6.8%. Good control.' },
      { id: 'h6', type: 'Consultation', title: 'Diabetes Management', date: '2024-07-10', details: 'Discussed diet and exercise. Patient reports good compliance.' },
      { id: 'h7', type: 'Prescription', title: 'Metformin 500mg', date: '2024-04-05', details: 'Continue current dosage.' },
    ],
    recommendations: [
      'Check for potential iron deficiency.',
      'Refer to a nutritionist for diet review.',
      'Encourage regular foot examinations.',
    ],
  },
  {
    id: 3,
    name: 'Emmanuel Mugisha',
    age: 58,
    gender: 'Male',
    diagnosis: 'Asthma',
    allergies: ['None known'],
    medications: [{ name: 'Albuterol Inhaler', dosage: 'as needed' }],
    summary: 'Emmanuel has a history of asthma, well-managed with an inhaler. He visited for a routine check-up. Lung sounds are clear. No signs of acute distress. Reminded to use his rescue inhaler as needed and follow up if symptoms worsen.',
    history: [
      { id: 'h8', type: 'Consultation', title: 'Annual Check-up', date: '2024-07-18', details: 'Lungs clear to auscultation. No wheezing.' },
      { id: 'h9', type: 'Prescription', title: 'Albuterol Inhaler Refill', date: '2024-07-18', details: 'Refilled rescue inhaler.' },
    ],
    recommendations: [
        'Review inhaler technique.',
        'Consider a spirometry test at next visit.',
        'Discuss allergy testing options.'
    ]
  },
  {
    id: 4,
    name: 'Aline Umutesi',
    age: 29,
    gender: 'Female',
    diagnosis: 'Pregnancy (2nd Trimester)',
    allergies: ['None known'],
    medications: [{ name: 'Prenatal Vitamins', dosage: 'one daily' }],
    summary: 'Aline is in her second trimester of pregnancy. All vitals are stable. Fetal heartbeat is strong. She reports mild edema in her ankles. Advised to elevate legs and monitor for any sudden swelling or headaches.',
    history: [
        { id: 'h10', type: 'Consultation', title: 'Prenatal Visit (24 weeks)', date: '2024-07-20', details: 'Weight gain is appropriate. FHR normal.' },
        { id: 'h11', type: 'Lab Test', title: 'Glucose Tolerance Test', date: '2024-07-05', details: 'Passed, no signs of gestational diabetes.' },
    ],
    recommendations: [
        'Monitor blood pressure closely.',
        'Provide dietary advice for iron intake.',
        'Schedule next prenatal appointment in 4 weeks.',
    ]
  },
];


export const PATIENT_HEALTH_METRICS: HealthMetric[] = [
    { label: 'Recent Blood Pressure', value: '122/78', unit: 'mmHg', trend: 'stable' },
    { label: 'Glucose Level', value: '95', unit: 'mg/dL', trend: 'stable' },
    { label: 'Heart Rate', value: '72', unit: 'bpm', trend: 'down' },
    { label: 'Next Appointment', value: 'Aug 15', unit: '2024', trend: 'stable' },
];