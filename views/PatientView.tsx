
import React from 'react';
import { PATIENT_HEALTH_METRICS } from '../constants';
import { HealthMetric } from '../types';
import { SendIcon, TrendingUpIcon, TrendingDownIcon, ArrowRightIcon } from '../components/Icons';

const MetricCard: React.FC<{ metric: HealthMetric }> = ({ metric }) => {
    const TrendIcon = () => {
        if (metric.trend === 'up') return <TrendingUpIcon className="h-5 w-5 text-green-400" />;
        if (metric.trend === 'down') return <TrendingDownIcon className="h-5 w-5 text-red-400" />;
        return <ArrowRightIcon className="h-5 w-5 text-slate-400" />;
    };
    
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col justify-between shadow-lg hover:border-sky-500 transition-colors duration-200">
            <div>
                <p className="text-sm text-slate-400 mb-2">{metric.label}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">{metric.value}</span>
                    <span className="text-lg text-slate-300">{metric.unit}</span>
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <TrendIcon />
            </div>
        </div>
    );
};


const PatientView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)]">
      {/* Left Column: My Health Dashboard */}
      <div className="lg:col-span-7 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-white">My Health Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PATIENT_HEALTH_METRICS.map(metric => (
                <MetricCard key={metric.label} metric={metric} />
            ))}
        </div>
      </div>

      {/* Right Column: Chat & Summary */}
      <div className="lg:col-span-5 flex flex-col gap-8 h-full">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-sky-400 p-4 border-b border-slate-700">Ask a Question</h3>
          <div className="flex-1 p-4 overflow-y-auto text-sm space-y-4">
            <div className="bg-sky-600 p-3 rounded-lg max-w-xs self-end ml-auto text-white">What does a blood pressure of 122/78 mean?</div>
            <div className="bg-slate-700 p-3 rounded-lg max-w-xs self-start">A blood pressure of 122/78 mmHg is considered to be in the normal to elevated range. It's a good idea to continue monitoring it.</div>
          </div>
          <div className="p-4 border-t border-slate-700 mt-auto">
            <div className="relative">
              <input type="text" placeholder="Ask about your health..." className="w-full bg-slate-700 rounded-full py-3 pl-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-sky-500" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-sky-500 rounded-full hover:bg-sky-400">
                <SendIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-sky-400 p-4 border-b border-slate-700">My Health Summary</h3>
            <div className="p-4">
                <p className="text-slate-300 text-sm leading-relaxed">Your recent health metrics are stable. Blood pressure and glucose levels are within normal ranges. Continue to follow your current health plan and monitor for any changes. Your next appointment is scheduled for August 15, 2024.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PatientView;
