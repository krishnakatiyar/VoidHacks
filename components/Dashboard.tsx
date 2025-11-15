import React, { useState, useEffect, useCallback } from 'react';
import { Patient, PredictionStatus } from '../types';
import PatientForm from './PatientForm';
import PatientListItem from './PatientListItem';
import { addPatient as apiAddPatient, getPatients as apiGetPatients, subscribeToPatientUpdates } from '../services/mockApi';
import { PlusIcon } from './icons/PlusIcon';
import Spinner from './Spinner';
import { SearchIcon } from './icons/SearchIcon';
import EmptyState from './EmptyState';

const Dashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<PredictionStatus | 'all'>('all');


  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      const initialPatients = await apiGetPatients();
      setPatients(initialPatients);
      setIsLoading(false);
    };
    fetchPatients();

    const unsubscribe = subscribeToPatientUpdates((updatedPatient) => {
      setPatients(prevPatients =>
        prevPatients.map(p => p.id === updatedPatient.id ? updatedPatient : p)
      );
    });

    return () => unsubscribe();
  }, []);
  
  const handleAddPatient = useCallback(async (newPatient: Omit<Patient, 'id' | 'status' | 'submittedAt'>) => {
    const addedPatient = await apiAddPatient(newPatient);
    setPatients(prev => [addedPatient, ...prev]);
    setIsFormVisible(false);
  }, []);

  const filterButtons = [
    { label: 'All', value: 'all' },
    { label: 'Complete', value: PredictionStatus.Complete },
    { label: 'Processing', value: PredictionStatus.Processing },
    { label: 'Error', value: PredictionStatus.Error },
  ]

  const filteredPatients = patients
    .filter(p => filterStatus === 'all' || p.status === filterStatus)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-brand-secondary">Patient Dashboard</h1>
            <p className="mt-1 text-text-secondary">Manage and review patient analysis results.</p>
        </div>
        <button
          onClick={() => setIsFormVisible(prev => !prev)}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-all duration-200"
        >
          <PlusIcon className={`h-5 w-5 mr-2 transition-transform duration-300 ${isFormVisible ? 'rotate-45' : ''}`}/>
          {isFormVisible ? 'Cancel Submission' : 'New Patient Record'}
        </button>
      </div>

      {isFormVisible && <PatientForm onAddPatient={handleAddPatient} />}

      <div className="space-y-6">
        <div className="bg-white shadow-card rounded-xl p-4 sm:p-6 flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:max-w-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                type="text"
                placeholder="Search patient by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-slate-300 pl-10 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm"
                />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
                {filterButtons.map(({label, value}) => (
                    <button 
                        key={value} 
                        onClick={() => setFilterStatus(value)}
                        className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${filterStatus === value ? 'bg-brand-primary text-white' : 'bg-slate-100 text-text-secondary hover:bg-slate-200'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner className="h-8 w-8 text-brand-primary"/>
          </div>
        ) : filteredPatients.length > 0 ? (
          <ul className="grid grid-cols-1 gap-5">
            {filteredPatients.sort((a,b) => b.submittedAt.getTime() - a.submittedAt.getTime()).map(patient => (
              <PatientListItem key={patient.id} patient={patient} />
            ))}
          </ul>
        ) : (
          <div className="bg-white rounded-xl shadow-card">
            <EmptyState onAddPatient={() => setIsFormVisible(true)} hasFilter={filterStatus !== 'all' || searchTerm !== ''} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;