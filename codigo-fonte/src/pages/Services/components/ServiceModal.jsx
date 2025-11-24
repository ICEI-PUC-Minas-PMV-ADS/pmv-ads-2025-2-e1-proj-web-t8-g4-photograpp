import { useEffect, useState } from 'react';
import { FiTrash2, FiX } from 'react-icons/fi';
import { applyCurrencyMask } from '../../../utils/helpers/masks';
import './ServiceModal.css';

export default function ServiceModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  service,
}) {
  const isEditMode = !!service;

  const [formData, setFormData] = useState({
    titulo: '',
    preco: '',
    numeroFotos: '',
    descricao: '',
  });

  useEffect(() => {
    if (service && isOpen) {
      setFormData({
        titulo: service.titulo || '',
        preco: service.preco || '',
        numeroFotos: service.numeroFotos?.toString() || '',
        descricao: service.descricao || '',
      });
    } else if (isOpen) {
      setFormData({
        titulo: '',
        preco: '',
        numeroFotos: '',
        descricao: '',
      });
    }
  }, [service, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let next = value;
    if (name === 'preco') next = applyCurrencyMask(value);
    if (name === 'numeroFotos') next = next.replace(/\D/g, '');
    setFormData((prev) => ({ ...prev, [name]: next }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo || !formData.preco || !formData.numeroFotos) {
      alert('Preencha os campos obrigatórios.');
      return;
    }
    const payload = {
      id: isEditMode && service ? service.id : Date.now(),
      titulo: formData.titulo.trim(),
      preco: formData.preco,
      numeroFotos: Number(formData.numeroFotos),
      descricao: formData.descricao.trim(),
    };
    onSave(payload);
    handleClose();
  };

  const handleDelete = () => {
    if (!service) return;
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      onDelete(service.id);
      handleClose();
    }
  };

  function handleClose() {
    setFormData({
      titulo: '',
      preco: '',
      numeroFotos: '',
      descricao: '',
    });
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="service-modal__overlay" onClick={handleClose}>
      <div
        className="service-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="service-modal__header">
          <h2 className="service-modal__title">
            {isEditMode ? 'Editar Serviço' : 'Novo Serviço'}
          </h2>
          <button
            type="button"
            className="service-modal__close-btn"
            onClick={handleClose}
          >
            <FiX />
          </button>
        </div>

        <form className="service-modal__form" onSubmit={handleSubmit}>
          <div className="service-modal__form-group">
            <label className="service-modal__label" htmlFor="titulo">
              Título *
            </label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              className="service-modal__input"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Nome do serviço"
              required
            />
          </div>

          <div className="service-modal__row">
            <div className="service-modal__form-group">
              <label className="service-modal__label" htmlFor="preco">
                Preço *
              </label>
              <input
                id="preco"
                name="preco"
                type="text"
                className="service-modal__input"
                value={formData.preco}
                onChange={handleChange}
                placeholder="R$ 0,00"
                required
              />
            </div>
            <div className="service-modal__form-group">
              <label className="service-modal__label" htmlFor="numeroFotos">
                Nº Fotos *
              </label>
              <input
                id="numeroFotos"
                name="numeroFotos"
                type="text"
                className="service-modal__input"
                value={formData.numeroFotos}
                onChange={handleChange}
                placeholder="Ex: 20"
                required
              />
            </div>
          </div>

          <div className="service-modal__form-group">
            <label className="service-modal__label" htmlFor="descricao">
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              className="service-modal__textarea"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Detalhes do serviço"
              rows={4}
            />
          </div>

          <div className="service-modal__actions">
            {isEditMode && (
              <button
                type="button"
                className="service-modal__btn service-modal__btn--danger"
                onClick={handleDelete}
              >
                <FiTrash2 />
                Excluir
              </button>
            )}
            <div className="service-modal__actions-right">
              <button
                type="button"
                className="service-modal__btn service-modal__btn--secondary"
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="service-modal__btn service-modal__btn--primary"
              >
                {isEditMode ? 'Salvar Alterações' : 'Salvar Serviço'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}