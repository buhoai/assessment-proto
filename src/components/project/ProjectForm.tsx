import React, { useState } from 'react';
import { Project, Standard, User } from '../../types';
import { Plus } from 'lucide-react';

interface Props {
  standards: Standard[];
  users: User[];
  organizationId: string;
  initialProject?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

export default function ProjectForm({
  standards,
  users,
  organizationId,
  initialProject,
  onSave,
  onCancel
}: Props) {
  const [project, setProject] = useState<Project>(initialProject || {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    organizationId,
    standardId: standards[0]?.id || '',
    status: 'not_started',
    assignedUsers: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...project,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            required
            value={project.name}
            onChange={(e) => setProject(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={project.description || ''}
            onChange={(e) => setProject(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 w-full px-4 py-2 border rounded-lg"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Standard</label>
          <select
            required
            value={project.standardId}
            onChange={(e) => setProject(prev => ({ ...prev, standardId: e.target.value }))}
            className="mt-1 w-full px-4 py-2 border rounded-lg"
          >
            {standards.map((standard) => (
              <option key={standard.id} value={standard.id}>
                {standard.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Assigned Users</label>
          <div className="mt-1 space-y-2">
            {users.map((user) => (
              <label key={user.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={project.assignedUsers.includes(user.id)}
                  onChange={(e) => {
                    const newAssignedUsers = e.target.checked
                      ? [...project.assignedUsers, user.id]
                      : project.assignedUsers.filter(id => id !== user.id);
                    setProject(prev => ({ ...prev, assignedUsers: newAssignedUsers }));
                  }}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>{user.name}</span>
                <span className="text-sm text-gray-500">({user.role})</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Project
        </button>
      </div>
    </form>
  );
}