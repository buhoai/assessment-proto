import React, { useState } from 'react';
import { Standard, Question, QuestionType, Option } from '../../types';
import { Plus, Trash2, ArrowRight } from 'lucide-react';

interface Props {
  initialStandard?: Standard;
  onSave: (standard: Standard) => void;
}

export default function StandardForm({ initialStandard, onSave }: Props) {
  const [standard, setStandard] = useState<Standard>(initialStandard || {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    questions: {},
    initialQuestion: ''
  });

  const [currentQuestionId, setCurrentQuestionId] = useState<string>('');
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState<QuestionType>('boolean');
  const [options, setOptions] = useState<Option[]>([]);
  const [newOptionLabel, setNewOptionLabel] = useState('');

  const handleAddQuestion = () => {
    if (!questionText) return;

    const questionId = crypto.randomUUID();
    const newQuestion: Question = {
      id: questionId,
      text: questionText,
      type: questionType,
      required: true,
      nextQuestion: {},
    };

    if (['multiSelect', 'singleSelect'].includes(questionType)) {
      newQuestion.options = options;
    }

    setStandard(prev => ({
      ...prev,
      questions: {
        ...prev.questions,
        [questionId]: newQuestion
      },
      initialQuestion: prev.initialQuestion || questionId
    }));

    // Reset form
    setQuestionText('');
    setQuestionType('boolean');
    setOptions([]);
    setCurrentQuestionId(questionId);
  };

  const handleAddOption = () => {
    if (!newOptionLabel) return;
    const newOption: Option = {
      id: crypto.randomUUID(),
      label: newOptionLabel
    };
    setOptions([...options, newOption]);
    setNewOptionLabel('');
  };

  const handleSetNextQuestion = (fromId: string, condition: string, toId: string) => {
    setStandard(prev => ({
      ...prev,
      questions: {
        ...prev.questions,
        [fromId]: {
          ...prev.questions[fromId],
          nextQuestion: {
            ...prev.questions[fromId].nextQuestion,
            [condition]: toId
          }
        }
      }
    }));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Standard Name"
          value={standard.name}
          onChange={(e) => setStandard(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Description"
          value={standard.description}
          onChange={(e) => setStandard(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Add Question</h3>
        <div className="space-y-4">
          <textarea
            placeholder="Question Text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="boolean">Yes/No</option>
            <option value="multiSelect">Multiple Choice (Multiple)</option>
            <option value="singleSelect">Multiple Choice (Single)</option>
            <option value="acknowledge">Acknowledgement</option>
          </select>

          {['multiSelect', 'singleSelect'].includes(questionType) && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Option Label"
                  value={newOptionLabel}
                  onChange={(e) => setNewOptionLabel(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg"
                />
                <button
                  onClick={handleAddOption}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {options.map((option) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <span className="flex-1">{option.label}</span>
                    <button
                      onClick={() => setOptions(options.filter(o => o.id !== option.id))}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAddQuestion}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Question
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Question Flow</h3>
        <div className="space-y-4">
          {Object.values(standard.questions).map((question) => (
            <div key={question.id} className="p-4 border rounded-lg space-y-4">
              <p className="font-medium">{question.text}</p>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Next Questions:</p>
                {question.type === 'boolean' && (
                  <div className="space-y-2">
                    {['true', 'false'].map((condition) => (
                      <div key={condition} className="flex items-center gap-2">
                        <span className="w-16">{condition}:</span>
                        <select
                          value={question.nextQuestion?.[condition] || ''}
                          onChange={(e) => handleSetNextQuestion(question.id, condition, e.target.value)}
                          className="flex-1 px-2 py-1 border rounded"
                        >
                          <option value="">End Flow</option>
                          {Object.values(standard.questions)
                            .filter(q => q.id !== question.id)
                            .map(q => (
                              <option key={q.id} value={q.id}>
                                {q.text}
                              </option>
                            ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
                
                {['multiSelect', 'singleSelect', 'acknowledge'].includes(question.type) && (
                  <div className="flex items-center gap-2">
                    <span className="w-16">Next:</span>
                    <select
                      value={question.nextQuestion?.['*'] || question.nextQuestion?.['acknowledged'] || ''}
                      onChange={(e) => handleSetNextQuestion(
                        question.id,
                        question.type === 'acknowledge' ? 'acknowledged' : '*',
                        e.target.value
                      )}
                      className="flex-1 px-2 py-1 border rounded"
                    >
                      <option value="">End Flow</option>
                      {Object.values(standard.questions)
                        .filter(q => q.id !== question.id)
                        .map(q => (
                          <option key={q.id} value={q.id}>
                            {q.text}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onSave(standard)}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Save Standard
      </button>
    </div>
  );
}