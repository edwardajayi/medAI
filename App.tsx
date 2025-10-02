
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import DoctorView from './views/DoctorView';
import PatientView from './views/PatientView';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Doctor);

  const handleViewChange = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Header currentView={currentView} onToggleView={handleViewChange} />
      <main className="p-4 sm:p-6 lg:p-8">
        {currentView === View.Doctor ? <DoctorView /> : <PatientView />}
      </main>
    </div>
  );
};

export default App;
