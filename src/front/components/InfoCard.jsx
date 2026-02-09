import React, { useState } from "react";
import PostModal from "./PostModal";

function InfoCard({
  title,
  shortText,
  fullText,
  img,
  user,
  updatedAt
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={img} className="img-fluid rounded-start" alt={title} />
          </div>

          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>

              <p className="card-text">{shortText}</p>

              <button
                className="btn btn-primary mb-2"
                onClick={() => setShowModal(true)}
              >
                Ver más
              </button>

              <p className="card-text">
                <strong>{user}</strong>
              </p>

              <p className="card-text">
                <small className="text-body-secondary">
                  Last updated {updatedAt}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <PostModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          console.log("Confirmado");
          setShowModal(false);
        }}
        title={title}
        description={fullText}
        img={img}
        user={user}
      />
    </>
  );
}

export default InfoCard;
