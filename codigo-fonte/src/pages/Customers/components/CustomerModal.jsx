import { useEffect, useState } from 'react';
import { FiTrash2, FiX } from 'react-icons/fi';
import { applyPhoneMask } from '../../../utils/helpers/masks';
import './CustomerModal.css';

export default function CustomerModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  customer,
  mode = 'create', // 'create' | 'edit' | 'view'
}) {
  const isEdit = mode === 'edit';
  const isView = mode === 'view';

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    contato: '',
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        nome: customer.nome || '',
        email: customer.email || '',
        contato: customer.contato || '',
      });
    } else {
      setFormData({ nome: '', email: '', contato: '' });
    }
  }, [customer, isOpen]);

  const handleChange = (e) => {
    if (isView) return;
    const { name, value } = e.target;
    let nextValue = value;
    if (name === 'contato') {
      nextValue = applyPhoneMask(value);
    }
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.contato) {
      alert('Todos os campos são obrigatórios');
      return;
    }
    if (isEdit) {
      onSave({ ...customer, ...formData });
    } else {
      onSave({ id: Date.now(), ...formData });
    }
    handleClose();
  }

  function handleDelete() {
    if (!customer) return;
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      onDelete(customer.id);
      handleClose();
    }
  }

  function handleClose() {
    setFormData({ nome: '', email: '', contato: '' });
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="customer-modal__overlay" onClick={handleClose}>
      <div
        className="customer-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="customer-modal__header">
          <h2 className="customer-modal__title">
            {isView
              ? 'Visualizar Cliente'
              : isEdit
              ? 'Editar Cliente'
              : 'Novo Cliente'}
          </h2>
          <button
            type="button"
            className="customer-modal__close-btn"
            onClick={handleClose}
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="customer-modal__form">
          <div className="customer-modal__form-group">
            <label htmlFor="nome" className="customer-modal__label">
              Nome *
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              className="customer-modal__input"
              value={formData.nome}
              onChange={handleChange}
              disabled={isView}
              placeholder="Nome do cliente"
              required
            />
          </div>

          <div className="customer-modal__form-group">
            <label htmlFor="email" className="customer-modal__label">
              E-mail *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="customer-modal__input"
              value={formData.email}
              onChange={handleChange}
              disabled={isView}
              placeholder="email@exemplo.com"
              required
            />
          </div>

          <div className="customer-modal__form-group">
            <label htmlFor="contato" className="customer-modal__label">
              Contato *
            </label>
            <input
              id="contato"
              name="contato"
              type="text"
              className="customer-modal__input"
              value={formData.contato}
              onChange={handleChange}
              disabled={isView}
              placeholder="(00) 0 0000-0000"
              required
            />
          </div>

          <div className="customer-modal__actions">
            {isEdit && (
              <button
                type="button"
                className="customer-modal__btn customer-modal__btn--danger"
                onClick={handleDelete}
              >
                <FiTrash2 />
                Excluir
              </button>
            )}
            {isView && (
              <button
                type="button"
                className="customer-modal__btn customer-modal__btn--secondary"
                onClick={() => {
                  onClose();
                  setTimeout(() => {}, 0);
                }}
                disabled
                title="Use o botão Editar na tabela"
              >
                Somente leitura
              </button>
            )}
            <div className="customer-modal__actions-right">
              <button
                type="button"
                className="customer-modal__btn customer-modal__btn--secondary"
                onClick={handleClose}
              >
                {isView ? 'Fechar' : 'Cancelar'}
              </button>
              {!isView && (
                <button
                  type="submit"
                  className="customer-modal__btn customer-modal__btn--primary"
                >
                  {isEdit ? 'Salvar Alterações' : 'Salvar Cliente'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
