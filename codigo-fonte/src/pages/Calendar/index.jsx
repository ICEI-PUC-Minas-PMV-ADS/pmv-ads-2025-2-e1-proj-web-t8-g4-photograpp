import Breadcrumb from "../../components/Breadcrumb";

export default function Calendar() {
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
      
    </div>
  );
}