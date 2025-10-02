import React, { useState, useEffect, useRef } from 'react';
import { PATIENTS, PATIENT_HEALTH_METRICS } from '../constants';
import { HealthMetric, ChatMessage } from '../types';
import { SendIcon, TrendingUpIcon, TrendingDownIcon, ArrowRightIcon } from '../components/Icons';

// Use Marie Uwimana's data for the patient view simulation
const patientForView = PATIENTS[1]; 

const MetricCard: React.FC<{ metric: HealthMetric }> = ({ metric }) => {
    const TrendIcon = () => {
        if (metric.trend === 'up') return <TrendingUpIcon className="h-5 w-5 text-green-400" />;
        if (metric.trend === 'down') return <TrendingDownIcon className="h-5 w-5 text-red-400" />;
        return <ArrowRightIcon className="h-5 w-5 text-gray-400" />;
    };
    
    return (
        <div className="bg-gray-800 border border-gray-700/50 rounded-xl p-6 flex flex-col justify-between shadow-lg hover:border-teal-500/50 hover:bg-gray-800/80 transition-all duration-200">
            <div>
                <p className="text-sm text-gray-400 mb-2">{metric.label}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">{metric.value}</span>
                    <span className="text-lg text-gray-300">{metric.unit}</span>
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <TrendIcon />
            </div>
        </div>
    );
};


const PatientView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start with a welcoming message from the bot
    setMessages([
      {
        role: 'model',
        content: `Hello ${patientForView.name.split(' ')[0]}! I'm MediBot, your personal health assistant. How can I help you today? You can ask things like "What are my current medications?" or "What were the results of my last lab test?"`
      }
    ]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
        const mockResponse: ChatMessage = { 
            role: 'model', 
            content: `Regarding your question about "${input.substring(0, 20)}...", here is some information from your health record. (This is a simulated response). Remember to always consult your doctor for medical advice.`
        };
        setMessages(prev => [...prev, mockResponse]);
        setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)]">
      {/* Left Column: My Health Dashboard */}
      <div className="lg:col-span-7 flex flex-col">
        <h2 className="text-3xl font-bold mb-6 text-white">My Health Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PATIENT_HEALTH_METRICS.map(metric => (
                <MetricCard key={metric.label} metric={metric} />
            ))}
        </div>
      </div>

      {/* Right Column: Chat & Summary */}
      <div className="lg:col-span-5 flex flex-col gap-8 h-full">
        <div className="bg-gray-800 border border-gray-700/50 rounded-xl shadow-lg flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-teal-400 p-4 border-b border-gray-700/50">Ask a Question</h3>
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto text-sm space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-teal-600 text-white' : 'bg-gray-700'}`}>
                        {msg.content}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-gray-700 p-3 rounded-lg"><span className="animate-pulse">Thinking...</span></div>
                </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-700/50 mt-auto">
             <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
              <div className="relative">
                <input type="text" placeholder="Ask about your health..." value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading} className="w-full bg-gray-700 rounded-full py-3 pl-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50" />
                <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-teal-500 rounded-full hover:bg-teal-400 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                  <SendIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700/50 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-teal-400 p-4 border-b border-gray-700/50">My Health Summary</h3>
            <div className="p-4">
                <p className="text-gray-300 text-sm leading-relaxed">Your recent health metrics are stable. Blood pressure and glucose levels are within normal ranges. Continue to follow your current health plan and monitor for any changes. Your next appointment is scheduled for August 15, 2024.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PatientView;
