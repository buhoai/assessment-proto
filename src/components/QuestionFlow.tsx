import React, { useState } from 'react';
import { Question, Standard } from '../types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  standard: Standard;
  onComplete: (answers: Record<string, any>) => void;
  onReset: () => void;
}

export default function QuestionFlow({ standard, onComplete, onReset }: Props) {
  const [currentQuestionId, setCurrentQuestionId] = useState(standard.initialQuestion);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const currentQuestion = standard.questions[currentQuestionId];

  const handleAnswer = (answer: any) => {
    const newAnswers = { ...answers, [currentQuestionId]: answer };
    setAnswers(newAnswers);

    const nextQuestionId = getNextQuestion(currentQuestion, answer);
    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId);
    } else {
      onComplete(newAnswers);
    }
  };

  const getNextQuestion = (question: Question, answer: any): string | null => {
    if (!question.nextQuestion) return null;
    
    if (question.type === 'boolean' || question.type === 'singleSelect' || question.type === 'acknowledge') {
      return question.nextQuestion[String(answer)] ?? null;
    }
    
    return question.nextQuestion['*'] ?? null;
  };

  if (!currentQuestion) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{currentQuestion.text}</h2>
          {currentQuestion.required && (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Required</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {currentQuestion.type === 'boolean' && (
            <div className="flex gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className="flex-1 py-3 px-6 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 font-medium transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="flex-1 py-3 px-6 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-medium transition-colors"
              >
                No
              </button>
            </div>
          )}

          {currentQuestion.type === 'multiSelect' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 rounded"
                    onChange={(e) => {
                      const currentAnswers = answers[currentQuestionId] || [];
                      const newAnswers = e.target.checked
                        ? [...currentAnswers, option.id]
                        : currentAnswers.filter((id: string) => id !== option.id);
                      handleAnswer(newAnswers);
                    }}
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          )}

          {currentQuestion.type === 'singleSelect' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className="w-full text-left p-4 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'acknowledge' && (
            <button
              onClick={() => handleAnswer('acknowledged')}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Acknowledge</span>
            </button>
          )}
        </div>
      </div>

      <button
        onClick={onReset}
        className="mt-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        Start Over
      </button>
    </div>
  );
}