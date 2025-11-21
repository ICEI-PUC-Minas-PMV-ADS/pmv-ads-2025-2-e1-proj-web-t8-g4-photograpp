import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { defaultProjects } from '../../../utils/mocks/projectsMock';

export function useProjects() {
  const [projects, setProjects, isInitialized] = useLocalStorage(
    'projects',
    defaultProjects,
    true
  );

  const addProject = (newProject) => {
    if (!isInitialized) return;
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = (projectId, updates) => {
    if (!isInitialized) return;
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
  };

  const updateProjectStatus = (projectId, newStatus) => {
    updateProject(projectId, { status: newStatus });
  };

  const deleteProject = (projectId) => {
    if (!isInitialized) return;
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  const getProjectById = (projectId) => {
    return projects.find((project) => project.id === projectId);
  };

  const getProjectsByStatus = (status) => {
    return projects.filter((project) => project.status === status);
  };

  return {
    projects,
    addProject,
    updateProject,
    updateProjectStatus,
    deleteProject,
    getProjectById,
    getProjectsByStatus,
    setProjects,
    isInitialized,
  };
}
