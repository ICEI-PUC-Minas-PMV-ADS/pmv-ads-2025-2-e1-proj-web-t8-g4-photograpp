import Breadcrumb from "../../components/Breadcrumb";
import "./styles.css";
import { useState, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiTrash2,
  FiEdit,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import FinanceForm from "./financeForm";

export default function Finance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("entrada");

  useEffect(() => {
    const saved = localStorage.getItem("financeEntries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("financeEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => {
    setEntries([...entries, { ...entry, value: Number(entry.value) }]);
  };

  const totalEntradas = entries
    .filter((e) => e.type === "entrada")
    .reduce((sum, e) => sum + Number(e.value || 0), 0);
  const totalSaidas = entries
    .filter((e) => e.type === "saida")
    .reduce((sum, e) => sum + Number(e.value || 0), 0);

  const totalEmCaixa = totalEntradas - totalSaidas;

  const deleteEntry = (idx) => {
    setEntries(entries.filter((_, i) => i !== idx));
  };

  const [editIdx, setEditIdx] = useState(null);

  return (
    <>
      <section className="customers__top">
        <div>
          <h1>Financeiro</h1>
          <Breadcrumb />
        </div>
        <div className="customers__actions">
          <div className="customers__search-wrapper">
            <input
              type="text"
              className="customers__search"
              placeholder="Digite o termo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="customers__search-icon" />
          </div>
          <button className="customers-filter">
            <FiFilter className="customers__filter-icon" />
          </button>
          <button
            className="customers__button customers__button--primary"
            onClick={() => {
              setModalType("entrada");
              setModalOpen(true);
            }}
          >
            Novo registro
          </button>
        </div>
      </section>
      {modalOpen && (
        <FinanceForm
          addEntry={addEntry}
          onClose={() => {
            setModalOpen(false);
            setEditIdx(null);
          }}
          defaultType={modalType}
          initialData={editIdx !== null ? entries[editIdx] : undefined}
          onEdit={(updatedEntry) => {
            setEntries(
              entries.map((e, i) =>
                i === editIdx
                  ? { ...updatedEntry, value: Number(updatedEntry.value) }
                  : e
              )
            );
            setEditIdx(null);
            setTimeout(() => setModalOpen(false), 0);
          }}
        />
      )}
      <section className="finance__resume">
        <div className="finance__card">
          <h2>Total em caixa</h2>
          <p>
            R${" "}
            {totalEmCaixa.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="finance__card">
          <h2>Total de entradas</h2>
          <p>
            R${" "}
            {totalEntradas.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="finance__card">
          <h2>Total de saídas</h2>
          <p>
            R${" "}
            {totalSaidas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </section>
      <section className="finance__table">
        <div className="table_selector">
          <div className="mounth_selector">
            Setembro de 2025
            <button className="customers-filter">
              <FiChevronLeft className="customers__filter-icon" />
            </button>
            <button className="customers-filter">
              <FiChevronRight className="customers__filter-icon" />
            </button>
          </div>
          <div className="registros">
            <span>Mostrar</span>
            <select className="caixaRegistros">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            <span>registros</span>
          </div>
        </div>
        <table id="customersTable">
          <thead>
            <tr>
              <th className="col10">Data</th>
              <th className="col40">Descrição</th>
              <th className="col15">Entrada</th>
              <th className="col15">Saída</th>
              <th className="col15">Total</th>
              <th className="tableHeaderCenter col10">Ações</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              (() => {
                let saldoAcumulado = 0;
                return entries.map((entry, idx) => {
                  const valor = Number(entry.value) || 0;
                  if (entry.type === "entrada") {
                    saldoAcumulado += valor;
                  } else if (entry.type === "saida") {
                    saldoAcumulado -= valor;
                  }
                  return (
                    <tr key={idx}>
                      <td>
                        {entry.date
                          ? new Date(entry.date).toLocaleDateString("pt-BR")
                          : ""}
                      </td>
                      <td>{entry.description}</td>
                      <td>
                        {entry.type === "entrada"
                          ? `R$ ${valor.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}`
                          : "R$ 0,00"}
                      </td>
                      <td>
                        {entry.type === "saida"
                          ? `R$ ${valor.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}`
                          : "R$ 0,00"}
                      </td>
                      <td>
                        R${" "}
                        {saldoAcumulado.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-button"
                            onClick={() => deleteEntry(idx)}
                          >
                            <FiTrash2 title="Excluir" />
                          </button>
                          <button
                            className="action-button"
                            onClick={() => {
                              setEditIdx(idx);
                              setModalType(entry.type);
                              setModalOpen(true);
                            }}
                          >
                            <FiEdit title="Editar" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                });
              })()
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
