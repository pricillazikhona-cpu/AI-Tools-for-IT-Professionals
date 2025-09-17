
import type React from 'react';

export enum ToolId {
  COMMIT_MESSAGE = 'commit_message',
  REGEX_GENERATOR = 'regex_generator',
  SHELL_COMMAND = 'shell_command',
  CODE_EXPLAINER = 'code_explainer'
}

export interface Tool {
  id: ToolId;
  name: string;
  description: string;
  icon: React.ReactNode;
  component: React.ComponentType;
}
