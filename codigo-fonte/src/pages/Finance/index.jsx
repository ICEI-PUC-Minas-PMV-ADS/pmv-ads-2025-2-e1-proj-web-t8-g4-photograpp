import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import Breadcrumb from "../../components/Breadcrumb";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { financeMock } from "../../utils/mocks/financeMock";
import FinanceForm from "./financeForm";
import "./styles.css";

export default function Finance() {
  const [entries, setEntries, , isInitialized] = useLocalStorage(
    "financeEntries",
    financeMock,
    true
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("entrada");

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const monthLabel = `${meses[selectedMonth - 1]} de ${selectedYear}`;

  function previousMonth() {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }

  function nextMonth() {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }

  const addEntry = (entry) => {
    const newEntry = {
      ...entry,
      value: Number(entry.value),
      id: Date.now() + Math.random(), // Adiciona ID único
    };
    const newList = [...entries, newEntry];

    newList.sort(
      (a, b) =>
        new Date(String(a.date)).getTime() - new Date(String(b.date)).getTime()
    );

    setEntries(newList);
  };

  const filteredEntries = entries.filter((entry) => {
    const d = new Date(entry.date + "T00:00:00");
    return (
      d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear
    );
  });

  function getSaldoAnterior() {
    const previousMonth = selectedMonth === 1 ? 12 : selectedMonth - 1;
    const previousYear = selectedMonth === 1 ? selectedYear - 1 : selectedYear;

    const entriesPreviousMonth = entries.filter((entry) => {
      const d = new Date(entry.date + "T00:00:00"); 
      return (
        d.getMonth() + 1 === previousMonth && d.getFullYear() === previousYear
      );
    });

    if (entriesPreviousMonth.length === 0) return 0;

    let saldo = 0;
    entriesPreviousMonth.forEach((e) => {
      const v = Number(e.value);
      if (e.type === "entrada") saldo += v;
      else saldo -= v;
    });

    return saldo;
  }
  const saldoAnterior = getSaldoAnterior();

  // Totais gerais (todos os meses)
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

  if (!isInitialized) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <section className="customers__top">
        <div>
          <h1>Financeiro</h1>
          <Breadcrumb />
        </div>
        <div>
          <button
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
            const updatedList = entries.map((e, i) =>
              i === editIdx
                ? {
                    ...updatedEntry,
                    value: Number(updatedEntry.value),
                    id: e.id,
                  }
                : e
            );

            updatedList.sort(
              (a, b) =>
                new Date(String(a.date) + "T00:00:00").getTime() -
                new Date(String(b.date) + "T00:00:00").getTime()
            );

            setEntries(updatedList);
            setEditIdx(null);
            setModalOpen(false);
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
            {monthLabel}
            <button className="customers-filter" onClick={previousMonth}>
              <FiChevronLeft className="customers__filter-icon" />
            </button>
            <button className="customers-filter" onClick={nextMonth}>
              <FiChevronRight className="customers__filter-icon" />
            </button>
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
            <tr>
              <td>{`01/${String(selectedMonth).padStart(
                2,
                "0"
              )}/${selectedYear}`}</td>
              <td>
                <strong>Saldo do mês anterior</strong>
              </td>
              <td>-</td>
              <td>-</td>
              <td>
                R${" "}
                {saldoAnterior.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td>-</td>
            </tr>

            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Ainda não há registros para este mês.
                </td>
              </tr>
            ) : (
              (() => {
                let saldoAcumulado = saldoAnterior;

                return filteredEntries.map((entry) => {
                  const valor = Number(entry.value) || 0;

                  if (entry.type === "entrada") saldoAcumulado += valor;
                  else if (entry.type === "saida") saldoAcumulado -= valor;

                  // Encontra o índice real no array completo usando o ID
                  const originalIndex = entries.findIndex(
                    (e) => e.id === entry.id
                  );

                  return (
                    <tr key={entry.id}>
                      <td>
                        {entry.date
                          ? new Date(
                              entry.date + "T00:00:00"
                            ).toLocaleDateString("pt-BR")
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
                            onClick={() => deleteEntry(originalIndex)}
                          >
                            <FiTrash2 title="Excluir" />
                          </button>

                          <button
                            className="action-button"
                            onClick={() => {
                              setEditIdx(originalIndex);
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
