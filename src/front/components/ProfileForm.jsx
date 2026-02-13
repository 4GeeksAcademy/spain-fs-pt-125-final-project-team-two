export const ProfileForm = ({ defaultValues = {}, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="name"
          className="form-control"
          defaultValue={defaultValues.name || ""}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          defaultValue={defaultValues.email || ""}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          name="description"
          className="form-control"
          defaultValue={defaultValues.description || ""}
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Guardar
      </button>
    </form>
  );
};
