import "../../front/SkillBankAbout.css"

function SkillBankAbout(){
    return (
        <section className="about-section">
      <div className="container">
        <div className="about-grid">
          <div>
            <div className="about-eyebrow">Quiénes somos</div>
            <h2 className="about-title">Una banca de habilidades, no de dinero</h2>
            <p className="about-text">
              SkillBank nace con una idea simple: que cualquier persona pueda acceder a
              aprendizaje de calidad sin depender solo de dinero, sino de su tiempo,
              esfuerzo y curiosidad. Tus créditos representan horas de foco, no solo un
              saldo en una cuenta.
            </p>
            <p className="about-text">
              Diseñamos la plataforma para que intercambiar créditos por cursos sea
              transparente, seguro y justo. Ves qué vas a aprender, cuántos créditos
              invertirás y qué valor real puedes conseguir con cada hora.
            </p>
            <div className="about-pill-row">
              <span className="about-pill">Enfoque en confianza y claridad</span>
              <span className="about-pill">Créditos ↔ horas de aprendizaje</span>
              <span className="about-pill">Mentores y cursos revisados</span>
            </div>
          </div>

          <div>
            <div className="about-card">
              <div className="about-card-title">Por qué existe SkillBank</div>
              <div className="about-card-highlight">
                Para que invertir en ti sea sencillo y medible.
              </div>
              <p className="about-card-text">
                Cada curso, mentoría o sesión en SkillBank está pensado como un
                intercambio claro: tú aportas créditos, recibes horas reales de
                conocimiento práctico. Sin letras pequeñas, sin promesas vacías: solo
                aprendizaje que puedes sentir y aplicar.
              </p>

              <div className="about-trust-row">
                <span className="about-trust-pill">Uso transparente de créditos</span>
                <span className="about-trust-pill">Historial de sesiones y progreso</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

export default SkillBankAbout