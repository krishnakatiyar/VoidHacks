import React from 'react';
import { PlusIcon } from './icons/PlusIcon';

const EmptyStateIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="240" height="160" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="40" y="24" width="160" height="112" rx="8" fill="#F3F4F6"/>
    <rect x="40" y="24" width="160" height="112" rx="8" stroke="#E5E7EB" strokeWidth="2"/>
    <path d="M104 70L116 82L136 62" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="120" cy="80" r="40" fill="#E5E7EB"/>
    <circle cx="120" cy="80" r="40" stroke="#D1D5DB" strokeWidth="2"/>
    <path d="M120 72V88" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M112 80H128" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);


interface EmptyStateProps {
  onAddPatient: () => void;
  hasFilter: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddPatient, hasFilter }) => {
  return (
    <div className="text-center py-16 px-6">
        <div className="inline-block">
            <EmptyStateIllustration />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-text-primary">
            {hasFilter ? 'No Matching Patients' : 'No Patient Records Yet'}
        </h3>
        <p className="mt-2 text-sm text-text-secondary max-w-sm mx-auto">
            {hasFilter 
                ? 'Try adjusting your search or filter criteria to find what you\'re looking for.' 
                : 'Get started by adding your first patient for analysis. Click the button below to begin.'}
        </p>
        {!hasFilter && (
            <button 
              onClick={onAddPatient} 
              className="mt-6 inline-flex items-center justify-center rounded-md border border-transparent bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-all duration-200"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Patient
            </button>
        )}
    </div>
  );
};

export default EmptyState;