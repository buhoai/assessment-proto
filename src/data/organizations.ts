import { Organization } from '../types';

export const organizations: Organization[] = [
  {
    id: 'org1',
    name: 'Acme Corporation',
    description: 'Global technology solutions provider',
    users: [
      {
        id: 'user1',
        name: 'John Doe',
        email: 'john@acme.com',
        role: 'admin',
        organizationId: 'org1'
      },
      {
        id: 'user2',
        name: 'Jane Smith',
        email: 'jane@acme.com',
        role: 'manager',
        organizationId: 'org1'
      }
    ]
  }
];