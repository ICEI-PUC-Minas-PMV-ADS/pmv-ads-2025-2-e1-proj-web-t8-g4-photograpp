import { useEffect, useState } from 'react';
import { FiChevronDown, FiTrash2, FiX } from 'react-icons/fi';
import { STATUS_OPTIONS } from '../../../utils/constants/projectStatus';
import {
  formatDateToBR,
  formatDateToInput,
} from '../../../utils/helpers/helpers';
import { packageOptions } from '../../../utils/mocks/projectsMock';
import './ProjectModal.css';

export default function ProjectModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  project,
}) {
  const isEditMode = !!project;

  const [formData, setFormData] = useState({
    titulo: '',
    dataSessao: '',
    pacote: '',
    cliente: '',
    status: 'Lead',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        titulo: project.titulo || '',
        dataSessao: formatDateToInput(project.dataSessao) || '',
        pacote: project.pacote || '',
        cliente: project.cliente || '',
        status: project.status || 'Lead',
      });
    } else {
      setFormData({
        titulo: '',
        dataSessao: '',
        pacote: '',
        cliente: '',
        status: 'Lead',
      });
    }
  }, [project, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.titulo ||
      !formData.dataSessao ||
      !formData.pacote ||
      !formData.cliente
    ) {
      alert('Todos os campos são obrigatórios');
      return;
    }

    const projectData = {
      ...formData,
      dataSessao: formatDateToBR(formData.dataSessao),
    };

    if (isEditMode) {
      onSave({
        ...project,
        ...projectData,
      });
    } else {
      const newProject = {
        id: Date.now(),
        ...projectData,
      };
      onSave(newProject);
    }

    handleClose();
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      onDelete(project.id);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      titulo: '',
      dataSessao: '',
      pacote: '',
      cliente: '',
      status: 'Lead',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="project-modal__overlay" onClick={handleClose}>
      <div
        className="project-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-modal__header">
          <h2 className="project-modal__title">
            {isEditMode ? 'Editar Projeto' : 'Novo Projeto'}
          </h2>
          <button
            type="button"
            className="project-modal__close-btn"
            onClick={handleClose}
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="project-modal__form">
          <div className="project-modal__form-group">
            <label htmlFor="titulo" className="project-modal__label">
              Título do Projeto *
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className="project-modal__input"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ex: Book Infantil Maria"
              required
            />
          </div>

          <div className="project-modal__form-group">
            <label htmlFor="dataSessao" className="project-modal__label">
              Data da Sessão *
            </label>
            <input
              type="date"
              id="dataSessao"
              name="dataSessao"
              className="project-modal__input"
              value={formData.dataSessao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="project-modal__form-group">
            <label htmlFor="pacote" className="project-modal__label">
              Pacote *
            </label>
            <div className="project-modal__select-wrapper">
              <select
                id="pacote"
                name="pacote"
                className="project-modal__select"
                value={formData.pacote}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um pacote</option>
                {packageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FiChevronDown className="project-modal__select-icon" />
            </div>
          </div>

          <div className="project-modal__form-group">
            <label htmlFor="cliente" className="project-modal__label">
              Cliente *
            </label>
            <input
              type="text"
              id="cliente"
              name="cliente"
              className="project-modal__input"
              value={formData.cliente}
              onChange={handleChange}
              placeholder="Nome do cliente"
              required
            />
          </div>

          <div className="project-modal__form-group">
            <label htmlFor="status" className="project-modal__label">
              Status
            </label>
            <div className="project-modal__select-wrapper">
              <select
                id="status"
                name="status"
                className="project-modal__select"
                value={formData.status}
                onChange={handleChange}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FiChevronDown className="project-modal__select-icon" />
            </div>
          </div>

          <div className="project-modal__actions">
            {isEditMode && (
              <button
                type="button"
                className="project-modal__btn project-modal__btn--danger"
                onClick={handleDelete}
              >
                <FiTrash2 />
                Excluir
              </button>
            )}
            <div className="project-modal__actions-right">
              <button
                type="button"
                className="project-modal__btn project-modal__btn--secondary"
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="project-modal__btn project-modal__btn--primary"
              >
                {isEditMode ? 'Salvar Alterações' : 'Salvar Projeto'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
