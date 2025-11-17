import { useState, useEffect } from "react";

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
  onClose(); // Fecha o modal depois de resetar o formulário
};

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar {form.type === "entrada" ? "Receita" : "Despesa"}</h2>
        <form
          onSubmit={handleFormSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={form.description}
            onChange={handleFormChange}
            required
          />
          <input
            type="number"
            name="value"
            placeholder="Valor"
            value={form.value}
            onChange={handleFormChange}
            required
            min="0"
            step="0.01"
          />
          <select name="type" value={form.type} onChange={handleFormChange}>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button type="submit">Adicionar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}