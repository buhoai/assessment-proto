import React from 'react';
import { Organization } from '../../types';
import { Building2, Users } from 'lucide-react';

interface Props {
  organizations: Organization[];
  onSelect: (organizationId: string) => void;
}

export default function OrganizationList({ organizations, onSelect }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {organizations.map((org) => (
        <button
          key={org.id}
          onClick={() => onSelect(org.id)}
          className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-left"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">{org.name}</h3>
          </div>
          {org.description && (
            <p className="text-gray-600 mb-4">{org.description}</p>
          )}
          <div className="flex items-center gap-2 text-gray-500">
            <Users className="w-4 h-4" />
            <span>{org.users.length} users</span>
          </div>
        </button>
      ))}
    </div>
  );
}