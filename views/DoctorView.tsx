import React, { useState, useEffect, useRef } from 'react';
import { PATIENTS } from '../constants';
import { Patient, PatientHistoryItem, ChatMessage } from '../types';
import { SendIcon, CheckIcon, XIcon, UserIcon, StethoscopeIcon, PillIcon, TestTubeIcon, FileTextIcon } from '../components/Icons';

const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className, title }) => (
    <div className={`bg-gray-800 border border-gray-700/50 rounded-xl shadow-lg ${className}`}>
        {title && <h3 className="text-sm font-semibold text-teal-400 p-4 border-b border-gray-700/50">{title}</h3>}
        <div className="p-4">
            {children}
        </div>
    </div>
);

const HistoryIcon: React.FC<{type: PatientHistoryItem['type']}> = ({type}) => {
    const iconClass = "h-5 w-5 text-teal-400";
    switch(type) {
        case 'Consultation': return <StethoscopeIcon className={iconClass} />;
        case 'Lab Test': return <TestTubeIcon className={iconClass} />;
        case 'Prescription': return <PillIcon className={iconClass} />;
        case 'Note': return <FileTextIcon className={iconClass} />;
        default: return <FileTextIcon className={iconClass} />;
    }
};

const SkeletonLoader: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/2"></div>
        <div className="h-24 bg-gray-700 rounded w-full"></div>
        <div className="h-40 bg-gray-700 rounded w-full"></div>
    </div>
)

const DoctorView: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(PATIENTS[0]);
  const [isSwitchingPatient, setIsSwitchingPatient] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsSwitchingPatient(true);
    setMessages([]);
    setInput('');
    const timer = setTimeout(() => {
        setIsSwitchingPatient(false);
    }, 500); // Simulate network latency
    return () => clearTimeout(timer);
  }, [selectedPatient]);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSelectPatient = (patient: Patient) => {
    if(patient.id !== selectedPatient.id) {
        setSelectedPatient(patient);
    }
  }

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
            content: `Based on the record for ${selectedPatient.name}, here is the information regarding your query about "${input.substring(0, 20)}...". (This is a simulated response).`
        };
        setMessages(prev => [...prev, mockResponse]);
        setIsLoading(false);
    }, 1200);
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
      {/* Left Column: Patient Queue */}
      <div className="lg:col-span-3 flex flex-col h-full">
        <div className="bg-gray-800 border border-gray-700/50 rounded-xl shadow-lg flex-1 flex flex-col">
            <h2 className="text-lg font-bold p-4 border-b border-gray-700/50 text-gray-200">Patient Queue</h2>
            <ul className="overflow-y-auto flex-1 p-2">
                {PATIENTS.map((patient) => (
                <li key={patient.id}>
                    <button
                    onClick={() => handleSelectPatient(patient)}
                    className={`w-full text-left p-3 my-1 rounded-lg flex items-center gap-4 transition-all duration-200 ${
                        selectedPatient.id === patient.id
                        ? 'bg-teal-500/20 text-teal-300 shadow-md ring-1 ring-teal-500'
                        : 'hover:bg-gray-700/50'
                    }`}
                    >
                        <div className={`p-2 rounded-full ${selectedPatient.id === patient.id ? 'bg-teal-500/20' : 'bg-gray-700'}`}>
                           <UserIcon className="h-5 w-5 flex-shrink-0" />
                        </div>
                        <div>
                            <p className="font-semibold">{patient.name}</p>
                            <p className="text-xs text-gray-400">{patient.diagnosis}</p>
                        </div>
                    </button>
                </li>
                ))}
            </ul>
        </div>
      </div>

      {/* Center Column: Patient Record */}
      <div className="lg:col-span-6 flex flex-col gap-6 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {isSwitchingPatient ? <SkeletonLoader/> : (
          selectedPatient && (
            <>
              <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-bold text-white">{selectedPatient.name}</h2>
                  <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">{selectedPatient.age} years old</span>
                  <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">{selectedPatient.gender}</span>
              </div>
              
              <Card title="AI-Generated Summary">
                <p className="text-gray-300 text-sm leading-relaxed">{selectedPatient.summary}</p>
              </Card>

              <div className="flex-1 flex flex-col">
                  <h3 className="text-sm font-semibold text-teal-400 px-4 pt-4">Chronological History</h3>
                  <div className="overflow-y-auto p-4 space-y-4">
                      {selectedPatient.history.map(item => (
                          <div key={item.id} className="flex gap-4 items-start">
                              <div className="bg-gray-900 border border-gray-700/50 rounded-full p-2 mt-1">
                                  <HistoryIcon type={item.type} />
                              </div>
                              <div className="bg-gray-800 border border-gray-700/50 rounded-lg p-3 flex-1">
                                  <div className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-100">{item.title}</p>
                                    <p className="text-xs text-gray-400">{item.date}</p>
                                  </div>
                                  <p className="text-sm text-gray-300 mt-1">{item.details}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
            </>
          )
        )}
      </div>

      {/* Right Column: Interaction & AI Tools */}
      <div className="lg:col-span-3 flex flex-col gap-6 h-full">
        <div className="bg-gray-800 border border-gray-700/50 rounded-xl shadow-lg flex-1 flex flex-col">
          <h3 className="text-sm font-semibold text-teal-400 p-4 border-b border-gray-700/50">Chat with {selectedPatient.name.split(' ')[0]}'s Record</h3>
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
                <input type="text" placeholder="Ask about this patient..." value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading} className="w-full bg-gray-700 rounded-full py-2 pl-4 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50" />
                <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-teal-500 rounded-full hover:bg-teal-400 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                  <SendIcon className="h-4 w-4 text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <Card title="AI-Generated Recommendations" className="flex-shrink-0">
          <ul className="space-y-3">
            {selectedPatient.recommendations.map((rec, index) => (
                <li key={index} className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-300 text-sm mb-2">{rec}</p>
                    <div className="flex gap-2 justify-end">
                        <button className="flex items-center gap-1 text-xs bg-teal-500/20 text-teal-300 px-2 py-1 rounded-md hover:bg-teal-500/40 transition-colors"><CheckIcon className="h-3 w-3" /> Approve</button>
                        <button className="flex items-center gap-1 text-xs bg-gray-600/20 text-gray-300 px-2 py-1 rounded-md hover:bg-gray-600/40 transition-colors"><XIcon className="h-3 w-3" /> Dismiss</button>
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
