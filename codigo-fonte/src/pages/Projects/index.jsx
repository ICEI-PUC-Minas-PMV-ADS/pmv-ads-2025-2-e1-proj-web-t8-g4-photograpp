import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Breadcrumb from '../../components/Breadcrumb';
import ProjectModal from './components/ProjectModal';
import ProjectCard from './components/ProjectCard';
import { useProjects } from './hooks/useProjects';
import './styles.css';

export default function Projects() {
  const { projects, addProject, updateProject, updateProjectStatus, deleteProject, isInitialized } =
    useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isInitialized) {
    return (
      <div className="projects">
        <div className="projects__top">
          <div>
            <h1>Projetos</h1>
            <Breadcrumb />
          </div>
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Carregando projetos...
        </div>
      </div>
    );
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleStatusChange(projectId, newStatus) {
    updateProjectStatus(projectId, newStatus);
  }

  function handleSaveProject(projectData) {
    if (selectedProject) {
      updateProject(projectData.id, projectData);
    } else {
      addProject(projectData);
    }
  }

  function handleDeleteProject(projectId) {
    deleteProject(projectId);
  }

  function handleCardClick(project) {
    setSelectedProject(project);
    setIsModalOpen(true);
  }

  function handleNewProject() {
    setSelectedProject(null);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedProject(null);
  }

  return (
    <div className="projects">
      <div className="projects__top">
        <div>
          <h1>Projetos</h1>
          <Breadcrumb />
        </div>
        <div className="projects__actions">
          <div className="projects__search-wrapper">
            <input
              type="text"
              className="projects__search"
              placeholder="Nome do projeto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="projects__search-icon" />
          </div>
          <button
            className="projects__button projects__button--primary"
            onClick={handleNewProject}
          >
            Novo projeto
          </button>
        </div>
      </div>

      <section className="projects__cards-grid">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            onStatusChange={(newStatus) =>
              handleStatusChange(project.id, newStatus)
            }
            onClick={() => handleCardClick(project)}
          />
        ))}
      </section>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProject}
        onDelete={handleDeleteProject}
        project={selectedProject}
      />
    </div>
  );
}