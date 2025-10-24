import { useMemo, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";

export default function Calendar() {
  const today = useMemo(() => new Date(), []);
  const [current, setCurrent] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const monthLabel = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(current);

  console.log(monthLabel)

  function addMonths(base, delta) {
    return new Date(base.getFullYear(), base.getMonth() + delta, 1);
  }

  function prevMonth() {
    setCurrent((d) => addMonths(d, -1));
  }
  function nextMonth() {
    setCurrent((d) => addMonths(d, +1));
  }

  const cells = useMemo(() => {
    const y = current.getFullYear();
    const m = current.getMonth();

    const firstDay = new Date(y, m, 1);
    const startWeekday = firstDay.getDay(); // 0=Domingo ... 6=Sábado

    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const daysInPrev = new Date(y, m, 0).getDate();

    const leading = startWeekday; // quantas células do mês anterior
    const totalCells = leading + daysInMonth;
    const trailing = (7 - (totalCells % 7)) % 7; // completa a grade

    const items = [];

    // Dias do mês anterior (muted)
    for (let i = leading - 1; i >= 0; i--) {
      items.push({
        key: `p-${i}`,
        day: daysInPrev - i,
        muted: true,
      });
    }

    // Dias do mês atual
    for (let d = 1; d <= daysInMonth; d++) {
      items.push({ key: `c-${d}`, day: d, muted: false });
    }

    // Dias do próximo mês (muted)
    for (let t = 1; t <= trailing; t++) {
      items.push({ key: `n-${t}`, day: t, muted: true });
    }

    return items;
  }, [current]);



  return (
    <div>
      <h1>Agenda</h1>
      <Breadcrumb />
      <div className="cal-actions">
        <div className="cal-tags">
          <button className="tag tag-note">📝 Lembrete</button>
          <button className="tag tag-task">✅ Tarefa</button>
          <button className="tag tag-event">🎉 Evento</button>
        </div>

        <button className="btn-primary">➕ Novo compromisso</button>
      </div>
      
      <div className="cal-toolbar">
        <h2 className="month-label">
          {monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)}
        </h2>
        <div className="month-nav">
          <button className="nav" onClick={prevMonth} aria-label="Mês anterior">
            ◀️
          </button>
          <button className="nav" onClick={nextMonth} aria-label="Próximo mês">
            ▶️
          </button>
        </div>
      </div>

      <div className="weekday-row">
        {"DOM SEG TER QUA QUI SEX SAB".split(" ").map((d) => (
          <div key={d} className="weekday">
            {d}
          </div>
        ))}
      </div>

      <div className="cal-grid">
        {cells.map((c) => (
          <div
            key={c.key}
            className={`cell ${c.muted ? "muted" : ""}`}
            role="gridcell"
          >
            <span className="day">{c.day}</span>
          </div>
        ))}
      </div>

    </div>
  );
}