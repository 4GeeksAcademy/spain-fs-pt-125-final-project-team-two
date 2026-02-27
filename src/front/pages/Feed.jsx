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
        dispatch({ type: "SET_ACTIVITIES", payload: data });
      } catch (error) {
        console.error("Error cargando skills:", error);
      }
    };
    fetchSkills();
  }, [dispatch]);

  // --- LÓGICA DE ORGANIZACIÓN ---
  const mySkills = store.activities.filter(skill => skill.user_id === store.user?.id);
  const othersSkills = store.activities.filter(skill => skill.user_id !== store.user?.id);

  // Agrupamos las skills de otros por nombre de usuario
  const groupedSkills = othersSkills.reduce((acc, skill) => {
    const userName = skill.user_name || `Usuario #${skill.user_id}`;
    if (!acc[userName]) acc[userName] = [];
    acc[userName].push(skill);
    return acc;
  }, {});

  return (
    <div className="feed-page" style={{ paddingBottom: "50px" }}>
      <div className="feed-container container">
        
        {/* SECCIÓN 1: MIS SKILLS */}
        {mySkills.length > 0 && (
          <section className="mb-5">
            <h2 className="feed-title mb-4" style={{ borderLeft: "4px solid #3b82f6", paddingLeft: "15px" }}>Mis Habilidades</h2>
            <div className="row g-4">
              {mySkills.map((skill) => (
                <div className="col-md-4" key={skill.id}>
                  <InfoCard skill={skill} isOwner={true} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECCIÓN 2: SKILLS DE COMPAÑEROS */}
        <h2 className="feed-title mb-4">Habilidades de la Comunidad</h2>
        {Object.keys(groupedSkills).length === 0 && mySkills.length === 0 ? (
          <div className="feed-empty text-center py-5">
            <i className="fa-regular fa-inbox" style={{ fontSize: "4rem", color: "#475569" }}></i>
            <h3 className="mt-3">No hay actividades disponibles</h3>
          </div>
        ) : (
          Object.entries(groupedSkills).map(([userName, skills]) => (
            <div key={userName} className="mb-5">
              <h4 className="text-white mb-3" style={{ fontSize: "1.2rem", color: "#94a3b8" }}>
                <i className="fa-solid fa-user-circle me-2 text-primary"></i>{userName}
              </h4>
              <div className="row g-4">
                {skills.map((skill) => (
                  <div className="col-md-4" key={skill.id}>
                    <InfoCard skill={skill} isOwner={false} />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};