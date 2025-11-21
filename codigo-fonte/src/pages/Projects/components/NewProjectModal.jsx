import { useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import { STATUS_OPTIONS } from '../../../utils/constants/projectStatus';
import './NewProjectModal.css';
import { packageOptions } from '../../../utils/mocks/projectsMock';

export default function NewProjectModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    titulo: '',
    dataSessao: '',
    pacote: '',
    cliente: '',
    status: 'Lead',
  });

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

    const newProject = {
      id: Date.now(),
      ...formData,
    };

    onSave(newProject);
    setFormData({
      titulo: '',
      dataSessao: '',
      pacote: '',
      cliente: '',
      status: 'Lead',
    });
    onClose();
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
    <div className="new-project-modal__overlay" onClick={handleClose}>
      <div
        className="new-project-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="new-project-modal__header">
          <h2 className="new-project-modal__title">Novo Projeto</h2>
          <button
            type="button"
            className="new-project-modal__close-btn"
            onClick={handleClose}
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="new-project-modal__form">
          <div className="new-project-modal__form-group">
            <label htmlFor="titulo" className="new-project-modal__label">
              Título do Projeto *
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className="new-project-modal__input"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ex: Book Infantil Maria"
              required
            />
          </div>

          <div className="new-project-modal__form-group">
            <label htmlFor="dataSessao" className="new-project-modal__label">
              Data da Sessão *
            </label>
            <input
              type="date"
              id="dataSessao"
              name="dataSessao"
              className="new-project-modal__input"
              value={formData.dataSessao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="new-project-modal__form-group">
            <label htmlFor="pacote" className="new-project-modal__label">
              Pacote *
            </label>
            <div className="new-project-modal__select-wrapper">
              <select
                id="pacote"
                name="pacote"
                className="new-project-modal__select"
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
              <FiChevronDown className="new-project-modal__select-icon" />
            </div>
          </div>

          <div className="new-project-modal__form-group">
            <label htmlFor="cliente" className="new-project-modal__label">
              Cliente *
            </label>
            <input
              type="text"
              id="cliente"
              name="cliente"
              className="new-project-modal__input"
              value={formData.cliente}
              onChange={handleChange}
              placeholder="Nome do cliente"
              required
            />
          </div>

          <div className="new-project-modal__form-group">
            <label htmlFor="status" className="new-project-modal__label">
              Status
            </label>
            <div className="new-project-modal__select-wrapper">
              <select
                id="status"
                name="status"
                className="new-project-modal__select"
                value={formData.status}
                onChange={handleChange}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FiChevronDown className="new-project-modal__select-icon" />
            </div>
          </div>

          <div className="new-project-modal__actions">
            <button
              type="button"
              className="new-project-modal__btn new-project-modal__btn--secondary"
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="new-project-modal__btn new-project-modal__btn--primary"
            >
              Salvar Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}