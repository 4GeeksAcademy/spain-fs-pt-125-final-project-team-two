import { useEffect } from "react";
import InfoCard from "../components/InfoCard";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { API_URL } from "../../config.js";

export const Feed = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${API_URL}/api/skills`);
        const data = await response.json();
        dispatch({ type: "SET_ACTIVITIES", payload: data });
      } catch (error) {
        console.error("Error cargando skills:", error);
      }
    };
    fetchSkills();
  }, [dispatch]);

  // --- LÓGICA DE ORGANIZACIÓN SENIOR ---
  // 1. Filtramos solo las de otros
  // 2. Ordenamos por ID descendente (más nuevas primero)
  const othersSkills = store.activities
    .filter(skill => skill.user_id !== store.user?.id)
    .sort((a, b) => b.id - a.id);

  return (
    <div className="feed-page" style={{ paddingBottom: "50px" }}>
      <div className="feed-container container">
        
        <h2 className="feed-title mb-4">Habilidades de la Comunidad</h2>
        
        {othersSkills.length === 0 ? (
          <div className="feed-empty text-center py-5">
            <i className="fa-regular fa-inbox" style={{ fontSize: "4rem", color: "#475569" }}></i>
            <h3 className="mt-3">No hay actividades disponibles</h3>
          </div>
        ) : (
          <div className="row g-4">
            {othersSkills.map((skill) => (
              <div className="col-md-4" key={skill.id}>
                <InfoCard skill={skill} isOwner={false} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};