import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SimulatorModal } from './components/SimulatorModal';
import { Dashboard } from './pages/Dashboard';
import { Inbox } from './pages/Inbox';
import { Notes } from './pages/Notes';
import { Memory } from './pages/Memory';
import { Tasks } from './pages/Tasks';
import { Live } from './pages/Live';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            onNavigateTab={setActiveTab}
            onOpenSimulator={() => setIsSimulatorOpen(true)}
          />
        );
      case 'inbox':
        return <Inbox onOpenSimulator={() => setIsSimulatorOpen(true)} />;
      case 'notes':
        return <Notes />;
      case 'memory':
        return <Memory />;
      case 'tasks':
        return <Tasks />;
      case 'live':
        return <Live />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <Dashboard
            onNavigateTab={setActiveTab}
            onOpenSimulator={() => setIsSimulatorOpen(true)}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0A0D14] text-slate-100 antialiased font-sans">
      {/* 1. Permanent Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
      />

      {/* 2. Main Application Flow */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header
          onOpenSimulator={() => setIsSimulatorOpen(true)}
          onSearchClick={() => setActiveTab('memory')}
        />

        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-7xl mx-auto">{renderActivePage()}</div>
        </main>
      </div>

      {/* 3. Interactive Phone Simulator Modal */}
      <SimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onNavigateTab={setActiveTab}
      />
    </div>
  );
};
