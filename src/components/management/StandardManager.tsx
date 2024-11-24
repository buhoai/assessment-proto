import React, { useState } from 'react';
import { Standard } from '../../types';
import StandardForm from './StandardForm';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Props {
  standards: Standard[];
  onUpdate: (standards: Standard[]) => void;
}

export default function StandardManager({ standards, onUpdate }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingStandard, setEditingStandard] = useState<Standard | null>(null);

  const handleSave = (standard: Standard) => {
    if (editingStandard) {
      onUpdate(standards.map(s => s.id === standard.id ? standard : s));
      setEditingStandard(null);
    } else {
      onUpdate([...standards, standard]);
      setIsAdding(false);
    }
  };

  const handleDelete = (standardId: string) => {
    if (confirm('Are you sure you want to delete this standard?')) {
      onUpdate(standards.filter(s => s.id !== standardId));
    }
  };

  if (isAdding || editingStandard) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {isAdding ? 'Add New Standard' : 'Edit Standard'}
          </h2>
          <button
            onClick={() => {
              setIsAdding(false);
              setEditingStandard(null);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
        <StandardForm
          initialStandard={editingStandard || undefined}
          onSave={handleSave}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Standards Management</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add Standard
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {standards.map((standard) => (
          <div
            key={standard.id}
            className="p-6 bg-white rounded-xl shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{standard.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingStandard(standard)}
                  className="p-1 text-blue-600 hover:text-blue-700"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(standard.id)}
                  className="p-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{standard.description}</p>
            <p className="text-sm text-gray-500">
              {Object.keys(standard.questions).length} questions
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}