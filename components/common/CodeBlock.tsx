
import React from 'react';
import CopyButton from './CopyButton.tsx';

interface CodeBlockProps {
  content: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ content, language }) => {
  return (
    <div className="relative bg-secondary rounded-lg border border-border-color">
      <div className="absolute top-2 right-2">
        <CopyButton textToCopy={content} />
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language} text-text-primary whitespace-pre-wrap break-words`}>
          {content}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;