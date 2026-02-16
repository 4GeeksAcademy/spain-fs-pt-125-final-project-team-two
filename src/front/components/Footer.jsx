import "../Footer.css"

export const Footer = () => (
	<footer className="skillbank-footer mt-auto">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo-pill">
              <span className="footer-logo-dot" />
              <span>SkillBank</span>
            </div>
            <p className="footer-text">
              La app donde tus créditos se convierten en aprendizaje, cursos y nuevas
              oportunidades profesionales.
            </p>
          </div>

          <div>
            <div className="footer-links-title">Plataforma</div>
            <ul className="footer-links">
              <li className="footer-link-item">
                <a href="#">Explorar cursos</a>
              </li>
              <li className="footer-link-item">
                <a href="#">Canjear créditos</a>
              </li>
              <li className="footer-link-item">
                <a href="#">Planes y beneficios</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-links-title">Soporte</div>
            <ul className="footer-links">
              <li className="footer-link-item">
                <a href="#">Centro de ayuda</a>
              </li>
              <li className="footer-link-item">
                <a href="#">Preguntas frecuentes</a>
              </li>
              <li className="footer-link-item">
                <a href="#">Contacto</a>
              </li>
            </ul>
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
