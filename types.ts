
export enum PatientSex {
  Male = 'Male',
  Female = 'Female',
}

export enum PredictionStatus {
  Processing = 'Processing',
  Complete = 'Complete',
  Error = 'Error',
}

export type ClinicalData = {
  age: number;
  sex: PatientSex;
  mmse: number;
  cdr: number;
  etiv: number;
  nwbv: number;
  asf: number;
};

export type Patient = {
  id: string;
  name: string;
  clinicalData: ClinicalData;
  mriFile: File;
  status: PredictionStatus;
  submittedAt: Date;
  prediction?: string;
  geminiSummary?: string;
};
