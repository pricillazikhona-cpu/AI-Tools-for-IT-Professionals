
import React from 'react';
import ToolInterface from './ToolInterface';

const CommitMessageGenerator: React.FC = () => {
  return (
    <ToolInterface
      title="Commit Message Generator"
      description="Paste your code diff below to generate a conventional commit message."
      promptTemplate={(diff) => `Generate a concise, conventional commit message for the following code diff. The message should follow the format: <type>(<scope>): <subject>. The body is optional.
      \n\n--- DIFF START ---\n${diff}\n--- DIFF END ---`}
      inputLabel="Code Diff"
      inputPlaceholder="e.g., + const newFeature = true;"
    />
  );
};

export default CommitMessageGenerator;
