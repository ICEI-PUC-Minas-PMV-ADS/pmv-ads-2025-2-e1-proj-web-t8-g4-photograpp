import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./public-profile.css";

export default function PublicProfile() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [activeGallery, setActiveGallery] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Carrega snapshot salvo no localStorage
  useEffect(() => {
    if (!slug) return;
    const key = `public_profile_${slug}`;

    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        setNotFound(true);
        return;
      }
      const parsed = JSON.parse(raw);
      setData(parsed);
    } catch (err) {
      console.error("Erro lendo perfil público:", err);
      setNotFound(true);
    }
  }, [slug]);

  // Define galeria ativa inicial (primeira com fotos)
  useEffect(() => {
    if (!data) return;
    const galleries = data.galleries || [];
    const firstWithPhotos = galleries.find(
      (g) => g.photos && g.photos.length > 0
    );
    if (firstWithPhotos) {
      setActiveGallery(firstWithPhotos);
      setActivePhotoIndex(0);
    } else {
      setActiveGallery(null);
      setActivePhotoIndex(0);
    }
  }, [data]);

  if (notFound) {
    return (
      <main className="public-profile-page">
        <section className="public-profile-notfound">
          <h1>Perfil não encontrado</h1>
          <p>
            Não encontramos nenhum perfil salvo para <code>{slug}</code>.
          </p>
          <p className="public-profile-notfound-note">
            Lembre-se: como os dados ficam no <strong>localStorage</strong>, a
            página pública só funciona neste mesmo navegador onde o perfil foi
            configurado.
          </p>
        </section>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="public-profile-page">
        <p>Carregando perfil...</p>
      </main>
    );
  }

  const { profile, galleries = [] } = data || {};
  const services = profile?.services || [];

  const currentPhotos = activeGallery?.photos || [];
  const currentPhoto =
    currentPhotos && currentPhotos.length > 0
      ? currentPhotos[activePhotoIndex]
      : null;

  const visibleGalleries = galleries.slice(0, 8); // 4 colunas x 2 linhas

  // Navegação do carrossel
  const handleNextPhoto = () => {
    if (!currentPhotos.length) return;
    setActivePhotoIndex((prev) => (prev + 1) % currentPhotos.length);
  };

  const handlePrevPhoto = () => {
    if (!currentPhotos.length) return;
    setActivePhotoIndex(
      (prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length
    );
  };

  // Clicar em uma galeria -> atualizar carrossel pra fotos dela
  const handleSelectGallery = (gallery) => {
    if (!gallery || !gallery.photos || gallery.photos.length === 0) return;
    setActiveGallery(gallery);
    setActivePhotoIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Botões "Quero um orçamento" / "Contratar"
  const handleRequestQuote = () => {
    const defaultMessage =
      "Olá, vi seu portfólio no Photograpp e gostaria de um orçamento.";

    if (profile?.whatsapp) {
      const phone = profile.whatsapp.replace(/\D/g, "").trim();
      const text = encodeURIComponent(defaultMessage);
      window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
      return;
    }

    if (profile?.email) {
      const subject = encodeURIComponent("Pedido de orçamento");
      const body = encodeURIComponent(defaultMessage);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    alert("Informações de contato não disponíveis para orçamento.");
  };

  return (
    <main className="public-profile-page">
      {/* ================= HERO / CARROSSEL ================= */}
      <section className="public-profile-hero">
        <div className="public-profile-hero-inner">
          <div className="public-profile-hero-media">
            {currentPhoto ? (
              <img
                src={currentPhoto.url || currentPhoto.coverUrl}
                alt={activeGallery?.name || "Foto do portfólio"}
              />
            ) : (
              <div className="public-profile-hero-placeholder">
                Nenhuma foto publicada ainda.
              </div>
            )}

            {/* Overlay com título + botão (igual à referência) */}
            <div className="public-profile-hero-overlay">
              <h2>Transformando sonhos em imagens</h2>
              <button
                type="button"
                className="public-profile-hero-btn"
                onClick={handleRequestQuote}
              >
                Contratar
              </button>
            </div>

            {/* Navegação do carrossel (se tiver mais de uma foto) */}
            {currentPhotos.length > 1 && (
              <>
                <button
                  type="button"
                  className="public-profile-carousel-nav prev"
                  onClick={handlePrevPhoto}
                  aria-label="Foto anterior"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="public-profile-carousel-nav next"
                  onClick={handleNextPhoto}
                  aria-label="Próxima foto"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ================= DESCRIÇÃO ================= */}
      <section className="public-profile-about">
        {profile?.bio ? (
          <p>{profile.bio}</p>
        ) : (
          <p>
            Este fotógrafo ainda não preencheu a descrição. Assim que o perfil
            estiver completo, você poderá saber mais sobre o estilo e os tipos
            de ensaio oferecidos.
          </p>
        )}
      </section>

      {/* ================= GALERIAS (4x2) ================= */}
      <section className="public-profile-recent">
        <header className="public-profile-section-head">
          <h2>Conheça nossos trabalhos recentes</h2>
        </header>

        {visibleGalleries.length === 0 && (
          <p className="public-profile-empty">
            Nenhuma galeria publicada ainda.
          </p>
        )}

        <div className="public-profile-gallery-grid">
          {visibleGalleries.map((gallery) => (
            <article
              key={gallery.id}
              className="public-profile-gallery-card"
              onClick={() => handleSelectGallery(gallery)}
            >
              {gallery.coverUrl && (
                <div className="public-profile-gallery-cover">
                  <img src={gallery.coverUrl} alt={gallery.name} />
                </div>
              )}
              <h3>{gallery.name}</h3>
            </article>
          ))}
        </div>
      </section>

      {/* ================= CTA: QUERO UM ORÇAMENTO ================= */}
      <section className="public-profile-quote-section">
        <button
          type="button"
          className="public-profile-cta-btn"
          onClick={handleRequestQuote}
        >
          Quero um orçamento
        </button>
      </section>

      {/* ================= SERVIÇOS OFERECIDOS ================= */}
      {services.length > 0 && (
        <section className="public-profile-services">
          <header className="public-profile-section-head">
            <h2>Serviços oferecidos</h2>
          </header>

          <div className="public-profile-services-grid">
            {services.map((service) => (
              <article
                key={service.id}
                className="public-profile-service-card"
              >
                <h3>{service.name}</h3>
                {service.price && (
                  <p className="public-profile-service-price">
                    A partir de {service.price}
                  </p>
                )}
              </article>
            ))}
          </div>

          <div className="public-profile-services-cta">
            <button
              type="button"
              className="public-profile-cta-btn public-profile-cta-btn--secondary"
              onClick={handleRequestQuote}
            >
              Contratar
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
