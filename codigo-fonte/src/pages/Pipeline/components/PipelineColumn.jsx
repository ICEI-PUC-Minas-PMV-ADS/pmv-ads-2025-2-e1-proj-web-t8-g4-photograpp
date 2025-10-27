import { useState } from 'react';
import ProjectCard from '../../Projects/components/ProjectCard';
import './PipelineColumn.css';

export default function PipelineColumn({ title, projects, onStatusChange }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e, project) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(project));
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    try {
      const projectData = JSON.parse(e.dataTransfer.getData('text/plain'));

      if (projectData.status !== title) {
        onStatusChange(projectData.id, title);
      }
    } catch (error) {
      console.error('Erro ao processar drop:', error);
    }
  };

  return (
    <div
      className={`pipeline-column${
        isDragOver ? ' pipeline-column--drag-over' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="pipeline-column__header">
        <h3 className="pipeline-column__title">{title}</h3>
      </div>

      <div className="pipeline-column__content">
        {projects.length === 0 ? (
          <div className="pipeline-column__empty">
            <p>Nenhum projeto nesta etapa</p>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="pipeline-column__card-wrapper"
              draggable
              onDragStart={(e) => handleDragStart(e, project)}
              onDragEnd={handleDragEnd}
            >
              <ProjectCard
                titulo={project.titulo}
                dataSessao={project.dataSessao}
                pacote={project.pacote}
                cliente={project.cliente}
                status={project.status}
                onStatusChange={(newStatus) =>
                  onStatusChange(project.id, newStatus)
                }
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
