import React, { FC, useState } from "react";
import { Form } from "react-bootstrap";
import { useAppDispatch } from "../../core/store/hooks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginUser } from "../../core/store/slices/userSlice";
import "./LoginForm.css";

export const LoginForm: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const loginData = { username, password };

    try {
      const resultAction = await dispatch(loginUser(loginData));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/paintings"); // Перенаправление на страницу после успешного входа
      } else {
        setError(resultAction.payload as string);
      }
    } catch (err) {
      setError("Ошибка входа. Попробуйте снова.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Вход в систему</h1>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Floating>
          <Form.Control
            id="login"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Введите логин"
          />
          <label htmlFor="login">Логин</label>
        </Form.Floating>

        <Form.Floating>
          <Form.Control
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Введите пароль"
          />
          <label htmlFor="password">Пароль</label>
        </Form.Floating>

        {error && <div className="alert-danger">{error}</div>}

        <button type="submit" className="login-button">
          Войти
        </button>
      </Form>
      <p className="login-footer">
        Нет аккаунта?{" "}
        <Link to="/register" className="login-link">
          Создайте!
        </Link>
      </p>
    </div>
  );
};