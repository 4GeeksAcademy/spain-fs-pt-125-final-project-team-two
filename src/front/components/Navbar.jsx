import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer'
import "./../../front/Navbar.css";

export const Navbar = ({ onOpenRegister }) => {

  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'logout' });
    navigate('/');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark skillbank-navbar shadow-sm" style={{ zIndex: 1050 }}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-semibold">
          <span className="brand-pill">SkillBank</span>
        </Link>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSkillBank"
          aria-controls="navbarSkillBank"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse navbar-animate" id="navbarSkillBank">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

          <div className="d-flex gap-2 auth-buttons">
            {!store.token ? (
              <>
                <button className="btn btn-outline-light btn-sm btn-ghost" type="button" onClick={() => dispatch({ type: "TOGGLE_LOGIN_MODAL" })}>
                  Login
                </button>

                <button
                  className="btn btn-primary btn-sm btn-pill"
                  type="button"
                  onClick={onOpenRegister}
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <Link to="/feed">
                  <button className="btn btn-outline-light btn-sm btn-ghost" type="button">
                    Cursos
                  </button>
                </Link>

                <div className="dropdown position-relative">
                  <button
                    className="btn btn-outline-light btn-sm btn-ghost dropdown-toggle d-flex align-items-center gap-2"
                    type="button"
                    onClick={() => dispatch({ type: "TOGGLE_PROFILE_DROPDOWN" })}
                  >
                    Mi cuenta
                  </button>
                  {store.isProfileDropdownOpen && (
                    <ul
                      className="dropdown-menu dropdown-menu-dark show position-absolute shadow"
                      style={{
                        right: 0,
                        left: "auto",
                        top: "120%",
                        minWidth: "150px",
                        backgroundColor: "#1e293b",
                        border: "1px solid rgba(148, 163, 184, 0.2)",
                        zIndex: 1050
                      }}
                    >
                      <li>
                        <Link
                          to="/profile"
                          className="dropdown-item skillbank-dropdown-item fw-medium"
                          onClick={() => dispatch({ type: "TOGGLE_PROFILE_DROPDOWN" })}
                        >
                          Mi Perfil
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider" style={{ borderColor: "rgba(148, 163, 184, 0.2)", margin: "4px 0" }} /></li>
                      <li>
                        <button
                          className="dropdown-item skillbank-dropdown-danger fw-semibold"
                          type="button"
                          onClick={() => {
                            dispatch({ type: "TOGGLE_PROFILE_DROPDOWN" });
                            handleLogout();
                          }}
                        >
                          Cerrar Sesión
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
