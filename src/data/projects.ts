import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'proj1',
    name: 'Cloud Infrastructure Security',
    description: 'ISO 27001 compliance for cloud infrastructure',
    organizationId: 'org1',
    standardId: 'iso27001',
    status: 'in_progress',
    assignedUsers: ['user1', 'user2'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];