import "../SkillBankHowItWork.css"

function SkillBankHowItWorks() {
  return (
    <section id="como-funciona" className="howitworks-section">
      <div className="container">
        <div className="howitworks-header">
          <div className="howitworks-badge">
            <span className="howitworks-badge-dot" />
            <span>Cómo funciona</span>
          </div>
          <h2 className="howitworks-title">Intercambia tus créditos por horas de aprendizaje</h2>
          <p className="howitworks-subtitle">
            SkillBank convierte tus créditos en tiempo real de aprendizaje con personas
            y cursos especializados. Tú decides en qué habilidades invertir cada crédito.
          </p>
        </div>

        <div className="howitworks-grid">
          <div className="howitworks-card">
            <div className="howitworks-step">1</div>
            <div className="howitworks-card-title">Crea tu cuenta y consigue créditos</div>
            <p className="howitworks-card-text">
              Regístrate, recibe tus primeros créditos y suma más participando en la
              comunidad o adquiriéndolos según tus objetivos de aprendizaje.
            </p>
          </div>

          <div className="howitworks-card">
            <div className="howitworks-step">2</div>
            <div className="howitworks-card-title">Elige cursos y horas</div>
            <p className="howitworks-card-text">
              Explora el catálogo, donde cada curso indica cuántos créditos requiere por
              hora. Reserva sesiones según tu disponibilidad y tu saldo.
            </p>
          </div>

          <div className="howitworks-card">
            <div className="howitworks-step">3</div>
            <div className="howitworks-card-title">Aprende y libera valor</div>
            <p className="howitworks-card-text">
              Asiste a tus sesiones, recibe feedback y desbloquea logros. Mientras
              aprendes, puedes recuperar o ganar nuevos créditos compartiendo tu propio
              conocimiento.
            </p>
          </div>
        </div>

        <div className="howitworks-example">
          Ejemplo: con <strong>2 créditos</strong> reservas <strong>1 hora</strong> de
          aprendizaje de guitarra. Al terminar, puedes valorar la sesión y seguir usando
          tus créditos en nuevas habilidades.
        </div>
      </div>
    </section>
  )
}

export default SkillBankHowItWorks