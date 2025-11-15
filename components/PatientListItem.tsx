import React, { useState } from 'react';
import { Patient, PredictionStatus } from '../types';
import { BrainIcon } from './icons/BrainIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import Spinner from './Spinner';


interface PatientListItemProps {
  patient: Patient;
}

const getStatusClasses = (status: PredictionStatus) => {
  switch (status) {
    case PredictionStatus.Processing:
      return {
        chip: 'bg-yellow-100 text-yellow-800 ring-yellow-600/20',
        text: 'text-status-processing',
        border: 'border-status-processing',
      };
    case PredictionStatus.Complete:
       return {
        chip: 'bg-green-100 text-green-800 ring-green-600/20',
        text: 'text-status-complete',
        border: 'border-status-complete',
      };
    case PredictionStatus.Error:
      return {
        chip: 'bg-red-100 text-red-800 ring-red-600/20',
        text: 'text-status-error',
        border: 'border-status-error',
      };
    default:
      return {
        chip: 'bg-slate-100 text-slate-800 ring-slate-500/20',
        text: 'text-slate-500',
        border: 'border-slate-400',
      };
  }
};

const PatientListItem: React.FC<PatientListItemProps> = ({ patient }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusClasses = getStatusClasses(patient.status);

  return (
    <li className={`bg-white rounded-xl shadow-card transition-all duration-300 hover:shadow-card-hover border-l-4 ${statusClasses.border}`}>
      <div className="flex items-center justify-between cursor-pointer p-4" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center">
            <div className="flex-shrink-0">
                <p className="text-md font-semibold text-brand-primary">{patient.name}</p>
                <p className="text-sm text-text-secondary">
                    ID: {patient.id.substring(0, 8)}... &bull; Submitted: {patient.submittedAt.toLocaleDateString()}
                </p>
            </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6 ml-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${statusClasses.chip}`}>
                {patient.status}
            </span>
             <div className="text-right hidden sm:block">
                <p className={`text-md font-semibold ${patient.prediction ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {patient.prediction || 'Awaiting'}
                </p>
                 <p className="text-xs text-text-secondary">Prediction</p>
            </div>
            <svg className={`w-5 h-5 text-slate-400 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </div>
      </div>

      <div className={`transition-[max-height,padding] duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px] pb-4' : 'max-h-0'}`}>
        <div className="px-4">
          <div className="bg-slate-50/75 p-4 rounded-lg border border-slate-200/80">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                
                  {/* Clinical Data */}
                  <div className="space-y-4">
                    <div className="flex items-center text-brand-secondary">
                        <ClipboardListIcon className="h-5 w-5 mr-3" />
                        <h4 className="text-md font-semibold">Clinical Data</h4>
                    </div>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm pl-8">
                        <li><strong className="font-medium text-text-primary">Age:</strong> <span className="text-text-secondary">{patient.clinicalData.age}</span></li>
                        <li><strong className="font-medium text-text-primary">Sex:</strong> <span className="text-text-secondary">{patient.clinicalData.sex}</span></li>
                        <li><strong className="font-medium text-text-primary">MMSE:</strong> <span className="text-text-secondary">{patient.clinicalData.mmse}</span></li>
                        <li><strong className="font-medium text-text-primary">CDR:</strong> <span className="text-text-secondary">{patient.clinicalData.cdr}</span></li>
                        <li><strong className="font-medium text-text-primary">eTIV:</strong> <span className="text-text-secondary">{patient.clinicalData.etiv}</span></li>
                        <li><strong className="font-medium text-text-primary">nWBV:</strong> <span className="text-text-secondary">{patient.clinicalData.nwbv}</span></li>
                        <li className="col-span-2"><strong className="font-medium text-text-primary">ASF:</strong> <span className="text-text-secondary">{patient.clinicalData.asf}</span></li>
                    </ul>
                  </div>
                  
                  {/* Gemini Summary */}
                  <div className={`space-y-4 ${!patient.geminiSummary && 'hidden'}`}>
                    <div className="flex items-center text-brand-secondary">
                        <SparklesIcon className="h-5 w-5 mr-3 text-yellow-500" />
                        <h4 className="text-md font-semibold">Gemini AI Summary</h4>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed pl-8">
                        {patient.geminiSummary || 'Summary not available.'}
                    </p>
                  </div>

                  {/* Prediction */}
                   <div className="lg:col-span-2 pt-4 border-t border-slate-200/80">
                    <div className="flex items-center text-brand-secondary mb-2">
                        <BrainIcon className="h-5 w-5 mr-3"/>
                        <h4 className="text-md font-semibold">Model Prediction</h4>
                    </div>
                    <div className="pl-8">
                        {patient.status === PredictionStatus.Complete ? (
                            <p className={`text-lg font-bold ${statusClasses.text}`}>{patient.prediction}</p>
                        ) : patient.status === PredictionStatus.Processing ? (
                            <p className="text-sm text-text-secondary flex items-center"><Spinner className="h-4 w-4 mr-2" />Prediction is being processed by the AI model...</p>
                        ) : (
                           <p className={`text-sm font-semibold ${statusClasses.text}`}>An error occurred during analysis.</p>
                        )}
                    </div>
                   </div>
              </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PatientListItem;