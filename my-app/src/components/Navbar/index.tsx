import { FC } from "react";
import { Navbar as NavbarComp, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar: FC = () => {
  return (
    <NavbarComp expand="lg" className="navbar-bg border-bottom border-secondary border-2" sticky="top">
      <Container fluid>
        {/* Логотип */}
        <NavbarComp.Brand className="d-flex align-items-center">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src="/icon.png" alt="Logo" className="navbar-logo me-2" />
            <div className="brand-info">
              <h1 className="brand-name">ИСТОРИЯ ЖИВОПИСИ</h1>
              <p className="brand-description">Картины для экспертизы</p>
            </div>
          </Link>
        </NavbarComp.Brand>

        {/* Триггер для бургера */}
        <NavbarComp.Toggle aria-controls="navbar-content" />

        {/* Навигационные элементы */}
        <NavbarComp.Collapse id="navbar-content">
          <Nav className="ms-auto nav-link-container">
            <Link to="/paintings" className="nav-link-services">
              Картины для экспертизы
            </Link>
          </Nav>
        </NavbarComp.Collapse>
      </Container>
    </NavbarComp>
  );
};

export default Navbar;
