import React, { useState } from "react";
import "../Footer.css";

export const Footer = () => {
  const [showContact, setShowContact] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const open = () => {
    setShowContact(true);
    setSent(false);
  };

  const close = () => {
    setShowContact(false);
    setName("");
    setEmail("");
    setMessage("");
    setSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular envío: no se realiza petición real
    setSent(true);
  };

  return (
    <>
      <footer className="skillbank-footer mt-auto">
        <div className="container">

          <div>
            <div className="footer-brand">
              <div className="footer-logo-pill">
                <span className="footer-logo-dot" />
                <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  SkillBank
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <p className="footer-text">
                La app donde tus créditos se convierten en aprendizaje, cursos y nuevas
                oportunidades profesionales.
              </p>
              <button className="btn btn-outline-light btn-sm" type="button" onClick={open}>
                Contáctanos
              </button>
            </div>

          </div>

          <div className="footer-meta">
            <div className="footer-rights">
              © {new Date().getFullYear()} SkillBank. Todos los derechos reservados.
            </div>
            <div className="footer-badge">
              <span className="footer-badge-dot" />
              <span className="footer-badge-text">Créditos activos y aprendizaje en tiempo real</span>
            </div>
          </div>
        </div>
      </footer>

      {showContact && (
        <div className="modal-overlay" onClick={close}>
          <div className="skillbank-modal shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Contáctanos</h5>
              <button type="button" className="btn-close" onClick={close}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body text-start">
                {!sent ? (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Mensaje</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        required
                      ></textarea>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="fw-semibold">¡Mensaje enviado!</p>
                    <p className="text-muted">Gracias por contactarnos. Te responderemos pronto.</p>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                {!sent ? (
                  <>
                    <button type="button" className="btn btn-ghost" onClick={close}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-pill btn-primary">
                      Enviar
                    </button>
                  </>
                ) : (
                  <button type="button" className="btn btn-pill btn-primary" onClick={close}>
                    Cerrar
                  </button>
                )}
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
};
