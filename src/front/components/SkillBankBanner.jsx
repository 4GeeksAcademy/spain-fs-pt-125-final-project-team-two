import React from "react";
import '../SkillBankBanner.css'

function SkillBankBanner() {
  return (
    <section className="skillbank-banner py-5">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-lg-6">
            <div className="d-inline-flex align-items-center gap-2 mb-3 badge-soft">
              <span className="badge-dot" />
              <span className="badge-text">Intercambia créditos por conocimiento</span>
            </div>

            <h1 className="banner-title mb-3">
              Convierte tu tiempo en{' '}
              <span className="highlight-gradient">aprendizaje real</span>.
            </h1>

            <p className="banner-subtitle mb-4">
              SkillBank es la aplicación donde tus créditos se transforman en cursos,
              habilidades y oportunidades. Aprende, comparte y desbloquea recompensas
              mientras avanzas.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <button className="btn btn-primary btn-lg btn-pill">
                Explorar cursos
              </button>
              <a
                href="#como-funciona"
                className="btn btn-outline-dark btn-lg btn-ghost-light"
              >
                Cómo funciona
              </a>
            </div>

            <div className="d-flex flex-wrap gap-3 banner-metrics">
              <div className="metric-pill">
                <span className="metric-number">+12k</span>
                <span className="metric-label">cursos canjeados</span>
              </div>
              <div className="metric-pill">
                <span className="metric-number">+50k</span>
                <span className="metric-label">créditos activos</span>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="banner-card">
              <div className="banner-orbit" />
              <div className="banner-orbit inner" />

              <div className="credit-card floating-card">
                <div className="credit-header">
                  <span className="credit-label">Saldo SkillBank</span>
                  <span className="credit-tag">En crecimiento</span>
                </div>
                <div className="credit-amount">20 créditos</div>
                <div className="credit-footer">
                  <span className="credit-user">Para nuevos cursos</span>
                  <span className="credit-chip" />
                </div>
              </div>

              <div className="course-chip chip-top">
                <span className="chip-title">Diseño UX avanzado</span>
                <span className="chip-meta">430 créditos</span>
              </div>

              <div className="course-chip chip-bottom">
                <span className="chip-title">IA para principiantes</span>
                <span className="chip-meta">3 créditos/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillBankBanner