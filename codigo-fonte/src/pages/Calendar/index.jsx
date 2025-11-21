import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import "./styles.css";

const STORAGE_KEY = "calendar_appointments";
const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// ===== Utils =====
const pad = (n) => String(n).padStart(2, "0");
const fmtDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const truncate = (s, n = 16) => (!s ? "" : s.length > n ? s.slice(0, n - 1) + "…" : s);
const addMonths = (base, delta) => new Date(base.getFullYear(), base.getMonth() + delta, 1);

export default function Calendar() {
  // ===== Today / Current month =====
  const today = useMemo(() => new Date(), []);
  const todayISO = useMemo(() => fmtDate(today), [today]);
  const [current, setCurrent] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  // ===== Items & Modals =====
  const [items, setItems] = useState([]);                   // [{id,title,desc,date,type}]
  const [openCreate, setOpenCreate] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [form, setForm] = useState({ title: "", desc: "", date: "", type: "event" });

  // ===== Search =====
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items.filter((it) => (it.title || "").toLowerCase().includes(q));
  }, [items, query]);

  // ===== Load / Persist =====
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  // ===== Labels & Derived =====
  const monthLabel = useMemo(() => {
    const m = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(current);
    const year = current.getFullYear();
    return `${m.charAt(0).toUpperCase() + m.slice(1)} de ${year}`;
  }, [current]);

  const byDate = useMemo(() => {
    const m = new Map();
    for (const it of items) {
      if (!m.has(it.date)) m.set(it.date, []);
      m.get(it.date).push(it);
    }
    return m;
  }, [items]);

  const cells = useMemo(() => {
    const y = current.getFullYear();
    const m = current.getMonth();

    const firstDay = new Date(y, m, 1);
    const startWeekday = firstDay.getDay(); // 0=Dom

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
  const setMonthIndex = (idx) => setCurrent((d) => new Date(d.getFullYear(), Number(idx), 1));

  const openCreateFor = (dateISO) => {
    setForm({ title: "", desc: "", date: dateISO || fmtDate(new Date()), type: "event" });
    setOpenCreate(true);
  };
  const submitCreate = (e) => {
    e?.preventDefault?.();
    if (!form.title || !form.date) return;
    const id = Math.random().toString(36).slice(2, 9);
    setItems((prev) => [...prev, { id, ...form }]);
    setOpenCreate(false);
  };
  const openViewer = (item) => { setCurrentItem({ ...item }); setOpenView(true); };
  const saveViewer = () => { setItems((prev) => prev.map((it) => it.id === currentItem.id ? currentItem : it)); setOpenView(false); };
  const removeItem = (id) => { setItems((prev) => prev.filter((it) => it.id !== id)); setOpenView(false); };

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
          <button className="btn-primary" onClick={() => openCreateFor(fmtDate(new Date()))}>
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
            <button className="nav" onClick={prevMonth} aria-label="Mês anterior">❮</button>
            <button className="nav" onClick={nextMonth} aria-label="Próximo mês">❯</button>
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
        {"DOM SEG TER QUA QUI SEX SAB".split(" ").map((d) => (
          <div key={d} className="weekday">{d}</div>
        ))}
      </div>

      {/* Grade do calendário */}
      <div className="cal-grid">
        {cells.map((c) => {
          const list = byDate.get(c.date) || [];
          const isToday = c.date === todayISO && !c.muted;

          return (
            <div key={c.key} className={`cell ${c.muted ? "muted" : ""}`} role="gridcell">
              <span className={`day ${isToday ? "today" : ""}`}>{c.day}</span>
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

      {/* Modal: Criar */}
      {openCreate && (
        <div className="modal-overlay" onClick={() => setOpenCreate(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" aria-label="Fechar" onClick={() => setOpenCreate(false)}>
              <span>×</span>
            </button>

            <h3>Novo compromisso</h3>
            <form onSubmit={submitCreate} className="form">
              <label>
                Título
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </label>

              <label>
                Descrição
                <textarea
                  rows={3}
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                />
              </label>

              <div className="row">
                <label>
                  Data
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Tipo
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="note">Lembrete</option>
                    <option value="task">Tarefa</option>
                    <option value="event">Evento</option>
                  </select>
                </label>
              </div>

              <div className="actions actions-center">
                <button type="submit" className="btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Visualizar/Editar */}
      {openView && currentItem && (
        <div className="modal-overlay" onClick={() => setOpenView(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" aria-label="Fechar" onClick={() => setOpenView(false)}>
              <span>×</span>
            </button>

            <h3>Compromisso</h3>
            <div className="form">
              <label>
                Título
                <input
                  type="text"
                  value={currentItem.title}
                  onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                />
              </label>

              <label>
                Descrição
                <textarea
                  rows={3}
                  value={currentItem.desc || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, desc: e.target.value })}
                />
              </label>

              <div className="row">
                <label>
                  Data
                  <input
                    type="date"
                    value={currentItem.date}
                    onChange={(e) => setCurrentItem({ ...currentItem, date: e.target.value })}
                  />
                </label>
                <label>
                  Tipo
                  <select
                    value={currentItem.type}
                    onChange={(e) => setCurrentItem({ ...currentItem, type: e.target.value })}
                  >
                    <option value="note">Lembrete</option>
                    <option value="task">Tarefa</option>
                    <option value="event">Evento</option>
                  </select>
                </label>
              </div>

              <div className="actions actions-center">
                <button type="button" className="btn-danger actions-left" onClick={() => removeItem(currentItem.id)}>
                  Excluir
                </button>
                <button type="button" className="btn-primary" onClick={saveViewer}>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
