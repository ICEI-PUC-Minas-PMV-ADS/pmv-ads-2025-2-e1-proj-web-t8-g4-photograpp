import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./public-profile.css";

export default function PublicProfile() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // carrossel global (todas as fotos de todas as galerias)
  const [allPhotos, setAllPhotos] = useState([]);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // modal da galeria clicada
  const [modalGallery, setModalGallery] = useState(null);

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
      setNotFound(false);
    } catch (err) {
      console.error("Erro lendo perfil público:", err);
      setNotFound(true);
    }
  }, [slug]);

  // Monta lista com TODAS as fotos de TODAS as galerias
  useEffect(() => {
    if (!data) {
      setAllPhotos([]);
      setActivePhotoIndex(0);
      return;
    }

    const galleries = data.galleries || [];
    const flat = galleries.flatMap((g) =>
      (g.photos || []).map((p) => ({
        ...p,
        galleryId: g.id,
        galleryName: g.name,
      }))
    );

    setAllPhotos(flat);
    setActivePhotoIndex(0);
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

  const currentPhoto =
    allPhotos.length > 0 ? allPhotos[activePhotoIndex] : null;

  const visibleGalleries = galleries.slice(0, 8); // 4 colunas x 2 linhas

  // Navegação do carrossel (todas as fotos)
  const handleNextPhoto = () => {
    if (!allPhotos.length) return;
    setActivePhotoIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const handlePrevPhoto = () => {
    if (!allPhotos.length) return;
    setActivePhotoIndex(
      (prev) => (prev - 1 + allPhotos.length) % allPhotos.length
    );
  };

  // Clicar em uma galeria -> abre modal com fotos dessa galeria
  const handleOpenGalleryModal = (gallery) => {
    if (!gallery || !gallery.photos || gallery.photos.length === 0) return;
    setModalGallery(gallery);
  };

  const handleCloseGalleryModal = () => {
    setModalGallery(null);
  };

  // Botões "Quero um orçamento" / "Contratar"
  const handleRequestQuote = () => {
    alert(
      "Funcionalidade de contato em desenvolvimento.\n\n" +
        "Em breve você poderá solicitar um orçamento por aqui. 😊\n\n" +
        "No aguardo!"
    );
  };

  return (
    <main className="public-profile-page">
      {/* ================= HERO / CARROSSEL (FULL WIDTH) ================= */}
      <section className="public-profile-hero">
        <div className="public-profile-hero-inner">
          <div className="public-profile-hero-media">
            {currentPhoto ? (
              <img
                src={currentPhoto.url || currentPhoto.coverUrl}
                alt={currentPhoto.galleryName || "Foto do portfólio"}
              />
            ) : (
              <div className="public-profile-hero-placeholder">
                Nenhuma foto publicada ainda.
              </div>
            )}

            {/* Overlay com título + botão */}
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
            {allPhotos.length > 1 && (
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
              onClick={() => handleOpenGalleryModal(gallery)}
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

      {/* ================= MODAL DE GALERIA ================= */}
      {modalGallery && (
        <div
          className="public-profile-modal-overlay"
          onClick={handleCloseGalleryModal}
        >
          <div
            className="public-profile-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="public-profile-modal-header">
              <h3>{modalGallery.name}</h3>
              <button
                type="button"
                className="public-profile-modal-close"
                onClick={handleCloseGalleryModal}
                aria-label="Fechar galeria"
              >
                ×
              </button>
            </header>

            <div className="public-profile-modal-grid">
              {(modalGallery.photos || []).map((photo) => (
                <div
                  key={photo.id}
                  className="public-profile-modal-photo"
                >
                  <img src={photo.url} alt={modalGallery.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}