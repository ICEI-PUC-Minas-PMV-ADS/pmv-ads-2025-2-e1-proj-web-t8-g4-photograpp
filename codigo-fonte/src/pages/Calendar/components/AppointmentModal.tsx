import { useEffect, useState } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import './AppointmentModal.css';

export default function AppointmentModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  item,
  initialDate = '',
}) {
  const isEditMode = !!item;

  const [projects] = useLocalStorage('projects', [], true);

  const [form, setForm] = useState({
    title: '',
    desc: '',
    date: '',
    type: 'event',
    projectId: '',
    responsible: '', 
  });

  useEffect(() => {
    if (item) {
      setForm({
        title: item.title || '',
        desc: item.desc || '',
        date: item.date || '',
        type: item.type || 'event',
        projectId: item.projectId || '',
        responsible: item.responsible || '',
      });
    } else if (initialDate) {
      setForm({
        title: '',
        desc: '',
        date: initialDate,
        type: 'event',
        projectId: '',
        responsible: '',
      });
    } else {
      setForm({
        title: '',
        desc: '',
        date: '',
        type: 'event',
        projectId: '',
        responsible: '',
      });
    }
  }, [item, initialDate, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.date) return;

    const dataToSave = isEditMode
      ? { ...item, ...form }
      : { ...form, id: Date.now().toString() };

    onSave(dataToSave);
    handleClose();
  };

  const handleDelete = () => {
    if (item?.id && window.confirm('Tem certeza que deseja excluir?')) {
      onDelete(item.id);
      handleClose();
    }
  };

  const handleClose = () => {
    setForm({ title: '', desc: '', date: '', type: 'event', projectId: '', responsible: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="appointment-modal__overlay" onClick={handleClose}>
      <div
        className="appointment-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="appointment-modal__header">
          <h3 className="appointment-modal__title">
            {isEditMode ? 'Editar compromisso' : 'Novo compromisso'}
          </h3>
          <button
            type="button"
            className="appointment-modal__close-btn"
            onClick={handleClose}
            aria-label="Fechar"
          >
            <span className="appointment-modal__close-btn-icon">×</span>
          </button>
        </div>

        <form className="appointment-modal__form" onSubmit={handleSubmit}>
          <label className="appointment-modal__label">
            Título
            <input
              type="text"
              name="title"
              className="appointment-modal__input"
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Reunião com cliente"
              required
            />
          </label>

          <div className="appointment-modal__form-row">
            <label className="appointment-modal__label">
              Deadline
              <input
                type="date"
                name="date"
                className="appointment-modal__input appointment-modal__input--date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </label>

            <label className="appointment-modal__label">
              Tipo
              <select
                name="type"
                className="appointment-modal__select"
                value={form.type}
                onChange={handleChange}
              >
                <option value="event">Evento</option>
                <option value="task">Tarefa</option>
                <option value="note">Lembrete</option>
              </select>
            </label>
          </div>

          <label className="appointment-modal__label">
            Projeto (opcional)
            <select
              name="projectId"
              className="appointment-modal__select"
              value={form.projectId}
              onChange={handleChange}
            >
              <option value="">Nenhum projeto</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.titulo}
                </option>
              ))}
            </select>
          </label>

          <label className="appointment-modal__label">
            Responsável
            <input
              type="text"
              name="responsible"
              className="appointment-modal__input"
              value={form.responsible}
              onChange={handleChange}
              placeholder="Nome do responsável"
            />
          </label>

          <label className="appointment-modal__label">
            Descrição
            <textarea
              name="desc"
              className="appointment-modal__textarea"
              value={form.desc}
              onChange={handleChange}
              placeholder="Detalhes adicionais..."
              rows={4}
            />
          </label>

          <div className="appointment-modal__actions">
            {isEditMode && (
              <div className="appointment-modal__actions-left">
                <button
                  type="button"
                  className="appointment-modal__btn appointment-modal__btn--danger"
                  onClick={handleDelete}
                >
                  Excluir
                </button>
              </div>
            )}
            <div className="appointment-modal__actions-right">
              <button
                type="submit"
                className="appointment-modal__btn appointment-modal__btn--primary"
              >
                {isEditMode ? 'Salvar alterações' : 'Criar compromisso'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}