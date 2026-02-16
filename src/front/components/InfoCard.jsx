import React, { useState } from "react";
import PostModal from "./PostModal";
import "./../../front/InfoCard.css";

function InfoCard({ 
  title, 
  shortText, 
  fullText, 
  img, 
  user, 
  updatedAt,
  creditsPerHour 
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="skillbank-card shadow-sm">
        <div className="card-img-wrapper">
          <img src={img} alt={title} className="card-img" />
        </div>

        <div className="card-body">
          <h5 className="card-title">{title}</h5>

          <p className="card-text">{shortText}</p>

          
          <p className="card-credits">
            <strong>{creditsPerHour} créditos </strong>
          </p>

          
          <p className="card-user mt-2">
            <strong>{user}</strong>
          </p>

          <button 
            className="btn btn-primary btn-pill w-100" 
            onClick={() => setShowModal(true)}
          >
            Ver más
          </button>

          <p className="card-updated mt-3">
            <small>Actualizado {updatedAt}</small>
          </p>
        </div>
      </div>

      <PostModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => setShowModal(false)}
        title={title}
        description={fullText}
        img={img}
        user={user}
        creditsPerHour={creditsPerHour}
      />
    </>
  );
}

export default InfoCard;
