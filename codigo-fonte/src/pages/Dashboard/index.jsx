import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { financeMock } from '../../utils/mocks/financeMock';
import { defaultMessages } from '../../utils/mocks/messagesMock';
import { defaultProjects } from '../../utils/mocks/projectsMock';
import { defaultTasks } from '../../utils/mocks/tasksMock';
import AppointmentModal from '../Calendar/components/AppointmentModal';
import { SALES_STAGE_OPTIONS, STATUS_OPTIONS } from './constants/dropdown';
import './styles.css';

export default function Dashboard() {
  const weekDays = [
    'DOMINGO',
    'SEGUNDA',
    'TERÇA',
    'QUARTA',
    'QUINTA',
    'SEXTA',
    'SÁBADO',
  ];
  const navigate = useNavigate?.();

  // ---- Carregar dados do localStorage ----
  const [calendarItems, setCalendarItems] = useLocalStorage(
    'calendar_appointments',
    defaultTasks,
    true
  );
  const [projects] = useLocalStorage('projects', defaultProjects, true);
  const [financeEntries] = useLocalStorage('financeEntries', financeMock, true);
  const [messages] = useLocalStorage('messages', defaultMessages, true);

  // ---- Modal ----
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // ---- Semana (baseada no dia atual; setas +/- semana) ----
  const [weekOffset, setWeekOffset] = useState(0);

  const refDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + weekOffset * 7);
    return d;
  }, [weekOffset]);

  const { weekStart, weekEnd, rangeLabel } = useMemo(() => {
    const start = new Date(refDate);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const fmt = (d) =>
      d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

    return {
      weekStart: start,
      weekEnd: end,
      rangeLabel: `${fmt(start)} a ${fmt(end)}`,
    };
  }, [refDate]);

  // ---- Filtrar compromissos da semana (excluir tarefas) ----
  const weekAppointments = useMemo(() => {
    const convertBRDateToISO = (brDate) => {
      if (!brDate) return null;
      const parts = brDate.split('/');
      if (parts.length !== 3) return null;
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    const allAppointments = [
      ...calendarItems,
      ...projects
        .filter((p) => p.dataSessao)
        .map((p) => ({
          id: `project-${p.id}`,
          title: p.titulo,
          date: convertBRDateToISO(p.dataSessao),
          type: 'event',
          isProject: true,
        })),
    ];

    return allAppointments.filter((item) => {
      if (!item.date) return false;
      const itemDate = new Date(item.date + 'T00:00:00');
      return itemDate >= weekStart && itemDate <= weekEnd;
    });
  }, [calendarItems, projects, weekStart, weekEnd]);

  // ---- Filtrar tarefas da semana ----
  const weekTasks = useMemo(() => {
    const filtered = calendarItems.filter((task) => {
      if (task.type !== 'task') {
        return false;
      }
      if (!task.date) {
        return false;
      }

      const taskDate = new Date(task.date + 'T00:00:00');

      return taskDate >= weekStart && taskDate <= weekEnd;
    });

    return filtered;
  }, [calendarItems, weekStart, weekEnd]);

  // ---- Calcular dados financeiros (igual à página Finance) ----
  const financeData = useMemo(() => {
    // Totais gerais (todos os meses)
    const totalEntradas = financeEntries
      .filter((e) => e.type === 'entrada')
      .reduce((sum, e) => sum + Number(e.value || 0), 0);

    const totalSaidas = financeEntries
      .filter((e) => e.type === 'saida')
      .reduce((sum, e) => sum + Number(e.value || 0), 0);

    const totalEmCaixa = totalEntradas - totalSaidas;

    return {
      totalEmCaixa,
      totalEntradas,
      totalSaidas,
    };
  }, [financeEntries]);

  const prevWeek = () => setWeekOffset((n) => n - 1);
  const nextWeek = () => setWeekOffset((n) => n + 1);
  const goToAgenda = () => {
    if (navigate) navigate('/agenda');
    else window.location.href = '/agenda';
  };

  const truncate = (str, maxLen = 18) => {
    if (!str) return '';
    return str.length > maxLen ? str.slice(0, maxLen - 1) + '…' : str;
  };

  const handleBadgeClick = (item) => {
    if (item.isProject) {
      return;
    }
    setCurrentItem(item);
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (currentItem) {
      setCalendarItems((prev) =>
        prev.map((it) => (it.id === currentItem.id ? data : it))
      );
    } else {
      setCalendarItems((prev) => [...prev, data]);
    }
  };

  const handleDelete = (id) => {
    setCalendarItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentItem(null);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setCalendarItems((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const getProjectName = (projectId) => {
    if (!projectId) return 'Sem projeto';
    const project = projects.find((p) => String(p.id) === String(projectId));
    return project ? project.titulo : 'Sem projeto';
  };

  const handlePrevMessage = () => {
    setCurrentMessageIndex((prev) =>
      prev === 0 ? messages.length - 1 : prev - 1
    );
  };

  const handleNextMessage = () => {
    setCurrentMessageIndex((prev) =>
      prev === messages.length - 1 ? 0 : prev + 1
    );
  };

  const currentMessage = messages[currentMessageIndex] || null;

  return (
    <div className="dashboard__wrap">
      <div className="dashboard__title">
        <h1>Dashboard</h1>
        <Breadcrumb />
      </div>

      <main className="dashboard__flex">
        <div className="dashboard__main-left">
          <section className="dashboard__agenda" aria-label="Agenda semanal">
            <div className="dashboard__card-head dashboard__head-ends">
              <h2>Agenda</h2>
              <button
                className="dashboard__see-agenda-link"
                type="button"
                onClick={goToAgenda}
              >
                Ver agenda
              </button>
            </div>

            <div className="dashboard__week-center">
              <span className="dashboard__sub">Compromissos da semana</span>
              <span className="dashboard__range">{rangeLabel}</span>

              <div className="dashboard__nav-arrows">
                <button
                  className="dashboard__chev"
                  aria-label="Semana anterior"
                  type="button"
                  onClick={prevWeek}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  className="dashboard__chev"
                  aria-label="Próxima semana"
                  type="button"
                  onClick={nextWeek}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="dashboard__week-grid">
              {weekDays.map((dayName, idx) => {
                const dayDate = new Date(weekStart);
                dayDate.setDate(weekStart.getDate() + idx);

                const dayAppointments = weekAppointments.filter((item) => {
                  const itemDate = new Date(item.date + 'T00:00:00');
                  return itemDate.toDateString() === dayDate.toDateString();
                });

                return (
                  <div key={dayName} className="dashboard__day-col">
                    <div className="dashboard__day-col-head">{dayName}</div>
                    <div className="dashboard__day-col-body">
                      {dayAppointments.map((item, i) => (
                        <div
                          key={i}
                          className={`dashboard__badge dashboard__badge--${item.type}`}
                          title={item.title}
                          onClick={() => handleBadgeClick(item)}
                          style={{
                            cursor: item.isProject ? 'default' : 'pointer',
                          }}
                        >
                          {truncate(item.title)}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="dashboard__last-blocks">
            <section
              className="dashboard__card dashboard__finance dashboard__eq"
              aria-label="Financeiro"
            >
              <div className="dashboard__card-head">
                <h2>Financeiro</h2>
              </div>
              <div className="dashboard__finance-grid">
                <div className="dashboard__block">
                  <div className="dashboard__label">Total em caixa:</div>
                  <div className="dashboard__value">
                    R${' '}
                    {financeData.totalEmCaixa.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
                <div className="dashboard__finance-grid-block">
                  <div className="dashboard__block">
                    <div className="dashboard__label">Total de entradas:</div>
                    <div className="dashboard__value">
                      R${' '}
                      {financeData.totalEntradas.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <div className="dashboard__block">
                    <div className="dashboard__label">Total de saídas:</div>
                    <div className="dashboard__value">
                      R${' '}
                      {financeData.totalSaidas.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="dashboard__card dashboard__last-messages dashboard__eq"
              aria-label="Últimas mensagens"
            >
              <div className="dashboard__card-head">
                <h2>Últimas mensagens</h2>
                <div className="dashboard__nav-arrows">
                  <button
                    className="dashboard__chev"
                    aria-label="Anterior"
                    type="button"
                    onClick={handlePrevMessage}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    className="dashboard__chev"
                    aria-label="Próximo"
                    type="button"
                    onClick={handleNextMessage}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </div>
              {currentMessage && (
                <div className="dashboard__message">
                  <h5>{currentMessage.sender}</h5>
                  <div className="dashboard__kv">
                    <strong>Data:</strong> {currentMessage.date}
                  </div>
                  <div className="dashboard__kv">
                    <strong>Assunto:</strong> {currentMessage.subject}
                  </div>
                  <p className="dashboard__message-text">
                    {currentMessage.message}
                  </p>
                </div>
              )}
            </section>

            <section
              className="dashboard__card dashboard__last-requests dashboard__eq"
              aria-label="Últimas solicitações"
            >
              <div className="dashboard__card-head">
                <h2>Últimas solicitações</h2>
                <div className="dashboard__nav-arrows">
                  <button
                    className="dashboard__chev"
                    aria-label="Anterior"
                    type="button"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    className="dashboard__chev"
                    aria-label="Próximo"
                    type="button"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="dashboard__request">
                <h3>Ensaio Carina</h3>
                <div className="dashboard__kv">
                  <strong>Data da sessão:</strong> 10/10/2025
                </div>
                <div className="dashboard__kv">
                  <strong>Pacote:</strong> Ensaio profissional
                </div>
                <div className="dashboard__kv">
                  <strong>Cliente:</strong> Carina Souza
                </div>
                <label className="dashboard__select-wrap">
                  <span>Status</span>
                  <select defaultValue="lead">
                    {SALES_STAGE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>
          </div>
        </div>

        <aside
          className="dashboard__card dashboard__tasks"
          aria-label="Tarefas da semana"
        >
          <div className="dashboard__card-head">
            <h2>Tarefas</h2>
            <div className="dashboard__nav-arrows">
              <button
                className="dashboard__chev"
                aria-label="Anterior"
                type="button"
                onClick={prevWeek}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="dashboard__chev"
                aria-label="Próximo"
                type="button"
                onClick={nextWeek}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>

          {weekTasks.length === 0 ? (
            <p style={{ textAlign: 'center', opacity: 0.7, padding: '20px' }}>
              Nenhuma tarefa nesta semana
            </p>
          ) : (
            weekTasks.map((task) => (
              <div key={task.id} className="dashboard__task-card">
                <h3>{task.title}</h3>
                {task.desc && (
                  <div className="dashboard__kv">
                    <strong>Descrição:</strong> {task.desc}
                  </div>
                )}
                <div className="dashboard__kv">
                  <strong>Deadline:</strong>{' '}
                  {new Date(task.date + 'T00:00:00').toLocaleDateString(
                    'pt-BR'
                  )}
                </div>
                {task.responsible && (
                  <div className="dashboard__kv">
                    <strong>Responsável:</strong> {task.responsible}
                  </div>
                )}
                <div className="dashboard__kv">
                  <strong>Projeto:</strong> {getProjectName(task.projectId)}
                </div>
                <label className="dashboard__select-wrap">
                  <span>Status</span>
                  <select
                    value={task.status || 'afazer'}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value)
                    }
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))
          )}
        </aside>
      </main>

      <AppointmentModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        onDelete={handleDelete}
        item={currentItem}
      />
    </div>
  );
}
