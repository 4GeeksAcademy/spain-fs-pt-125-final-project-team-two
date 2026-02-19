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
    <div className="container mt-4">
      <h2 className="mb-4">Actividades disponibles</h2>

      
      {store.activities.length === 0 && (
        <p className="text-muted">No hay actividades recientes.</p>
      )}

      <div className="row g-4">
        {store.activities.map((skill) => (
          <div className="col-md-4" key={skill.id}>
            <InfoCard
              title={skill.title}
              shortText={skill.description}
              fullText={skill.description}
              img={skill.image_url || PredefinedIMG}
              user={`Usuario #${skill.user_id}`} 
              updatedAt="Recientemente"
              creditsPerHour={skill.credits_per_hour}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
