import { ProfileForm } from "../components/ProfileForm";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Profile = () => {
  const { store, dispatch } = useGlobalReducer();

  // Datos del usuario desde el store global
  const userData = store.user || {
    name: "Benjamin",
    email: "benjamin@example.com",
    description: "Desquiciado a tiempo completo",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updatedUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      description: formData.get("description"),
    };

    // Guardar en el store global
    dispatch({
      type: "SET_USER",
      payload: updatedUser,
    });

    console.log("Perfil actualizado:", updatedUser);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Mi perfil</h2>

      <ProfileForm
        defaultValues={userData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
