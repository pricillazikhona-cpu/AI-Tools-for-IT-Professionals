import React from 'react';
import { Tool } from '../types.ts';
import { ToolId } from '../types.ts';

interface SidebarProps {
  tools: Tool[];
  selectedToolId: ToolId;
  onSelectTool: (toolId: ToolId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tools, selectedToolId, onSelectTool }) => {
  return (
    <aside className="w-64 bg-secondary/95 backdrop-blur-sm border-r border-border-color p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-white">IT</div>
        <h1 className="text-lg font-bold text-text-primary">AI IT Tools</h1>
      </div>
      <nav className="flex flex-col gap-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            className={`flex items-center gap-3 p-2 rounded-md text-sm transition-colors ${
              selectedToolId === tool.id
                ? 'bg-accent text-white'
                : 'text-text-secondary hover:bg-gray-700/50 hover:text-text-primary'
            }`}
          >
            {tool.icon}
            <span>{tool.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;