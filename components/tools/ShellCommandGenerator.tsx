
import React from 'react';
import ToolInterface from './ToolInterface.tsx';

const ShellCommandGenerator: React.FC = () => {
  return (
    <ToolInterface
      title="Shell Command Generator"
      description="Describe a task you want to perform in the terminal, and the AI will generate the command."
      promptTemplate={(desc) => `Generate a shell command (for a Linux/macOS environment) to perform the following task. Provide only the command itself, without any explanations.
      \n\nTask: "${desc}"`}
      inputLabel="Task Description"
      inputPlaceholder="e.g., find all files with a .log extension in the current directory"
      inputType="input"
    />
  );
};

export default ShellCommandGenerator;