import React from 'react';
import { Project, Standard } from '../../types';
import { Folder, Clock, Users2 } from 'lucide-react';

interface Props {
  projects: Project[];
  standards: Standard[];
  onSelect: (projectId: string) => void;
}

export default function ProjectList({ projects, standards, onSelect }: Props) {
  const getStandardName = (standardId: string) => {
    return standards.find(s => s.id === standardId)?.name || 'Unknown Standard';
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'not_started':
        return 'bg-gray-100 text-gray-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => onSelect(project.id)}
          className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-left"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Folder className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">{project.name}</h3>
          </div>
          
          <p className="text-gray-600 mb-4">{project.description}</p>
          
          <div className="space-y-2">
            <div className="text-sm text-gray-500">
              {getStandardName(project.standardId)}
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status.replace('_', ' ').toUpperCase()}
              </span>
              
              <div className="flex items-center gap-1 text-gray-500">
                <Users2 className="w-4 h-4" />
                <span className="text-sm">{project.assignedUsers.length}</span>
              </div>
              
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}