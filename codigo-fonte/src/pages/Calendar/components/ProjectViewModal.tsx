import './ProjectViewModal.css';

export default function ProjectViewModal({ isOpen, onClose, project }) {
  if (!isOpen || !project) return null;

  return (
    <div className="project-view-modal__overlay" onClick={onClose}>
      <div
        className="project-view-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-view-modal__header">
          <h3 className="project-view-modal__title">Evento do Projeto</h3>
          <button
            type="button"
            className="project-view-modal__close-btn"
            onClick={onClose}
            aria-label="Fechar"
          >
            <span className="project-view-modal__close-btn-icon">×</span>
          </button>
        </div>

        <div className="project-view-modal__alert">
          ⚠️ Este evento do projeto só pode ser editado na página de Projetos
        </div>

        <div className="project-view-modal__info">
          <div className="project-view-modal__field">
            <label>Título</label>
            <div className="project-view-modal__value">{project.titulo}</div>
          </div>

          <div className="project-view-modal__field">
            <label>Data da Sessão</label>
            <div className="project-view-modal__value">
              {project.dataSessao}
            </div>
          </div>

          <div className="project-view-modal__field">
            <label>Cliente</label>
            <div className="project-view-modal__value">{project.cliente}</div>
          </div>

          <div className="project-view-modal__field">
            <label>Pacote</label>
            <div className="project-view-modal__value">{project.pacote}</div>
          </div>

          <div className="project-view-modal__field">
            <label>Status</label>
            <div className="project-view-modal__value">{project.status}</div>
          </div>
        </div>

        <div className="project-view-modal__actions">
          <button
            type="button"
            className="project-view-modal__btn project-view-modal__btn--primary"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
