import { useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { STATUS_OPTIONS } from '../../../utils/constants/projectStatus';
import './ProjectCard.css';

export default function ProjectCard({
  titulo,
  dataSessao,
  pacote,
  cliente,
  status,
  onStatusChange,
  onClick,
}) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(status || STATUS_OPTIONS[0]);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    setCurrent(status || STATUS_OPTIONS[0]);
  }, [status]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  function handleSelect(next) {
    setCurrent(next);
    setOpen(false);
    onStatusChange?.(next);
  }

  function handleCardClick(e) {
    if (
      btnRef.current?.contains(e.target) ||
      menuRef.current?.contains(e.target)
    ) {
      return;
    }
    onClick?.();
  }

  return (
    <article className="project-card" onClick={handleCardClick}>
      <h3 className="project-card__title">{titulo}</h3>

      <p className="project-card__line">
        <strong>Data da sessão:</strong> <span>{dataSessao}</span>
      </p>
      <p className="project-card__line">
        <strong>Pacote:</strong> <span>{pacote}</span>
      </p>
      <p className="project-card__line">
        <strong>Cliente:</strong> <span>{cliente}</span>
      </p>

      <div className="project-card__status-wrap">
        <button
          ref={btnRef}
          type="button"
          className="project-card__status"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span>{current}</span>
          <FiChevronDown
            className={`project-card__icon${
              open ? ' project-card__icon--open' : ''
            }`}
          />
        </button>

        {open && (
          <ul
            ref={menuRef}
            className="project-card__menu"
            role="listbox"
            aria-label="Selecionar status"
          >
            {STATUS_OPTIONS.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  className={`project-card__option${
                    opt === current ? ' is-active' : ''
                  }`}
                  role="option"
                  aria-selected={opt === current}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}