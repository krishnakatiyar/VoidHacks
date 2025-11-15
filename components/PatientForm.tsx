import React, { useState, useCallback } from 'react';
import { Patient, ClinicalData, PatientSex } from '../types';
import { generateClinicalSummary } from '../services/geminiService';
import Spinner from './Spinner';

interface PatientFormProps {
  onAddPatient: (patient: Omit<Patient, 'id' | 'status' | 'submittedAt'>) => Promise<void>;
}

const PatientForm: React.FC<PatientFormProps> = ({ onAddPatient }) => {
  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState(75);
  const [sex, setSex] = useState<PatientSex>(PatientSex.Male);
  const [mmse, setMmse] = useState(23);
  const [cdr, setCdr] = useState(0.5);
  const [etiv, setEtiv] = useState(1987);
  const [nwbv, setNwbv] = useState(0.696);
  const [asf, setAsf] = useState(0.883);
  const [mriFile, setMriFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMriFile(e.target.files[0]);
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mriFile) {
      setError('MRI scan file is required.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const clinicalData: ClinicalData = { age, sex, mmse, cdr, etiv, nwbv, asf };

    try {
      const summary = await generateClinicalSummary(clinicalData);
      
      const newPatientData = {
        name,
        clinicalData,
        mriFile,
        geminiSummary: summary,
      };

      await onAddPatient(newPatientData);
      
      // Reset form could be done here if desired
      // setName(''); ... etc.

    } catch (err) {
      console.error("Submission failed:", err);
      setError('Failed to submit patient data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [name, age, sex, mmse, cdr, etiv, nwbv, asf, mriFile, onAddPatient]);

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary sm:text-sm transition-colors";

  return (
    <div className="bg-white p-8 rounded-xl shadow-card mb-8 animate-slide-down">
      <h3 className="text-xl font-bold text-text-primary mb-6">Submit New Patient Record</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Patient Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-slate-700">Age</label>
            <input type="number" id="age" value={age} onChange={e => setAge(parseInt(e.target.value))} required className={inputClass} />
          </div>
          <div>
            <label htmlFor="sex" className="block text-sm font-medium text-slate-700">Sex</label>
            <select id="sex" value={sex} onChange={e => setSex(e.target.value as PatientSex)} required className={inputClass}>
              <option value={PatientSex.Male}>Male</option>
              <option value={PatientSex.Female}>Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="mmse" className="block text-sm font-medium text-slate-700">MMSE</label>
            <input type="number" step="1" id="mmse" value={mmse} onChange={e => setMmse(parseInt(e.target.value))} required className={inputClass} />
          </div>
          <div>
            <label htmlFor="cdr" className="block text-sm font-medium text-slate-700">CDR</label>
            <input type="number" step="0.5" id="cdr" value={cdr} onChange={e => setCdr(parseFloat(e.target.value))} required className={inputClass} />
          </div>
          <div>
            <label htmlFor="etiv" className="block text-sm font-medium text-slate-700">eTIV</label>
            <input type="number" id="etiv" value={etiv} onChange={e => setEtiv(parseInt(e.target.value))} required className={inputClass} />
          </div>
          <div>
            <label htmlFor="nwbv" className="block text-sm font-medium text-slate-700">nWBV</label>
            <input type="number" step="0.001" id="nwbv" value={nwbv} onChange={e => setNwbv(parseFloat(e.target.value))} required className={inputClass} />
          </div>
          <div>
            <label htmlFor="asf" className="block text-sm font-medium text-slate-700">ASF</label>
            <input type="number" step="0.001" id="asf" value={asf} onChange={e => setAsf(parseFloat(e.target.value))} required className={inputClass} />
          </div>
           <div className="md:col-span-2 lg:col-span-1">
            <label htmlFor="mriFile" className="block text-sm font-medium text-slate-700">MRI/CT Scan (.nii)</label>
            <input type="file" id="mriFile" onChange={handleFileChange} accept=".nii" required className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 transition-colors duration-200" />
          </div>
        </div>
        
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end">
          <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center rounded-md border border-transparent bg-brand-primary px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200">
            {isSubmitting ? <><Spinner className="-ml-1 mr-3 h-5 w-5 text-white" /> Submitting...</> : 'Submit for Analysis'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;