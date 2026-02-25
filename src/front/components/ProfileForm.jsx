import { useState } from "react";
import "../ProfileForm.css";
import skillbankAvatar from "../assets/img/SkillBank.png";

export const ProfileForm = ({ user = {}, onSubmit, isRegister = false }) => {
  const [preview, setPreview] = useState(user.avatar_url || "");
  const [errors, setErrors] = useState("");

  const handleAvatarUrlChange = (e) => {
    const url = e.target.value;
    setPreview(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    const form = e.target;
    const formData = new FormData(form);

    const password = formData.get("password");
    const confirm = formData.get("confirm_password");

    // Validación: 8 caracteres, letras y números
    if (isRegister || password || confirm) {
      const hasLetters = /[a-zA-Z]/.test(password);
      const hasNumbers = /[0-9]/.test(password);

      if (!password || password.length < 8 || !hasLetters || !hasNumbers) {
        setErrors("La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.");
        return;
      }
      if (password !== confirm) {
        setErrors("Las contraseñas no coinciden.");
        return;
      }
    }

    const updatedUser = {
      name: isRegister ? "Nuevo Usuario" : formData.get("name"),
      email: formData.get("email"),
      description: isRegister ? "" : formData.get("description"),
      avatar_url: isRegister ? "" : formData.get("avatar_url"),
      password: password || null,
    };

    onSubmit(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit} className="skillbank-form">
      {errors && (
        <div className="form-error text-center text-danger mb-3" style={{ fontSize: "0.85rem", fontWeight: "600", backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "8px", borderRadius: "6px" }}>
          ⚠️ {errors}
        </div>
      )}

      {!isRegister && (
        <>
          <div className="avatar-preview-wrapper">
            <img src={preview || skillbankAvatar} className="avatar-preview" alt="Preview" />
          </div>
          <div className="form-field">
            <label>URL de la imagen</label>
            <input type="text" name="avatar_url" placeholder="https://..." defaultValue={user.avatar_url || ""} onChange={handleAvatarUrlChange} />
          </div>
          <div className="form-field">
            <label>Nombre</label>
            <input type="text" name="name" defaultValue={user.name || ""} required />
          </div>
        </>
      )}

      <div className="form-field">
        <label>Email</label>
        <input type="email" name="email" defaultValue={user.email || ""} required />
      </div>

      {!isRegister && (
        <div className="form-field">
          <label>Biografía</label>
          <textarea name="description" rows="3" defaultValue={user.description || ""} />
        </div>
      )}

      <div className="form-field">
        <label>{isRegister ? "Contraseña" : "Nueva contraseña"}</label>
        <input type="password" name="password" placeholder="******" required={isRegister} />
      </div>

      <div className="form-field">
        <label>Confirmar {isRegister ? "contraseña" : "nueva contraseña"}</label>
        <input type="password" name="confirm_password" placeholder="******" required={isRegister} />
      </div>

      <button type="submit" className="btn-pill form-submit w-100 mt-2">
        {isRegister ? "REGISTRARSE" : "CONFIRMAR CAMBIOS"}
      </button>
    </form>
  );
};