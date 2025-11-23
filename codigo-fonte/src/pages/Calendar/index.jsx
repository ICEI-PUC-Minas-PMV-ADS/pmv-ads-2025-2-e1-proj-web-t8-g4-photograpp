import { useMemo, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import AppointmentModal from './components/AppointmentModal';
import ProjectViewModal from './components/ProjectViewModal';
import './styles.css';
import { defaultTasks } from '../../utils/mocks/tasksMock';

const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

// ===== Utils =====
const pad = (n) => String(n).padStart(2, '0');
const fmtDate = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const truncate = (s, n = 16) =>
  !s ? '' : s.length > n ? s.slice(0, n - 1) + '…' : s;
const addMonths = (base, delta) =>
  new Date(base.getFullYear(), base.getMonth() + delta, 1);

// Função para converter data BR (dd/mm/yyyy) para ISO (yyyy-mm-dd)
const convertBRDateToISO = (brDate) => {
  if (!brDate) return null;
  const parts = brDate.split('/');
  if (parts.length !== 3) return null;
  const [day, month, year] = parts;
  return `${year}-${pad(month)}-${pad(day)}`;
};

export default function Calendar() {
  // ===== Today / Current month =====
  const today = useMemo(() => new Date(), []);
  const todayISO = useMemo(() => fmtDate(today), [today]);
  const [current, setCurrent] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  // ===== Items & Modals =====
  const [items, setItems, , isInitialized] = useLocalStorage(
    'calendar_appointments',
    defaultTasks,
    true
  );

  // ===== Carregar projetos =====
  const [projects, , , projectsInitialized] = useLocalStorage(
    'projects',
    [],
    true
  );

  // ===== Combinar compromissos manuais com projetos (todos como evento) =====
  const allItems = useMemo(() => {
    const projectEvents = projects
      .filter((p) => p.dataSessao)
      .map((p) => ({
        id: `project-${p.id}`,
        title: p.titulo,
        desc: `Cliente: ${p.cliente} | Pacote: ${p.pacote}`,
        date: convertBRDateToISO(p.dataSessao),
        type: 'event',
        isProject: true,
        projectData: p, // Guardar dados completos do projeto
      }));

    return [...items, ...projectEvents];
  }, [items, projects]);

  const [modalOpen, setModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [initialDate, setInitialDate] = useState('');

  // ===== Search =====
  const [query, setQuery] = useState('');
  const matches = useMemo(() => {
    if (!query.trim()) return [];
    const lq = query.toLowerCase();
    return allItems.filter(
      (it) =>
        it.title?.toLowerCase().includes(lq) ||
        it.desc?.toLowerCase().includes(lq)
    );
  }, [allItems, query]);

  // ===== Labels & Derived =====
  const monthLabel = useMemo(() => {
    const m = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(
      current
    );
    const year = current.getFullYear();
    return `${m.charAt(0).toUpperCase() + m.slice(1)} de ${year}`;
  }, [current]);

  const byDate = useMemo(() => {
    const m = new Map();
    for (const it of allItems) {
      if (!it.date) continue;
      if (!m.has(it.date)) m.set(it.date, []);
      m.get(it.date).push(it);
    }
    return m;
  }, [allItems]);

  const cells = useMemo(() => {
    const y = current.getFullYear();
    const m = current.getMonth();

    const firstDay = new Date(y, m, 1);
    const startWeekday = firstDay.getDay();

    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const daysInPrev = new Date(y, m, 0).getDate();

    const leading = startWeekday;
    const totalCells = leading + daysInMonth;
    const trailing = (7 - (totalCells % 7)) % 7;

    const out = [];

    // dias do mês anterior
    for (let i = leading - 1; i >= 0; i--) {
      const day = daysInPrev - i;
      const d = new Date(y, m - 1, day);
      out.push({ key: `p-${i}`, day, muted: true, date: fmtDate(d) });
    }
    // mês atual
    for (let d = 1; d <= daysInMonth; d++) {
      const dd = new Date(y, m, d);
      out.push({ key: `c-${d}`, day: d, muted: false, date: fmtDate(dd) });
    }
    // dias do próximo mês
    for (let t = 1; t <= trailing; t++) {
      const d = new Date(y, m + 1, t);
      out.push({ key: `n-${t}`, day: t, muted: true, date: fmtDate(d) });
    }
    return out;
  }, [current]);

  // ===== Handlers =====
  const prevMonth = () => setCurrent((d) => addMonths(d, -1));
  const nextMonth = () => setCurrent((d) => addMonths(d, +1));
  const setMonthIndex = (idx) =>
    setCurrent((d) => new Date(d.getFullYear(), Number(idx), 1));

  const openCreateFor = (dateISO) => {
    setCurrentItem(null);
    setInitialDate(dateISO);
    setModalOpen(true);
  };

  const openViewer = (item) => {
    if (item.isProject) {
      // Abrir modal de visualização de projeto
      setCurrentProject(item.projectData);
      setProjectModalOpen(true);
      return;
    }
    setCurrentItem(item);
    setInitialDate('');
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (currentItem) {
      // Editar
      setItems((prev) =>
        prev.map((it) => (it.id === currentItem.id ? data : it))
      );
    } else {
      // Criar
      setItems((prev) => [...prev, data]);
    }
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentItem(null);
    setInitialDate('');
  };

  const handleCloseProjectModal = () => {
    setProjectModalOpen(false);
    setCurrentProject(null);
  };

  if (!isInitialized || !projectsInitialized) {
    return <div style={{ padding: '40px' }}>Carregando...</div>;
  }

  // ===== Render =====
  return (
    <div>
      {/* Topbar: título + busca e botão */}
      <div className="topbar">
        <div>
          <h1>Agenda</h1>
          <Breadcrumb />
        </div>
        <div className="top-actions">
          <input
            className="searchbar"
            type="text"
            placeholder="Digite o termo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn-primary"
            onClick={() => openCreateFor(todayISO)}
          >
            Novo compromisso
          </button>
        </div>
      </div>

      {/* Chips de resultados */}
      {query && matches.length > 0 && (
        <div className="search-results">
          {matches.map((it) => (
            <button
              key={it.id}
              className={`search-chip chip-${it.type}`}
              title={it.title}
              onClick={() => openViewer(it)}
            >
              {it.title}
            </button>
          ))}
        </div>
      )}

      {/* Toolbar: rótulo do mês + navegação + tags + seletor de meses */}
      <div className="cal-toolbar">
        <div className="month-area">
          <h2 className="month-label">{monthLabel}</h2>
          <div className="month-nav">
            <button
              className="nav"
              onClick={prevMonth}
              aria-label="Mês anterior"
            >
              ❮
            </button>
            <button
              className="nav"
              onClick={nextMonth}
              aria-label="Próximo mês"
            >
              ❯
            </button>
          </div>
        </div>

        <div className="right-tools">
          <div className="cal-tags">
            <button className="tag tag-note">Lembrete</button>
            <button className="tag tag-task">Tarefa</button>
            <button className="tag tag-event">Evento</button>
          </div>

          <select
            className="month-select"
            value={current.getMonth()}
            onChange={(e) => setMonthIndex(e.target.value)}
            aria-label={`Meses de ${current.getFullYear()}`}
          >
            {MONTH_NAMES.map((name, i) => (
              <option key={i} value={i}>
                {name} de {current.getFullYear()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cabeçalho dos dias da semana */}
      <div className="weekday-row">
        {'DOM SEG TER QUA QUI SEX SAB'.split(' ').map((d) => (
          <div key={d} className="weekday">
            {d}
          </div>
        ))}
      </div>

      {/* Grade do calendário */}
      <div className="cal-grid">
        {cells.map((c) => {
          const list = byDate.get(c.date) || [];
          const isToday = c.date === todayISO && !c.muted;

          return (
            <div
              key={c.key}
              className={`cell ${c.muted ? 'muted' : ''}`}
              role="gridcell"
            >
              <span className={`day ${isToday ? 'today' : ''}`}>{c.day}</span>
              <div className="events">
                {list.map((it) => (
                  <button
                    key={it.id}
                    className={`badge badge-${it.type}`}
                    title={it.title}
                    onClick={() => openViewer(it)}
                  >
                    {truncate(it.title, 18)}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <AppointmentModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        onDelete={handleDelete}
        item={currentItem}
        initialDate={initialDate}
      />

      <ProjectViewModal
        isOpen={projectModalOpen}
        onClose={handleCloseProjectModal}
        project={currentProject}
      />
    </div>
  );
}
