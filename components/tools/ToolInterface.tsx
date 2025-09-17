
import React, { useState, useCallback } from 'react';
import { generateContent } from '../../services/geminiService.ts';
import LoadingSpinner from '../common/LoadingSpinner.tsx';
import CodeBlock from '../common/CodeBlock.tsx';

// Icons for feedback
const ThumbsUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 10v12"/><path d="M18 10V4a2 2 0 0 0-2-2H8.5a2 2 0 0 0-1.9.9L4 10v11h13.1a2 2 0 0 0 1.9-1.5l1.4-7.4a2 2 0 0 0-2-2.5h-5.1"/></svg>
);

const ThumbsDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 14V2"/><path d="M18 14v6a2 2 0 0 1-2 2H8.5a2 2 0 0 1-1.9-.9L4 14v-1h13.1a2 2 0 0 1 1.9 1.5l1.4 7.4a2 2 0 0 1-2 2.5h-5.1"/></svg>
);


interface ToolInterfaceProps {
  title: string;
  description: string;
  promptTemplate: (input: string) => string;
  inputLabel: string;
  inputPlaceholder: string;
  inputType?: 'input' | 'textarea';
}

const ToolInterface: React.FC<ToolInterfaceProps> = ({
  title,
  description,
  promptTemplate,
  inputLabel,
  inputPlaceholder,
  inputType = 'textarea',
}) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Feedback state
  const [helpful, setHelpful] = useState<'yes' | 'no' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!input.trim()) {
      setError('Input cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setOutput('');

    // Reset feedback state on new generation
    setHelpful(null);
    setFeedbackText('');
    setFeedbackSubmitted(false);

    const prompt = promptTemplate(input);
    const result = await generateContent(prompt);
    
    if (result.startsWith('An error occurred')) {
      setError(result);
    } else {
      setOutput(result);
    }
    
    setIsLoading(false);
  }, [input, promptTemplate]);

  const handleSubmitFeedback = useCallback(() => {
    if (!helpful) return;

    const feedbackData = {
      tool: title,
      timestamp: new Date().toISOString(),
      input,
      output,
      helpful,
      feedbackText,
    };

    try {
      const existingFeedback = JSON.parse(localStorage.getItem('it-tools-feedback') || '[]');
      existingFeedback.push(feedbackData);
      localStorage.setItem('it-tools-feedback', JSON.stringify(existingFeedback));
    } catch (e) {
      console.error("Failed to save feedback to localStorage", e);
    }

    setFeedbackSubmitted(true);
  }, [helpful, feedbackText, title, input, output]);


  const InputComponent = inputType === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="p-6 sm:p-8 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-text-primary">{title}</h1>
      <p className="text-text-secondary mt-1 mb-6">{description}</p>
      
      <div className="flex-grow flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="tool-input" className="font-medium text-text-primary">{inputLabel}</label>
          <InputComponent
            id="tool-input"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInput(e.target.value)}
            placeholder={inputPlaceholder}
            className="w-full bg-secondary border border-border-color rounded-md p-3 text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition duration-200 resize-none"
            rows={inputType === 'textarea' ? 8 : undefined}
            disabled={isLoading}
          />
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full sm:w-auto self-start bg-accent hover:bg-accent-hover text-white font-bold py-2 px-6 rounded-md transition-colors duration-200 flex items-center justify-center disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? <LoadingSpinner /> : 'Generate'}
        </button>
        
        {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-md border border-red-700">{error}</div>}
        
        {output && (
          <div className="flex flex-col gap-2 mt-2">
            <h2 className="font-medium text-text-primary">Result</h2>
            <CodeBlock content={output} />
          </div>
        )}

        {output && !feedbackSubmitted && (
          <div className="mt-4 p-4 border border-border-color rounded-lg bg-secondary/50">
            <p className="font-medium text-text-primary mb-3">Was this helpful?</p>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setHelpful('yes')}
                aria-pressed={helpful === 'yes'}
                className={`px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors text-sm border ${
                  helpful === 'yes'
                    ? 'bg-green-500/20 text-green-300 border-green-500'
                    : 'bg-secondary hover:bg-gray-700/50 border-border-color text-text-secondary hover:text-text-primary'
                }`}
              >
                <ThumbsUpIcon className="w-4 h-4" />
                <span>Yes</span>
              </button>
              <button
                onClick={() => setHelpful('no')}
                aria-pressed={helpful === 'no'}
                className={`px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors text-sm border ${
                  helpful === 'no'
                    ? 'bg-red-500/20 text-red-300 border-red-500'
                    : 'bg-secondary hover:bg-gray-700/50 border-border-color text-text-secondary hover:text-text-primary'
                }`}
              >
                <ThumbsDownIcon className="w-4 h-4" />
                <span>No</span>
              </button>
            </div>
            
            {helpful && (
              <div className="mt-4 flex flex-col gap-3">
                <label htmlFor="feedback-text" className="sr-only">Detailed feedback</label>
                <textarea
                  id="feedback-text"
                  placeholder="Provide more details (optional)..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full bg-secondary border border-border-color rounded-md p-3 text-text-primary focus:ring-2 focus:ring-accent focus:border-accent transition duration-200 resize-none"
                  rows={3}
                />
                <button
                  onClick={handleSubmitFeedback}
                  className="w-full sm:w-auto self-start bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Submit Feedback
                </button>
              </div>
            )}
          </div>
        )}

        {feedbackSubmitted && (
          <div className="mt-4 p-3 text-center bg-green-900/50 border border-green-700 rounded-lg">
            <p className="text-green-300 font-medium">Thank you for your feedback!</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ToolInterface;