import "../Footer.css"

export const Footer = () => (
  <footer className="skillbank-footer mt-auto">
    <div className="container">
      <div>{/*contenedor*/}
        <div className="footer-brand">
          <div className="footer-logo-pill">
            <span className="footer-logo-dot" />
            <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              SkillBank
            </span>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">{/*contenedor*/}
          <p className="footer-text">
            La app donde tus créditos se convierten en aprendizaje, cursos y nuevas
            oportunidades profesionales.
          </p>
          <a href="" className="btn btn-outline-light btn-sm">
            Contáctanos
          </a>
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
);
