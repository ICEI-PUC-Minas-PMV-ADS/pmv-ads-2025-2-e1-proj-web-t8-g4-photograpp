import Breadcrumb from "../../components/Breadcrumb";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const STORAGE_PROFILE = "photograpp_profile";
const STORAGE_GALLERIES = "photograpp_galleries";

const defaultGalleries = [
  {
    id: "demo-1",
    name: "Casamento Maria Luisa e Cláudio",
    coverUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
    photos: [
      {
        id: "demo-1-1",
        url:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "demo-2",
    name: "Ensaio Ana Paula",
    coverUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    photos: [
      {
        id: "demo-2-1",
        url:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
];

function loadFromStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function slugify(str) {
  return (str || "perfil")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // tira acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // tira chars estranhos
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function Profile() {
  const navigate = useNavigate();

  // ================= PERFIL =================
  const [profileData, setProfileData] = useState(() =>
    loadFromStorage(STORAGE_PROFILE, {
      publicName: "",
      pageUrl: "",
      email: "",
      phone: "",
      whatsapp: "",
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      uf: "",
      bio: "",
      logo: null, // dataURL base64
    })
  );

  // ================= GALERIAS =================
  const [galleries, setGalleries] = useState(() =>
    loadFromStorage(STORAGE_GALLERIES, defaultGalleries)
  );

  // ===== Modal de galeria =====
  const [showModal, setShowModal] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [galleryName, setGalleryName] = useState("");
  const [galleryPhotos, setGalleryPhotos] = useState([]);

  // --------- Persistência no localStorage ---------
  useEffect(() => {
    localStorage.setItem(STORAGE_PROFILE, JSON.stringify(profileData));
  }, [profileData]);

  useEffect(() => {
    localStorage.setItem(STORAGE_GALLERIES, JSON.stringify(galleries));
  }, [galleries]);

  // ================= HANDLERS PERFIL =================
  const handleChangeProfileField = (field) => (e) => {
    const value = e.target.value;
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileData((prev) => ({
        ...prev,
        logo: reader.result, // base64 do logo
      }));
    };
    reader.readAsDataURL(file);
  };

  // ================= HANDLERS GALERIAS =================
  const handleAddPhotos = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setGalleryPhotos((prev) => [
          ...prev,
          {
            id:
              (window.crypto &&
                crypto.randomUUID &&
                crypto.randomUUID()) ||
              `${Date.now()}-${Math.random()}`,
            url: reader.result, // base64
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (id) => {
    setGalleryPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const openNewGallery = () => {
    setEditingGalleryId(null);
    setGalleryName("");
    setGalleryPhotos([]);
    setShowModal(true);
  };

  const openGallery = (gallery) => {
    setEditingGalleryId(gallery.id);
    setGalleryName(gallery.name);
    setGalleryPhotos(gallery.photos || []);
    setShowModal(true);
  };

  const handleSaveGallery = () => {
    if (!galleryName.trim()) {
      alert("Dê um nome para o ensaio 🙂");
      return;
    }

    setGalleries((prev) => {
      // Editar
      if (editingGalleryId) {
        return prev.map((g) =>
          g.id === editingGalleryId
            ? {
                ...g,
                name: galleryName.trim(),
                photos: galleryPhotos,
                coverUrl: galleryPhotos[0]?.url || g.coverUrl,
              }
            : g
        );
      }

      // Criar nova
      const id =
        (window.crypto && crypto.randomUUID && crypto.randomUUID()) ||
        `${Date.now()}-${Math.random()}`;

      const newGallery = {
        id,
        name: galleryName.trim(),
        photos: galleryPhotos,
        coverUrl: galleryPhotos[0]?.url || "",
      };

      return [...prev, newGallery];
    });

    setShowModal(false);
  };

  // ================= PÁGINA PÚBLICA =================
  const handleGoToPublicPage = () => {
    const slug = slugify(
      profileData.publicName || profileData.pageUrl || "perfil"
    );

    const publicData = {
      profile: profileData,
      galleries,
    };

    // salva snapshot que a página pública vai ler
    localStorage.setItem(`public_profile_${slug}`, JSON.stringify(publicData));

    // navega para /arnaldo-quintela
    navigate(`/${slug}`);
  };

  return (
    <main className="profile-page">
      <div className="profile-header">
        <div>
          <h1 className="page-title">Perfil público</h1>
          <div className="breadcrumb">
            <Breadcrumb />
          </div>
        </div>
        <button
          className="btn btn-primary-outline"
          onClick={handleGoToPublicPage}
        >
          Ver página pública
        </button>
      </div>

      {/* Card: Formulário principal */}
      <section className="profile-form">
        <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
          <div className="field span-2">
            <label>Nome público da empresa:</label>
            <input
              type="text"
              value={profileData.publicName}
              onChange={handleChangeProfileField("publicName")}
            />
          </div>

          <div className="field">
            <label>URL da página:</label>
            <input
              type="text"
              placeholder="opcional"
              value={profileData.pageUrl}
              onChange={handleChangeProfileField("pageUrl")}
            />
          </div>

          <div className="field logo-field">
            <label>Logo:</label>
            <label className="logo-drop" htmlFor="logo-input">
              {profileData.logo ? (
                <img
                  src={profileData.logo}
                  alt="Logo"
                  className="logo-preview"
                />
              ) : (
                <span className="logo-hint">
                  Arraste ou clique para enviar
                </span>
              )}
            </label>
            <input
              id="logo-input"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              hidden
            />
          </div>

          <div className="field">
            <label>E-mail para contato:</label>
            <input
              type="email"
              value={profileData.email}
              onChange={handleChangeProfileField("email")}
            />
          </div>
          <div className="field">
            <label>Telefone:</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={handleChangeProfileField("phone")}
            />
          </div>
          <div className="field">
            <label>WhatsApp:</label>
            <input
              type="tel"
              value={profileData.whatsapp}
              onChange={handleChangeProfileField("whatsapp")}
            />
          </div>

          {/* Endereço */}
          <div className="field">
            <label>Endereço:</label>
            <input
              type="text"
              placeholder="CEP"
              value={profileData.cep}
              onChange={handleChangeProfileField("cep")}
            />
          </div>

          <div className="field span-3 rua-field">
            <label>&nbsp;</label>
            <input
              type="text"
              placeholder="Rua, avenida..."
              value={profileData.street}
              onChange={handleChangeProfileField("street")}
            />
          </div>
          <div className="field">
            <input
              type="text"
              placeholder="Número"
              value={profileData.number}
              onChange={handleChangeProfileField("number")}
            />
          </div>
          <div className="field">
            <input
              type="text"
              placeholder="Complemento"
              value={profileData.complement}
              onChange={handleChangeProfileField("complement")}
            />
          </div>
          <div className="field">
            <input
              type="text"
              placeholder="Bairro"
              value={profileData.neighborhood}
              onChange={handleChangeProfileField("neighborhood")}
            />
          </div>
          <div className="field">
            <select
              className="uf"
              value={profileData.uf}
              onChange={handleChangeProfileField("uf")}
            >
              <option value="" disabled>
                UF
              </option>
              {[
                "AC",
                "AL",
                "AP",
                "AM",
                "BA",
                "CE",
                "DF",
                "ES",
                "GO",
                "MA",
                "MT",
                "MS",
                "MG",
                "PA",
                "PB",
                "PR",
                "PE",
                "PI",
                "RJ",
                "RN",
                "RS",
                "RO",
                "RR",
                "SC",
                "SP",
                "SE",
                "TO",
              ].map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </div>

          <div className="field span-4">
            <label>Biografia:</label>
            <textarea
              rows={6}
              value={profileData.bio}
              onChange={handleChangeProfileField("bio")}
            />
          </div>
        </form>
      </section>

      {/* ================= PORTFÓLIO ================= */}
      <section className="portfolio">
        <div className="portfolio__head">
          <div>
            <h2>Portfólio</h2>
            <p>Adicione suas melhores fotos para encantar seus clientes.</p>
          </div>
          <button className="btn btn-primary" onClick={openNewGallery}>
            Nova Galeria
          </button>
        </div>

        <div className="gallery">
          {galleries.length === 0 && (
            <div className="gallery-empty">
              Nenhuma galeria ainda. Clique em “Nova Galeria” para começar.
            </div>
          )}

          {galleries.map((gallery) => (
            <figure
              key={gallery.id}
              className="thumb"
              onClick={() => openGallery(gallery)}
            >
              {gallery.coverUrl && (
                <img src={gallery.coverUrl} alt={gallery.name} />
              )}
              <figcaption>{gallery.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ================= MODAL GALERIA ================= */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingGalleryId ? "Editar galeria" : "Nova galeria"}</h3>
              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="field">
                <label>Nome do ensaio:</label>
                <input
                  type="text"
                  placeholder="Ex: Ensaio Gestante"
                  value={galleryName}
                  onChange={(e) => setGalleryName(e.target.value)}
                />
              </div>

              <div>
                <div className="photos-header">
                  <label
                    style={{ color: "var(--muted)", fontSize: ".95rem" }}
                  >
                    Fotos:
                  </label>

                  <label
                    className="btn btn-primary"
                    style={{
                      fontSize: ".85rem",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Enviar fotos
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      hidden
                      onChange={handleAddPhotos}
                    />
                  </label>
                </div>

                <div className="photos-grid">
                  {galleryPhotos.length === 0 && (
                    <div
                      style={{
                        gridColumn: "1/-1",
                        textAlign: "center",
                        padding: "20px",
                        border: "1px dashed var(--line)",
                        borderRadius: "8px",
                        color: "var(--muted)",
                      }}
                    >
                      Nenhuma foto selecionada.
                    </div>
                  )}

                  {galleryPhotos.map((photo) => (
                    <div key={photo.id} className="photo-item">
                      <img src={photo.url} alt="Preview" />
                      <div className="photo-actions">
                        <span
                          className="action-icon"
                          onClick={() => removePhoto(photo.id)}
                          title="Excluir"
                        >
                          {/* lixeira */}  
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </span>

                        <span className="action-icon" title="Editar">
                          {/* lápis */}
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-primary"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="btn-primary"
                type="button"
                onClick={handleSaveGallery}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
