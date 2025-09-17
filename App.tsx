
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import { TOOLS } from './constants';
import { ToolId } from './types';
import CodingBackground from './components/common/CodingBackground';

const App: React.FC = () => {
  const [selectedToolId, setSelectedToolId] = useState<ToolId>(TOOLS[0].id);

  const handleSelectTool = (toolId: ToolId) => {
    setSelectedToolId(toolId);
  };

  const ActiveToolComponent = useMemo(() => {
    const selectedTool = TOOLS.find(tool => tool.id === selectedToolId);
    return selectedTool ? selectedTool.component : null;
  }, [selectedToolId]);

  return (
    <div className="flex h-screen w-screen overflow-hidden relative">
      <CodingBackground />
      <Sidebar 
        tools={TOOLS} 
        selectedToolId={selectedToolId} 
        onSelectTool={handleSelectTool} 
      />
      <main className="flex-1 bg-primary/95 backdrop-blur-sm overflow-y-auto">
        {ActiveToolComponent && <ActiveToolComponent />}
      </main>
    </div>
  );
};

export default App;