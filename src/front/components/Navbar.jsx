import { Link } from "react-router-dom";
import './../../front/Navbar.css'

export const Navbar = () => {

	return (
		<div className="app-root">
      <nav className="navbar navbar-expand-lg navbar-dark skillbank-navbar shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-semibold" href="#">
            <span className="brand-pill">SkillBank</span>
          </a>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active nav-link-underline" aria-current="page" href="#">
                  Cursos
                </a>
              </li>
            </ul>

            <form className="d-flex me-3 search-wrapper" role="search">
              <input
                className="form-control form-control-sm search-input"
                type="search"
                placeholder="Buscar cursos"
                aria-label="Buscar"
              />
              <button className="btn btn-outline-light btn-sm search-button" type="submit">
                Buscar
              </button>
            </form>

            <div className="d-flex gap-2 auth-buttons">
              <button className="btn btn-outline-light btn-sm btn-ghost" type="button">
                Login
              </button>
              <button className="btn btn-primary btn-sm btn-pill" type="button">
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
	);
};