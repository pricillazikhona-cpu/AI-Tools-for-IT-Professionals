
import React from 'react';
import type { Tool } from './types.ts';
import { ToolId } from './types.ts';
import CommitMessageGenerator from './components/tools/CommitMessageGenerator.tsx';
import RegexGenerator from './components/tools/RegexGenerator.tsx';
import ShellCommandGenerator from './components/tools/ShellCommandGenerator.tsx';
import CodeExplainer from './components/tools/CodeExplainer.tsx';

const CommitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 10.5A3.5 3.5 0 0 1 18.5 14H19a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h.5A3.5 3.5 0 0 1 9 10.5V8a1 1 0 0 0-1-1H3"/><path d="m12 14-3-3 3-3"/><path d="M9 11h9"/></svg>
);
const RegexIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3v10"/><path d="m12.6 7.4 8.4 8.2"/><path d="M12.6 15.6 4.2 7.4"/><path d="M5 3v4.4"/><path d="M5 12.5V17"/><circle cx="12" cy="18" r="2"/><path d="M3 21h18"/></svg>
);
const ShellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m4 6 8-4 8 4"/><path d="m4 12 8 4 8-4"/><path d="M12 22V8"/><polyline points="7 6 2 9 7 12"/><polyline points="17 6 22 9 17 12"/></svg>
);
const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);

export const TOOLS: Tool[] = [
  {
    id: ToolId.COMMIT_MESSAGE,
    name: 'Commit Message Generator',
    description: 'Generate conventional commit messages from code diffs.',
    icon: <CommitIcon className="w-5 h-5" />,
    component: CommitMessageGenerator
  },
  {
    id: ToolId.REGEX_GENERATOR,
    name: 'Regex Generator',
    description: 'Create regular expressions from natural language.',
    icon: <RegexIcon className="w-5 h-5" />,
    component: RegexGenerator
  },
  {
    id: ToolId.SHELL_COMMAND,
    name: 'Shell Command Generator',
    description: 'Generate shell commands from a description of the task.',
    icon: <ShellIcon className="w-5 h-5" />,
    component: ShellCommandGenerator
  },
  {
    id: ToolId.CODE_EXPLAINER,
    name: 'Code Explainer',
    description: 'Get a clear explanation of any code snippet.',
    icon: <CodeIcon className="w-5 h-5" />,
    component: CodeExplainer
  }
];