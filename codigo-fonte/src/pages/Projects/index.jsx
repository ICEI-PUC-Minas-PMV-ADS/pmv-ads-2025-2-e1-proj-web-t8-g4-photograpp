import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Breadcrumb from '../../components/Breadcrumb';
import NewProjectModal from './components/NewProjectModal';
import ProjectCard from './components/ProjectCard';
import { useProjects } from './hooks/useProjects';
import './styles.css';

export default function Projects() {
  const { projects, addProject, updateProjectStatus, isInitialized } =
    useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  function handleNewProject(newProject) {
    addProject(newProject);
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
            onClick={() => setIsModalOpen(true)}
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
          />
        ))}
      </section>

      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleNewProject}
      />
    </div>
  );
}
