import Breadcrumb from "../../components/Breadcrumb";
import { useState } from "react";
import "./profile.css";

export default function Profile() {
  const [logo, setLogo] = useState(null);

  return (
    <main className="profile-page">
      <div className="profile-header">
        <div>
          <h1 className="page-title">Perfil público</h1>
          <div className="breadcrumb">
            <Breadcrumb />
          </div>
        </div>
        <button className="btn btn-primary-outline">Ver página pública</button>
      </div>

      {/* Card: Formulário principal */}
      <section className="profile-form">
        <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
          <div className="field span-2">
            <label>Nome público da empresa:</label>
            <input type="text" placeholder="" />
          </div>

          <div className="field">
            <label>URL da página:</label>
            <input type="text" placeholder="" />
          </div>

          <div className="field logo-field">
            <label>Logo:</label>
            <label className="logo-drop" htmlFor="logo-input">
              {logo ? (
                <img
                  src={URL.createObjectURL(logo)}
                  alt="Logo"
                  className="logo-preview"
                />
              ) : (
                <span className="logo-hint">Arraste ou clique para enviar</span>
              )}
            </label>
            <input
              id="logo-input"
              type="file"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files?.[0] || null)}
              hidden
            />
          </div>

          <div className="field">
            <label>E-mail para contato:</label>
            <input type="email" />
          </div>

          <div className="field">
            <label>Telefone:</label>
            <input type="tel" />
          </div>

          <div className="field">
            <label>WhatsApp:</label>
            <input type="tel" />
          </div>

          <div className="field">
            <label>Endereço:</label>
            <input type="text" placeholder="CEP" />
          </div>

          <div className="field span-3 rua-field">
            <label>&nbsp;</label>
            <input type="text" placeholder="Rua, avenida..." />
          </div>

          <div className="field">
            <input type="text" placeholder="Número" />
          </div>

          <div className="field">
            <input type="text" placeholder="Complemento" />
          </div>

          <div className="field">
            <input type="text" placeholder="Bairro" />
          </div>

          <div className="field">
            <div className="">
              <select className="uf" defaultValue="">
                <option value="" disabled>UF</option>
                {[
                  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS",
                  "MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC",
                  "SP","SE","TO",
                ].map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field span-4">
            <label>Biografia:</label>
            <textarea rows={6} />
          </div>
        </form>
      </section>

      <section className="portfolio">
        <div className="portfolio__head">
          <div>
            <h2>Portfólio</h2>
            <p>Adicione suas melhores fotos para encantar seus clientes.</p>
          </div>
          <button className="btn btn-primary">Nova galeria</button>
        </div>

        <div className="gallery">
          <figure className="thumb">
            <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop" alt="" />
            <figcaption>Casamento Maria Luisa e Cláudio</figcaption>
          </figure>

          <figure className="thumb">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" alt="" />
            <figcaption>Ensaio Ana Paula</figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}    
