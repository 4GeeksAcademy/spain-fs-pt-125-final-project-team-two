import { Link } from "react-router-dom";
import InfoCard from "../components/InfoCard";

export const Feed = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Actividades disponibles</h2>

      <div className="row g-4">

        <div className="col-md-4">
          <InfoCard
            title="Clases de guitarra"
            shortText="Aprende acordes básicos y ritmos sencillos."
            fullText="En esta actividad aprenderás a tocar canciones sencillas, postura correcta, rasgueos y acordes fundamentales. No necesitas experiencia previa."
            img="https://picsum.photos/300/200"
            user="Carlos Pérez"
            updatedAt="hace 2 días"
            creditsPerHour={3}
          />
        </div>

        <div className="col-md-4">
          <InfoCard
            title="Reparación de bicicletas"
            shortText="Ajustes básicos y mantenimiento general."
            fullText="Te enseño a reparar pinchazos, ajustar frenos, lubricar la cadena y dejar tu bici lista para rodar."
            img="https://picsum.photos/300/201"
            user="Laura Gómez"
            updatedAt="hace 5 horas"
            creditsPerHour={5}
          />
        </div>

        <div className="col-md-4">
          <InfoCard
            title="Clases de cocina"
            shortText="Aprende recetas fáciles y deliciosas."
            fullText="Cocinaremos platos mediterráneos, postres sencillos y técnicas básicas para mejorar tus habilidades en la cocina."
            img="https://picsum.photos/300/202"
            user="Ana Torres"
            updatedAt="ayer"
            creditsPerHour={4}
          />
        </div>

      </div>
    </div>
  );
};
