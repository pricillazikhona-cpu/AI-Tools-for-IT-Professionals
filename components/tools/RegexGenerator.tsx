
import React from 'react';
import ToolInterface from './ToolInterface.tsx';

const RegexGenerator: React.FC = () => {
  return (
    <ToolInterface
      title="Regex Generator"
      description="Describe the pattern you want to match, and the AI will generate the regular expression for you."
      promptTemplate={(desc) => `Generate a regular expression that matches the following description. Provide only the regex pattern itself, without any explanations or delimiters.
      \n\nDescription: "${desc}"`}
      inputLabel="Pattern Description"
      inputPlaceholder="e.g., an email address"
      inputType="input"
    />
  );
};

export default RegexGenerator;