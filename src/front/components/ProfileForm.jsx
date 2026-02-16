import { useState } from "react";
import "../ProfileForm.css"; 
export const ProfileForm = ({ user = {}, onSubmit }) => {
  const [preview, setPreview] = useState(user.avatar_url || "");
  const [errors, setErrors] = useState("");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    const form = e.target;
    const formData = new FormData(form);

    const password = formData.get("password");
    const confirm = formData.get("confirm_password");

    // Validaciones de contraseña
    if (password || confirm) {
      if (password.length < 6) {
        setErrors("La contraseña debe tener al menos 6 caracteres.");
        return;
      }

      if (password !== confirm) {
        setErrors("Las contraseñas no coinciden.");
        return;
      }
    }

    const avatarFile = form.avatar_file.files[0];

    const updatedUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      description: formData.get("description"),
      avatar_url: preview,
      avatar_file: avatarFile,
      password: password || null,
    };

    onSubmit(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit} className="skillbank-form">

      {errors && <p className="form-error">{errors}</p>}

      {/* PREVIEW DEL AVATAR */}
      <div className="avatar-preview-wrapper">
        <img
          src={preview || "/default-avatar.png"}
          alt="Avatar preview"
          className="avatar-preview"
        />
      </div>

      <div className="form-field">
        <label>Subir nueva foto</label>
        <input
          type="file"
          name="avatar_file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </div>

      <div className="form-field">
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          defaultValue={user.name || ""}
          required
        />
      </div>

      <div className="form-field">
        <label>Email</label>
        <input
          type="email"
          name="email"
          defaultValue={user.email || ""}
          required
        />
      </div>

      <div className="form-field">
        <label>Biografía</label>
        <textarea
          name="description"
          rows="3"
          defaultValue={user.description || ""}
        />
      </div>

      {/* CAMPOS DE CONTRASEÑA */}
      <div className="form-field">
        <label>Nueva contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="Déjalo vacío si no quieres cambiarla"
        />
      </div>

      <div className="form-field">
        <label>Confirmar nueva contraseña</label>
        <input
          type="password"
          name="confirm_password"
          placeholder="Déjalo vacío si no quieres cambiarla"
        />
      </div>

      <button type="submit" className="btn-pill form-submit">
        CONFIRMAR
      </button>
    </form>
  );
};
