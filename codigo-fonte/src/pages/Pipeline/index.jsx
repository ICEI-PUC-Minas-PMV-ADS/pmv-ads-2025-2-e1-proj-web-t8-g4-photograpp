import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Breadcrumb from '../../components/Breadcrumb';
import { STATUS_OPTIONS } from '../../utils/constants/projectStatus';
import NewProjectModal from '../Projects/components/ProjectModal';
import { useProjects } from '../Projects/hooks/useProjects';
import PipelineColumn from './components/PipelineColumn';
import './styles.css';

export default function Pipeline() {
  const { projects, addProject, updateProject, updateProjectStatus, deleteProject, isInitialized } =
    useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  if (!isInitialized) {
    return (
      <div className="pipeline">
        <div className="pipeline__header">
          <div className="pipeline__header-left">
            <h1>Pipeline</h1>
            <Breadcrumb />
          </div>
        </div>
        <div className="pipeline__loading">Carregando pipeline...</div>
      </div>
    );
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProjectsByStatus = (status) => {
    return filteredProjects.filter((project) => project.status === status);
  };

  const handleStatusChange = (projectId, newStatus) => {
    updateProjectStatus(projectId, newStatus);
  };

  const handleNewProject = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleSaveProject = (projectData) => {
    if (selectedProject) {
      updateProject(projectData.id, projectData);
    } else {
      addProject(projectData);
    }
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleDeleteProject = (projectId) => {
    deleteProject(projectId);
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="pipeline">
      <div className="pipeline__top">
        <div>
          <h1>Pipeline de Produção</h1>
          <Breadcrumb />
        </div>
        <div className="pipeline__actions">
          <div className="pipeline__search-wrapper">
            <input
              type="text"
              className="pipeline__search"
              placeholder="Nome do projeto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="pipeline__search-icon" />
          </div>
          <button
            className="pipeline__button pipeline__button--primary"
            onClick={handleNewProject}
          >
            Novo projeto
          </button>
        </div>
      </div>

      <div className="pipeline__board">
        {STATUS_OPTIONS.map((status) => (
          <PipelineColumn
            key={status}
            title={status}
            projects={getProjectsByStatus(status)}
            onStatusChange={handleStatusChange}
            onCardClick={handleEditProject}
          />
        ))}
      </div>

      <NewProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProject}
        onDelete={handleDeleteProject}
        project={selectedProject}
      />
    </div>
  );
}