import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

function ContactModal({ show, onClose, title, teacherName }) {
  const { dispatch } = useGlobalReducer();
  const [message, setMessage] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // VALIDACIÓN: Fecha mínima permitida (ahora mismo)
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const localISOTime = new Date(now - offset).toISOString().slice(0, 16);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Guardamos en la tabla de trazabilidad
    dispatch({
      type: "ADD_CONTACT_HISTORY",
      payload: { date: dateTime, skillTitle: title, teacher: teacherName }
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay">
      <div className="skillbank-modal shadow-lg">
        
        {isSuccess ? (
          <div className="modal-body text-center py-5">
            <h4 className="fw-bold text-white mb-3">¡Clase contactada!</h4>
            <p style={{ color: '#94a3b8' }}>Pronto recibirás un mensaje del profesor.</p>
          </div>
        ) : (
          <>
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
                    min={localISOTime}
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
          </>
        )}
      </div>
    </div>
  );
}

export default ContactModal;