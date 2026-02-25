import React, { useState } from "react";

function ContactModal({ show, onClose, title, teacherName }) {
  const [message, setMessage] = useState("");
  const [dateTime, setDateTime] = useState("");

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Solicitud enviada para: ${title}`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="skillbank-modal shadow-lg">
        <div className="modal-header">
          <h5 className="modal-title fw-bold text-white">Coordinar Cita</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body text-start">
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Profesor: <strong style={{color: '#f8fafc'}}>{teacherName || "Usuario"}</strong></p>
            
            <div className="mb-3">
              <label className="form-label">Fecha y Hora Propuesta</label>
              <input 
                type="datetime-local" className="form-control" 
                value={dateTime} onChange={(e) => setDateTime(e.target.value)} required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mensaje para coordinar</label>
              <textarea 
                className="form-control" rows="3" 
                placeholder="Hola, me gustaría aprender contigo..."
                value={message} onChange={(e) => setMessage(e.target.value)} required
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-pill btn-primary px-4">Enviar Solicitud</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;