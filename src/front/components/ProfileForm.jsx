import { useState, useEffect } from "react";
import "../ProfileForm.css";
import skillbankAvatar from "../assets/img/SkillBank.png";

export const ProfileForm = ({ user = {}, onSubmit }) => {
  const isEditing = Boolean(user && user.id);


  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (isEditing && user.avatar_url) {
      setPreview(user.avatar_url);
    } else {
      const randomSeed = Math.random().toString(36).substring(2);
      const url = `https://api.dicebear.com/9.x/croodles/svg?seed=${randomSeed}`;
      setPreview(url);
    }
  }, [isEditing, user.avatar_url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    const form = e.target;
    const formData = new FormData(form);

    const password = formData.get("password");
    const confirm = formData.get("confirm_password");


    if (password || confirm) {
      const pwd = password || "";
      const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
      if (!pwdRegex.test(pwd)) {
        setErrors(
          "La contraseña debe tener al menos 8 caracteres e incluir letras y números."
        );
        return;
      }

      if (password !== confirm) {
        setErrors("Las contraseñas no coinciden.");
        return;
      }
    }

    const email = formData.get("email");
    const updatedUser = {
      email,
      avatar_url: isEditing ? formData.get("avatar_url") || preview : preview,
      password: password || null,
    };

    if (isEditing) {
      updatedUser.name = formData.get("name");
      updatedUser.description = formData.get("description");
    } else {

      updatedUser.name = email ? email.split("@")[0] : "Usuario";
    }

    onSubmit(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit} className="skillbank-form">

      {errors && <p className="form-error">{errors}</p>}

      {/* PREVIEW DEL AVATAR */}
      <div className="avatar-preview-wrapper">
        <img
          src={preview || skillbankAvatar}
          className="avatar-preview"
          alt="Avatar aleatorio"
        />

      </div>

      {isEditing && (
        <div className="form-field">
          <label>URL de la imagen</label>
          <input
            type="text"
            name="avatar_url"
            placeholder="https://imagen.com/avatar.png"
            defaultValue={user.avatar_url || ""}
            onChange={(e) => setPreview(e.target.value)}
          />
        </div>
      )}

      {isEditing && (
        <div className="form-field">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            defaultValue={user.name || ""}
            required
          />
        </div>
      )}

      {isEditing && (
        <div className="form-field">
          <label>Biografía</label>
          <textarea
            name="description"
            rows="3"
            defaultValue={user.description || ""}
          />
        </div>
      )}

      <div className="form-field">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="email@ejemplo.com"
          defaultValue={user.email || ""}
          required
        />
      </div>


      <div className="form-field">
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="******"
        />
      </div>

      <div className="form-field">
        <label>Confirmación de contraseña</label>
        <input
          type="password"
          name="confirm_password"
          placeholder="******"
        />
      </div>

      <button type="submit" className="btn-pill form-submit">
        CONFIRMAR
      </button>
    </form>
  );
};
