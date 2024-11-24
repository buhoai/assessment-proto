import React from 'react';
import { Standard } from '../types';
import { ClipboardList } from 'lucide-react';

interface Props {
  standards: Standard[];
  onSelect: (standardId: string) => void;
}

export default function StandardSelector({ standards, onSelect }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {standards.map((standard) => (
        <button
          key={standard.id}
          onClick={() => onSelect(standard.id)}
          className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-left group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <ClipboardList className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{standard.name}</h3>
          </div>
          <p className="text-gray-600">{standard.description}</p>
        </button>
      ))}
    </div>
  );
}