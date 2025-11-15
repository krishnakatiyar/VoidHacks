import { Patient, PredictionStatus, PatientSex } from '../types';

let patients: Patient[] = [];
let updateListeners: ((patient: Patient) => void)[] = [];

const PREDICTIONS = ['Non Demented', 'Very Mild Demented', 'Mild Demented', 'Moderate Demented'];

// Simulate initial data load
const createInitialData = () => {
  const patient1: Patient = {
    id: 'f9c8b3a4-1e5d-4f6b-8c7a-9d2e1f3a5b6c',
    name: 'Jane Smith',
    clinicalData: { age: 80, sex: PatientSex.Female, mmse: 20, cdr: 1.0, etiv: 1850, nwbv: 0.68, asf: 0.95 },
    mriFile: new File([], 'mri_001.nii'),
    status: PredictionStatus.Complete,
    submittedAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    prediction: 'Mild Demented',
    geminiSummary: 'Patient presents with values indicating moderate cognitive impairment, notably an MMSE score of 20. The CDR of 1.0 is consistent with mild dementia. Brain volume metrics should be compared with normative data for this demographic.'
  };

  const patient2: Patient = {
    id: 'a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
    name: 'Robert Johnson',
    clinicalData: { age: 68, sex: PatientSex.Male, mmse: 26, cdr: 0.5, etiv: 1950, nwbv: 0.71, asf: 0.91 },
    mriFile: new File([], 'mri_002.nii'),
    status: PredictionStatus.Processing,
    submittedAt: new Date(Date.now() - 86400000), // 1 day ago
    prediction: undefined,
    geminiSummary: 'Patient presents with age as a notable factor. MMSE score is borderline, and CDR of 0.5 suggests very mild cognitive impairment. Brain volume metrics appear within a normal range but require further contextual analysis.'
  };

  patients.push(patient2, patient1);
};

createInitialData();


export const getPatients = (): Promise<Patient[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve([...patients]), 500);
  });
};

export const addPatient = (newPatientData: Omit<Patient, 'id' | 'status' | 'submittedAt'>): Promise<Patient> => {
  return new Promise(resolve => {
    const newPatient: Patient = {
      ...newPatientData,
      id: crypto.randomUUID(),
      status: PredictionStatus.Processing,
      submittedAt: new Date(),
    };

    patients = [newPatient, ...patients];
    
    // Simulate the async prediction process from Cloud Run
    setTimeout(() => {
      const prediction = PREDICTIONS[Math.floor(Math.random() * PREDICTIONS.length)];
      const updatedPatient = { ...newPatient, status: PredictionStatus.Complete, prediction };
      
      patients = patients.map(p => p.id === updatedPatient.id ? updatedPatient : p);
      
      // Notify listeners about the update
      updateListeners.forEach(listener => listener(updatedPatient));

    }, 8000 + Math.random() * 5000); // Simulate 8-13 seconds processing time

    resolve(newPatient);
  });
};

export const subscribeToPatientUpdates = (callback: (patient: Patient) => void): (() => void) => {
  updateListeners.push(callback);
  
  // Return an unsubscribe function
  return () => {
    updateListeners = updateListeners.filter(listener => listener !== callback);
  };
};