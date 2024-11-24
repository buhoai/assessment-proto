import { Standard } from '../types';

export const standards: Standard[] = [
  {
    id: 'iso27001',
    name: 'ISO 27001',
    description: 'Information Security Management System Standard',
    initialQuestion: 'scope',
    questions: {
      scope: {
        id: 'scope',
        text: 'Has the organization defined the scope of the ISMS?',
        type: 'boolean',
        required: true,
        nextQuestion: {
          'true': 'leadership',
          'false': 'scopeAcknowledge'
        }
      },
      scopeAcknowledge: {
        id: 'scopeAcknowledge',
        text: 'A defined scope is required before proceeding with ISO 27001 implementation.',
        type: 'acknowledge',
        nextQuestion: { 'acknowledged': null }
      },
      leadership: {
        id: 'leadership',
        text: 'Which security policies have been established by leadership?',
        type: 'multiSelect',
        options: [
          { id: 'policy1', label: 'Information Security Policy' },
          { id: 'policy2', label: 'Access Control Policy' },
          { id: 'policy3', label: 'Data Protection Policy' },
          { id: 'policy4', label: 'Incident Management Policy' }
        ],
        nextQuestion: { '*': 'riskAssessment' }
      },
      riskAssessment: {
        id: 'riskAssessment',
        text: 'What is the current state of risk assessment?',
        type: 'singleSelect',
        options: [
          { id: 'none', label: 'Not Started' },
          { id: 'partial', label: 'In Progress' },
          { id: 'complete', label: 'Completed' }
        ],
        nextQuestion: {
          'none': 'riskAcknowledge',
          'partial': 'riskAcknowledge',
          'complete': null
        }
      },
      riskAcknowledge: {
        id: 'riskAcknowledge',
        text: 'A complete risk assessment is required for ISO 27001 certification.',
        type: 'acknowledge',
        nextQuestion: { 'acknowledged': null }
      }
    }
  }
];