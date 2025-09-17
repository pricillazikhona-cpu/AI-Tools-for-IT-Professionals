
import React from 'react';
import ToolInterface from './ToolInterface';

const CodeExplainer: React.FC = () => {
  return (
    <ToolInterface
      title="Code Explainer"
      description="Paste a code snippet to get a clear, step-by-step explanation of what it does."
      promptTemplate={(code) => `Explain the following code snippet in a clear and concise way. Break down the logic step-by-step.
      \n\n--- CODE START ---\n${code}\n--- CODE END ---`}
      inputLabel="Code Snippet"
      inputPlaceholder="e.g., const sum = (a, b) => a + b;"
    />
  );
};

export default CodeExplainer;
