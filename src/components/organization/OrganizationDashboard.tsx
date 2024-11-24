import React, { useState } from 'react';
import { Organization, Project } from '../../types';
import OrganizationList from './OrganizationList';
import OrganizationDetails from './OrganizationDetails';
import { Plus } from 'lucide-react';

interface Props {
  organizations: Organization[];
  projects: Project[];
  selectedOrgId: string | null;
  onSelectOrg: (orgId: string | null) => void;
  onUpdateOrg: (org: Organization) => void;
}

export default function OrganizationDashboard({
  organizations,
  projects,
  selectedOrgId,
  onSelectOrg,
  onUpdateOrg
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const selectedOrg = selectedOrgId 
    ? organizations.find(org => org.id === selectedOrgId)
    : null;

  const orgProjects = selectedOrgId
    ? projects.filter(project => project.organizationId === selectedOrgId)
    : [];

  if (selectedOrg) {
    return (
      <OrganizationDetails
        organization={selectedOrg}
        projects={orgProjects}
        onBack={() => onSelectOrg(null)}
        onUpdate={onUpdateOrg}
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Organizations</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          Add Organization
        </button>
      </div>
      <OrganizationList
        organizations={organizations}
        onSelect={onSelectOrg}
      />
    </div>
  );
}