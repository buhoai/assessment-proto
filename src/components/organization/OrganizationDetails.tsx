import React from 'react';
import { Organization, Project } from '../../types';
import { ArrowLeft, Edit2, Users, Folder } from 'lucide-react';
import ProjectList from '../project/ProjectList';

interface Props {
  organization: Organization;
  projects: Project[];
  isEditing: boolean;
  onBack: () => void;
  onUpdate: (org: Organization) => void;
  onToggleEdit: () => void;
}

export default function OrganizationDetails({
  organization,
  projects,
  isEditing,
  onBack,
  onUpdate,
  onToggleEdit
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Organizations
        </button>
        <button
          onClick={onToggleEdit}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700"
        >
          <Edit2 className="w-5 h-5" />
          {isEditing ? 'View Details' : 'Edit Organization'}
        </button>
      </div>

      {isEditing ? (
        <form className="space-y-4 bg-white rounded-xl shadow-lg p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Organization Name</label>
            <input
              type="text"
              value={organization.name}
              onChange={(e) => onUpdate({ ...organization, name: e.target.value })}
              className="mt-1 w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={organization.description || ''}
              onChange={(e) => onUpdate({ ...organization, description: e.target.value })}
              className="mt-1 w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{organization.name}</h2>
          {organization.description && (
            <p className="text-gray-600 mb-6">{organization.description}</p>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Users className="w-5 h-5" />
                <h3 className="font-semibold">Team Members</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{organization.users.length}</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Folder className="w-5 h-5" />
                <h3 className="font-semibold">Active Projects</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Team Members</h3>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-4">
            {organization.users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Projects</h3>
        <ProjectList
          projects={projects}
          onSelect={() => {}}
        />
      </div>
    </div>
  );
}