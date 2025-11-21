import { useState, useEffect } from "react";
import './financeForm.css';
import { FiChevronDown, FiX } from 'react-icons/fi';

export default function FinanceForm({
  addEntry,
  onClose,
  defaultType,
  initialData,
  onEdit,
}) {
  const [form, setForm] = useState(
    initialData || {
      date: "",
      description: "",
      value: "",
      type: defaultType || "entrada",
    }
  );

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        date: "",
        description: "",
        value: "",
        type: defaultType || "entrada",
      });
    }
  }, [initialData, defaultType]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleFormSubmit = (e) => {
  e.preventDefault();
  if (!form.date || !form.description || !form.value) return;
  if (initialData) {
    onEdit(form);
  } else {
    addEntry(form);
  }
  setForm({
    date: "",
    description: "",
    value: "",
    type: defaultType || "entrada",
  });
  onClose(); 
};

const handleClose = () => {
    setForm({
      date: "",
      description: "",
      value: "",
      type: defaultType || "entrada",
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>Adicionar {form.type === "entrada" ? "Receita" : "Despesa"}</h2>
          <button
              type="button"
              className="modal__close-btn"
              onClick={handleClose}>
              <FiX />
          </button>
        </div>
        <form className="modal__form" onSubmit={handleFormSubmit}>
          <div className="modal__form-group">
            <label htmlFor="titulo" className="modal__label">
              Data *
            </label>
            <input type="date"name="date" className="date-icon-picker"
              value={form.date}
              onChange={handleFormChange}
              required/>
          </div>
          <div className="modal__form-group">
            <label htmlFor="titulo" className="modal__label">
              Descrição *
            </label>
            <input type="text" name="description" placeholder="Ex: Conta de luz"
              value={form.description}
              onChange={handleFormChange}
              required/>
          </div>
          <div className="modal__form-group">
            <label htmlFor="titulo" className="modal__label">
              Valor *
            </label>
            <input type="number" name="value" placeholder="0000,00"
              value={form.value}
              onChange={handleFormChange}
              required
              min="0"
              step="0.01"/>
          </div>
          <div className="modal__form-group">
            <label htmlFor="titulo" className="modal__label">
              Tipo *
            </label>
            <select name="type" value={form.type} onChange={handleFormChange}>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>
          <div className="modal__actions">
            <button type="button" onClick={onClose}
            className="modal__btn--secondary">
              Cancelar
            </button>
            <button type="submit">Adicionar</button>
          </div>
        </form>
      </div>
    </div>
  );
}