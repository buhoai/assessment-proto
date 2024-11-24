export type QuestionType = 'boolean' | 'multiSelect' | 'singleSelect' | 'acknowledge';
export type UserRole = 'admin' | 'manager' | 'assessor' | 'viewer';

export interface Option {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: Option[];
  nextQuestion?: {
    [key: string]: string | null;
  };
  required?: boolean;
}

export interface Standard {
  id: string;
  name: string;
  description: string;
  questions: { [key: string]: Question };
  initialQuestion: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId: string;
}

export interface Organization {
  id: string;
  name: string;
  description?: string;
  users: User[];
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  organizationId: string;
  standardId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  assignedUsers: string[]; // User IDs
  createdAt: string;
  updatedAt: string;
}

export interface Assessment {
  id: string;
  projectId: string;
  standardId: string;
  answers: {
    [questionId: string]: boolean | string[] | string;
  };
  completedBy: string; // User ID
  completedAt: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
}