import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./public-profile.css";

export default function PublicProfile() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);

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

  if (notFound) {
    return (
      <main className="public-profile-page">
        <section className="public-profile-header">
          <h1>Perfil não encontrado</h1>
          <p>
            Não encontramos nenhum perfil salvo para <code>{slug}</code>.
          </p>
          <p style={{ marginTop: "0.5rem", fontSize: ".9rem", opacity: 0.8 }}>
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

  const { profile, galleries } = data || {};
  const hasAddress =
    profile?.street ||
    profile?.neighborhood ||
    profile?.uf ||
    profile?.cep;

  const services = profile?.services || [];

  return (
    <main className="public-profile-page">
      {/* Cabeçalho com logo + nome */}
      <section className="public-profile-hero">
        {profile?.logo && (
          <div className="public-profile-logo">
            <img src={profile.logo} alt={profile.publicName} />
          </div>
        )}

        <div className="public-profile-info">
          <h1>{profile?.publicName || "Fotógrafo(a) sem nome"}</h1>

          {profile?.bio && (
            <p className="public-profile-bio">{profile.bio}</p>
          )}

          <div className="public-profile-contact">
            {profile?.email && (
              <p>
                <strong>E-mail:</strong>{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
            )}
            {profile?.phone && (
              <p>
                <strong>Telefone:</strong> {profile.phone}
              </p>
            )}
            {profile?.whatsapp && (
              <p>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href={`https://wa.me/${profile.whatsapp
                    .replace(/\D/g, "")
                    .trim()}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Chamar no WhatsApp
                </a>
              </p>
            )}

            {hasAddress && (
              <p className="public-profile-address">
                <strong>Atende em:</strong>{" "}
                {[profile.street, profile.neighborhood, profile.uf]
                  .filter(Boolean)
                  .join(" - ")}
                {profile.cep ? ` · CEP: ${profile.cep}` : ""}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Serviços */}
      {services.length > 0 && (
        <section className="public-profile-services">
          <header className="public-profile-services-head">
            <h2>Serviços</h2>
            <p>Pacotes e valores de referência.</p>
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
        </section>
      )}

      {/* Portfólio */}
      <section className="public-profile-portfolio">
        <header className="public-profile-portfolio-head">
          <h2>Portfólio</h2>
          <p>Alguns ensaios já realizados.</p>
        </header>

        {(!galleries || galleries.length === 0) && (
          <p>Nenhuma galeria publicada ainda.</p>
        )}

        <div className="public-profile-gallery-grid">
          {galleries?.map((gallery) => (
            <article key={gallery.id} className="public-profile-gallery-card">
              {gallery.coverUrl && (
                <div className="public-profile-gallery-cover">
                  <img src={gallery.coverUrl} alt={gallery.name} />
                </div>
              )}
              <h3>{gallery.name}</h3>

              {/* mini grid com fotos da galeria */}
              {gallery.photos && gallery.photos.length > 0 && (
                <div className="public-profile-gallery-photos">
                  {gallery.photos.slice(0, 6).map((photo) => (
                    <div
                      key={photo.id}
                      className="public-profile-gallery-photo"
                    >
                      <img src={photo.url} alt={gallery.name} />
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
