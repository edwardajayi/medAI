
import React, { useState } from 'react';
import { PATIENTS } from '../constants';
import { Patient, PatientHistoryItem } from '../types';
import { SendIcon, CheckIcon, XIcon, UserIcon, StethoscopeIcon, PillIcon, TestTubeIcon, FileTextIcon, PlusIcon } from '../components/Icons';

const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className, title }) => (
    <div className={`bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg ${className}`}>
        {title && <h3 className="text-sm font-semibold text-sky-400 p-4 border-b border-slate-700">{title}</h3>}
        <div className="p-4">
            {children}
        </div>
    </div>
);

const HistoryIcon: React.FC<{type: PatientHistoryItem['type']}> = ({type}) => {
    const iconClass = "h-5 w-5 text-slate-400";
    switch(type) {
        case 'Consultation': return <StethoscopeIcon className={iconClass} />;
        case 'Lab Test': return <TestTubeIcon className={iconClass} />;
        case 'Prescription': return <PillIcon className={iconClass} />;
        case 'Note': return <FileTextIcon className={iconClass} />;
        default: return <FileTextIcon className={iconClass} />;
    }
};

const DoctorView: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(PATIENTS[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
      {/* Left Column: Patient Queue */}
      <div className="lg:col-span-3 flex flex-col h-full">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg flex-1 flex flex-col">
            <h2 className="text-lg font-bold p-4 border-b border-slate-700 text-slate-200">Patient Queue</h2>
            <ul className="overflow-y-auto flex-1 p-2">
                {PATIENTS.map((patient) => (
                <li key={patient.id}>
                    <button
                    onClick={() => setSelectedPatient(patient)}
                    className={`w-full text-left p-3 my-1 rounded-md flex items-center gap-3 transition-colors duration-200 ${
                        selectedPatient.id === patient.id
                        ? 'bg-sky-600 text-white shadow-md'
                        : 'hover:bg-slate-700/50'
                    }`}
                    >
                        <UserIcon className="h-5 w-5 flex-shrink-0" />
                        <span className="font-semibold">{patient.name}</span>
                    </button>
                </li>
                ))}
            </ul>
        </div>
      </div>

      {/* Center Column: Patient Record */}
      <div className="lg:col-span-6 flex flex-col gap-6 h-full overflow-y-auto pr-2">
        {selectedPatient && (
          <>
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-white">{selectedPatient.name}</h2>
                <span className="text-sm bg-slate-700 px-2 py-1 rounded-full">{selectedPatient.age} years old</span>
                <span className="text-sm bg-slate-700 px-2 py-1 rounded-full">{selectedPatient.gender}</span>
            </div>
            
            <Card title="AI-Generated Summary">
              <p className="text-slate-300 text-sm leading-relaxed">{selectedPatient.summary}</p>
            </Card>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg flex-1 flex flex-col">
                <h3 className="text-sm font-semibold text-sky-400 p-4 border-b border-slate-700">Chronological History</h3>
                <div className="overflow-y-auto p-4 space-y-4">
                    {selectedPatient.history.map(item => (
                        <div key={item.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="bg-slate-700 rounded-full p-2">
                                    <HistoryIcon type={item.type} />
                                </div>
                                <div className="w-px h-full bg-slate-700"></div>
                            </div>
                            <div className="pb-4">
                                <p className="text-xs text-slate-400">{item.date}</p>
                                <p className="font-semibold text-slate-100">{item.title}</p>
                                <p className="text-sm text-slate-300">{item.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </>
        )}
      </div>

      {/* Right Column: Interaction & AI Tools */}
      <div className="lg:col-span-3 flex flex-col gap-6 h-full">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg flex-1 flex flex-col">
          <h3 className="text-sm font-semibold text-sky-400 p-4 border-b border-slate-700">Ask MediBot</h3>
          <div className="flex-1 p-4 overflow-y-auto text-sm space-y-4">
            <div className="bg-slate-700 p-3 rounded-lg max-w-xs self-start">What are the treatment options for hypertension in a patient with high stress?</div>
            <div className="bg-sky-600 p-3 rounded-lg max-w-xs self-end ml-auto text-white">For a patient like Jean, consider ACE inhibitors like Lisinopril. Also, lifestyle changes...</div>
          </div>
          <div className="p-4 border-t border-slate-700 mt-auto">
            <div className="relative">
              <input type="text" placeholder="Type your question..." className="w-full bg-slate-700 rounded-full py-2 pl-4 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-sky-500" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-sky-500 rounded-full hover:bg-sky-400">
                <SendIcon className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        <Card title="AI-Generated Recommendations" className="flex-shrink-0">
          <ul className="space-y-3">
            {selectedPatient.recommendations.map((rec, index) => (
                <li key={index} className="bg-slate-700/50 p-3 rounded-lg">
                    <p className="text-slate-300 text-sm mb-2">{rec}</p>
                    <div className="flex gap-2 justify-end">
                        <button className="flex items-center gap-1 text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-md hover:bg-green-500/40"><CheckIcon className="h-3 w-3" /> Approve</button>
                        <button className="flex items-center gap-1 text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-md hover:bg-red-500/40"><XIcon className="h-3 w-3" /> Dismiss</button>
                    </div>
                </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default DoctorView;
