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
    <nav className="navbar navbar-expand-lg navbar-dark skillbank-navbar shadow-sm">
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
                <Link to="/profile">
                  <button className="btn btn-outline-light btn-sm btn-ghost" type="button">
                    Mi Perfil
                  </button>
                </Link>
                <button
                  className="btn btn-danger btn-sm btn-pill"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
