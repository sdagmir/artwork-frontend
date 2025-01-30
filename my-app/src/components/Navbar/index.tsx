import { FC } from "react";
import { Navbar as NavbarComp, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import { logoutUser } from "../../core/store/slices/userSlice";
import "./Navbar.css";
import logoImage from "/icon.png";

export const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, username } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <NavbarComp expand="lg" className="navbar-bg border-bottom border-secondary border-2" sticky="top">
      <Container fluid>
        {/* Логотип */}
        <NavbarComp.Brand className="d-flex align-items-center">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={logoImage} alt="Logo" className="navbar-logo me-2" />
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
            {/* Общая навигация */}
            <Link to="/paintings" className="nav-link-services">
              Картины для экспертизы
            </Link>

        {/* Навигация для авторизованных пользователей */}
          {isAuth && (
            <>
              <Link to="/expertises-list" className="nav-link-services">
                Список экспертиз
              </Link>
              <Link to="/user-account" className="nav-link-services">
                {`Аккаунт (${username})`}
              </Link>
              <button
                onClick={handleLogout}
                className="nav-link-services logout-button"
              >
                Выйти
              </button>
            </>
          )}

          {/* Навигация для гостей */}
          {!isAuth && (
            <Link to="/login" className="nav-link-services">
              Войти
            </Link>
          )}
          </Nav>
        </NavbarComp.Collapse>
      </Container>
    </NavbarComp>
  );
};

export default Navbar;
