
import React from 'react';
import { View } from '../types';
import { StethoscopeIcon, UserIcon } from './Icons';

interface HeaderProps {
  currentView: View;
  onToggleView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onToggleView }) => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <h1 className="text-2xl font-bold text-sky-400 tracking-tight">
          MediBot AI
        </h1>
        <div className="flex items-center bg-slate-800 rounded-full p-1">
          <button
            onClick={() => onToggleView(View.Doctor)}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 ${
              currentView === View.Doctor
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <StethoscopeIcon className="h-4 w-4" />
            Doctor View
          </button>
          <button
            onClick={() => onToggleView(View.Patient)}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 ${
              currentView === View.Patient
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <UserIcon className="h-4 w-4" />
            Patient View
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
