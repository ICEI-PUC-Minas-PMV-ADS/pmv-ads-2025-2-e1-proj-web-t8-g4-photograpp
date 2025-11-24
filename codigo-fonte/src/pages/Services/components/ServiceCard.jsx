import './ServiceCard.css';

export default function ServiceCard({
  titulo,
  preco,
  numeroFotos,
  descricao,
  onClick,
}) {
  function handleCard(e) {
    if (e.target.closest('button')) return;
    onClick?.();
  }

  return (
    <article className="service-card" onClick={handleCard}>
      <h3 className="service-card__title">{titulo}</h3>
      <p className="service-card__line">
        <strong>Preço:</strong> <span>{preco}</span>
      </p>
      <p className="service-card__line">
        <strong>Nº de fotos:</strong> <span>{numeroFotos}</span>
      </p>
      {descricao && (
        <p className="service-card__desc" title={descricao}>
          {descricao}
        </p>
      )}
    </article>
  );
}
