import React, { useState } from 'react';
import { Layout, Users, ClipboardList, Settings } from 'lucide-react';
import { organizations as initialOrgs } from './data/organizations';
import { projects as initialProjects } from './data/projects';
import { standards as initialStandards } from './data/standards';
import Navigation from './components/navigation/Navigation';
import OrganizationDashboard from './components/organization/OrganizationDashboard';
import ProjectDashboard from './components/project/ProjectDashboard';
import StandardManager from './components/management/StandardManager';
import { Organization, Project, Standard } from './types';

type View = 'organizations' | 'projects' | 'standards';

function App() {
  const [currentView, setCurrentView] = useState<View>('organizations');
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrgs);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [standards, setStandards] = useState<Standard[]>(initialStandards);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);

  const navigation = [
    { id: 'organizations', label: 'Organizations', icon: Users },
    { id: 'projects', label: 'Projects', icon: ClipboardList },
    { id: 'standards', label: 'Standards', icon: Settings },
  ];

  const handleUpdateOrganization = (updatedOrg: Organization) => {
    setOrganizations(orgs => 
      orgs.map(org => org.id === updatedOrg.id ? updatedOrg : org)
    );
  };

  const handleAddProject = (newProject: Project) => {
    setProjects([...projects, newProject]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projs => 
      projs.map(proj => proj.id === updatedProject.id ? updatedProject : proj)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Layout className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Project Assessment Manager</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Navigation
          items={navigation}
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view as View);
            if (view !== 'organizations') {
              setSelectedOrgId(null);
            }
          }}
        />

        <main className="mt-8">
          {currentView === 'organizations' && (
            <OrganizationDashboard
              organizations={organizations}
              projects={projects}
              selectedOrgId={selectedOrgId}
              onSelectOrg={setSelectedOrgId}
              onUpdateOrg={handleUpdateOrganization}
            />
          )}

          {currentView === 'projects' && (
            <ProjectDashboard
              projects={projects}
              organizations={organizations}
              standards={standards}
              onAddProject={handleAddProject}
              onUpdateProject={handleUpdateProject}
            />
          )}

          {currentView === 'standards' && (
            <StandardManager
              standards={standards}
              onUpdate={setStandards}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;