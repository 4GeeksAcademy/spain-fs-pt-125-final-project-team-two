import { useEffect } from "react";
import InfoCard from "../components/InfoCard";
import useGlobalReducer from "../hooks/useGlobalReducer";
import PredefinedIMG from "../assets/img/PredefinedIMG.jpg";
import { API_URL } from "../../config.js";

export const Feed = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${API_URL}/api/skills`);
        const data = await response.json();

        dispatch({
          type: "SET_ACTIVITIES",
          payload: data
        });

      } catch (error) {
        console.error("Error cargando skills:", error);
      }
    };

    fetchSkills();
  }, [dispatch]);

  return (
    <div className="feed-page">
      <div className="feed-container">
        <h2 className="feed-title">Actividades disponibles</h2>

        {store.activities.length === 0 ? (
          <div className="feed-empty">
            <i className="fa-regular fa-inbox" style={{ fontSize: "4rem", marginBottom: "1.5rem" }}></i>
            <h3>No hay actividades disponibles</h3>
            <p>Vuelve más tarde para ver nuevas actividades</p>
          </div>
        ) : (
          <div className="row g-4">
            {store.activities.map((skill) => (
              <div className="col-md-4" key={skill.id}>
                <InfoCard
                  title={skill.title}
                  id={skill.id}
                  shortText={skill.description}
                  fullText={skill.description}
                  img={skill.image_url || PredefinedIMG}
                  user={`Usuario #${skill.user_id}`}
                  user_id={skill.user_id}
                  updatedAt="Recientemente"
                  creditsPerHour={skill.credits_per_hour}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
