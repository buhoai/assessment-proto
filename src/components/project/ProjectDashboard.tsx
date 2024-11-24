import React, { useState } from 'react';
import { Organization, Project, Standard } from '../../types';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import { Plus } from 'lucide-react';

interface Props {
  projects: Project[];
  organizations: Organization[];
  standards: Standard[];
  onAddProject: (project: Project) => void;
  onUpdateProject: (project: Project) => void;
}

export default function ProjectDashboard({
  projects,
  organizations,
  standards,
  onAddProject,
  onUpdateProject
}: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);

  const filteredProjects = selectedOrgId
    ? projects.filter(project => project.organizationId === selectedOrgId)
    : projects;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
        <div className="flex gap-4">
          <select
            value={selectedOrgId || ''}
            onChange={(e) => setSelectedOrgId(e.target.value || null)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Organizations</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>{org.name}</option>
            ))}
          </select>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </div>
      </div>

      {isAdding ? (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <ProjectForm
            standards={standards}
            users={organizations.flatMap(org => org.users)}
            organizationId={selectedOrgId || organizations[0]?.id}
            onSave={(project) => {
              onAddProject(project);
              setIsAdding(false);
            }}
            onCancel={() => setIsAdding(false)}
          />
        </div>
      ) : (
        <ProjectList
          projects={filteredProjects}
          standards={standards}
          onSelect={() => {}}
        />
      )}
    </div>
  );
}