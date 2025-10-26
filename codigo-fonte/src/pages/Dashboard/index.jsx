import Breadcrumb from "../../components/Breadcrumb";
import "./styles.css";

export default function Dashboard() {
  const weekDays = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];

  return (
    <div className="dash-wrap">
      <div className="dash-title">
        <h1>Dashboard</h1>
        <Breadcrumb />
      </div>

      <main className="dash-grid">
        <section className="card agenda" aria-label="Agenda semanal">
          <div className="card-head head-ends">
            <h2>Agenda</h2>
            <button className="see-agenda-link" type="button">Ver agenda</button>
          </div>

          <div className="week-center">
            <span className="sub">Compromissos da semana</span>
            <span className="range">21/09 a 27/09</span>
            <div className="week-arrows">
              <button aria-label="Semana anterior">‹</button>
              <button aria-label="Próxima semana">›</button>
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

        <aside className="card tasks" aria-label="Tarefas da semana">
          <div className="card-head">
            <h2>Tarefas</h2>
            <div className="mini-nav">
              <button aria-label="Semana anterior">‹</button>
              <button aria-label="Próxima semana">›</button>
            </div>
          </div>

          <div className="task-card">
            <h3>Preparar materiais para a sessão</h3>
            <div className="kv"><strong>Deadline:</strong> 05/10/2025</div>
            <div className="kv"><strong>Responsável:</strong> Cláudio Augusto</div>
            <div className="kv"><strong>Projeto:</strong> Ensaio – Ana Paula</div>
            <label className="select-wrap">
              <span>Status</span>
              <select defaultValue="andamento">
                <option value="andamento">Em andamento</option>
                <option value="feito">Concluído</option>
                <option value="pendente">Pendente</option>
              </select>
            </label>
          </div>

          <div className="task-card">
            <h3>Pagamento de entrada</h3>
            <div className="kv"><strong>Deadline:</strong> 10/10/2025</div>
            <div className="kv"><strong>Responsável:</strong> Antoni Carvalho</div>
            <div className="kv"><strong>Projeto:</strong> Ensaio – Gosmig</div>
            <label className="select-wrap">
              <span>Status</span>
              <select defaultValue="afazer">
                <option value="afazer">A fazer</option>
                <option value="feito">Concluído</option>
                <option value="atrasado">Atrasado</option>
              </select>
            </label>
          </div>
        </aside>

        <section className="card finance eq" aria-label="Financeiro">
          <div className="card-head"><h2>Financeiro</h2></div>
          <div className="finance-grid">
            <div className="block">
              <div className="label">Faturamento do mês:</div>
              <div className="value">R$ 20.000,00</div>
            </div>
            <div className="block">
              <div className="label">A receber:</div>
              <div className="value">R$ 3.000,00</div>
            </div>
            <div className="block">
              <div className="label">A pagar:</div>
              <div className="value">R$ 500,00</div>
            </div>
          </div>
        </section>

        <section className="card last-messages eq" aria-label="Últimas mensagens">
          <div className="card-head">
            <h2>Últimas mensagens</h2>
            <div className="mini-nav">
              <button aria-label="Anterior">‹</button>
              <button aria-label="Próximo">›</button>
            </div>
          </div>
          <ul className="list simple">
            <li><strong>Carina Souza</strong> — “Confirmação da sessão…”</li>
            <li><strong>Antoni Carvalho</strong> — “Enviei o contrato.”</li>
            <li><strong>Paula Menezes</strong> — “Posso reagendar?”</li>
          </ul>
        </section>

        <section className="card last-requests eq" aria-label="Últimas solicitações">
          <div className="card-head">
            <h2>Últimas solicitações</h2>
            <div className="mini-nav">
              <button aria-label="Anterior">‹</button>
              <button aria-label="Próximo">›</button>
            </div>
          </div>
          <div className="request">
            <h3>Ensaio Carina</h3>
            <div className="kv"><strong>Data da sessão:</strong> 10/10/2025</div>
            <div className="kv"><strong>Pacote:</strong> Ensaio profissional</div>
            <div className="kv"><strong>Cliente:</strong> Carina Souza</div>
            <label className="select-wrap">
              <span>Etapa</span>
              <select defaultValue="lead">
                <option value="lead">Lead</option>
                <option value="qualificado">Qualificado</option>
                <option value="fechado">Fechado</option>
              </select>
            </label>
          </div>
        </section>
      </main>
    </div>
  );
}
