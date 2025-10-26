import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; // <— ADICIONE isto se usa React Router
import Breadcrumb from "../../components/Breadcrumb";
import { STATUS_OPTIONS, SALES_STAGE_OPTIONS  } from "./constants/dropdown"
import "./styles.css";

export default function Dashboard() {
  const weekDays = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];

  // ---- Navegação para /agenda ----
  const navigate = useNavigate?.(); // se não houver router, ficará undefined

  // ---- Semana (baseada no dia atual; setas +/- semana) ----
  const [weekOffset, setWeekOffset] = useState(0); // em semanas; 0 = semana atual

  // data de referência = hoje + (weekOffset * 7 dias)
  const refDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + weekOffset * 7);
    return d;
  }, [weekOffset]);

  // início (domingo) e fim (sábado) da semana
  const { weekStart, weekEnd, rangeLabel } = useMemo(() => {
    // getDay(): 0=Dom ... 6=Sáb
    const start = new Date(refDate);
    start.setDate(start.getDate() - start.getDay()); // volta até domingo
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // sábado

    const fmt = (d) =>
      d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

    return {
      weekStart: start,
      weekEnd: end,
      rangeLabel: `${fmt(start)} a ${fmt(end)}`
    };
  }, [refDate]);

  // handlers das setas (opcional, já que você as tem na UI)
  const prevWeek = () => setWeekOffset((n) => n - 1);
  const nextWeek = () => setWeekOffset((n) => n + 1);

  // clique do “Ver agenda”
  const goToAgenda = () => {
    if (navigate) navigate("/agenda");
    else window.location.href = "/agenda"; // fallback sem router
  };

  return (
    <div className="dash-wrap">
      <div className="dash-title">
        <h1>Dashboard</h1>
        <Breadcrumb />
      </div>

      <main className="dash-flex">
        {/* ESQUERDA: Agenda + faixa de 3 cards */}
        <div className="main-left">
          <section className="agenda" aria-label="Agenda semanal">
            <div className="card-head head-ends">
              <h2>Agenda</h2>
              <button className="see-agenda-link" type="button" onClick={goToAgenda}>
                Ver agenda
              </button>
            </div>

            <div className="week-center">
              <span className="sub">Compromissos da semana</span>
              <span className="range">{rangeLabel}</span>

              {/* setas reutilizáveis */}
              <div className="nav-arrows">
                <button className="chev" aria-label="Semana anterior" type="button" onClick={prevWeek}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button className="chev" aria-label="Próxima semana" type="button" onClick={nextWeek}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="week-grid">
              {weekDays.map((d) => (
                <div key={d} className="day-col">
                  <div className="day-col-head">{d}</div>
                  <div className="day-col-body" />
                </div>
              ))}
            </div>
          </section>

          {/* TRÊS CARDS */}
          <div className="last-blocks">
            <section className="card finance eq" aria-label="Financeiro">
              <div className="card-head">
                <h2>Financeiro</h2>
              </div>
              <div className="finance-grid">
                <div className="block">
                  <div className="label">Faturamento do mês:</div>
                  <div className="value">R$ 20.000,00</div>
                </div>
                <div className="finance-grid-block">
                  <div className="block">
                    <div className="label">A receber:</div>
                    <div className="value">R$ 3.000,00</div>
                  </div>
                  <div className="block">
                    <div className="label">A pagar:</div>
                    <div className="value">R$ 500,00</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="card last-messages eq" aria-label="Últimas mensagens">
              <div className="card-head">
                <h2>Últimas mensagens</h2>
                <div className="nav-arrows">
                  <button className="chev" aria-label="Anterior" type="button">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button className="chev" aria-label="Próximo" type="button">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>

            <section className="card last-requests eq" aria-label="Últimas solicitações">
              <div className="card-head">
                <h2>Últimas solicitações</h2>
                <div className="nav-arrows">
                  <button className="chev" aria-label="Anterior" type="button">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button className="chev" aria-label="Próximo" type="button">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="request">
                <h3>Ensaio Carina</h3>
                <div className="kv"><strong>Data da sessão:</strong> 10/10/2025</div>
                <div className="kv"><strong>Pacote:</strong> Ensaio profissional</div>
                <div className="kv"><strong>Cliente:</strong> Carina Souza</div>
                <label className="select-wrap">
                  <span>Status</span>
                  <select defaultValue="andamento">
                    {STATUS_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </label>
              </div>
            </section>
          </div>
        </div>

        {/* DIREITA: Tarefas */}
        <aside className="card tasks" aria-label="Tarefas da semana">
          <div className="card-head">
            <h2>Tarefas</h2>
            <div className="nav-arrows">
              <button className="chev" aria-label="Anterior" type="button">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="chev" aria-label="Próximo" type="button">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="task-card">
            <h3>Preparar materiais para a sessão</h3>
            <div className="kv"><strong>Deadline:</strong> 05/10/2025</div>
            <div className="kv"><strong>Responsável:</strong> Cláudio Augusto</div>
            <div className="kv"><strong>Projeto:</strong> Ensaio – Ana Paula</div>
            <label className="select-wrap">
              <span>Status</span>
              <select defaultValue="afazer">
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="task-card">
            <h3>Pagamento de entrada</h3>
            <div className="kv"><strong>Deadline:</strong> 10/10/2025</div>
            <div className="kv"><strong>Responsável:</strong> Antoni Carvalho</div>
            <div className="kv"><strong>Projeto:</strong> Ensaio – Gosmig</div>
            <label className="select-wrap">
              <select defaultValue="lead">
                {SALES_STAGE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
          </div>
        </aside>
      </main>
    </div>
  );
}
