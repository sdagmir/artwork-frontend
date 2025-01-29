import { FC, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../core/store/hooks";
import { registerUser } from "../../core/store/slices/userSlice";
import "./RegisterForm.css";

export const RegisterForm: FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Проверка совпадения паролей
    if (password !== repeatPassword) {
      setError("Пароли не совпадают.");
      return;
    }

    try {
      // Отправка данных пользователя
      await dispatch(registerUser({ username, email, password })).unwrap();
      navigate("/login"); // Перенаправление на страницу входа
    } catch (err) {
      setError("Ошибка регистрации. Попробуйте снова.");
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Регистрация</h1>
      <Form onSubmit={handleSubmit} className="register-form">
        <Form.Floating>
          <Form.Control
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="username">Имя</label>
        </Form.Floating>

        <Form.Floating>
          <Form.Control
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
        </Form.Floating>

        <Form.Floating>
          <Form.Control
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">Пароль</label>
        </Form.Floating>

        <Form.Floating>
          <Form.Control
            id="repeatPassword"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
          <label htmlFor="repeatPassword">Повторите пароль</label>
        </Form.Floating>

        {error && <div className="alert-danger">{error}</div>}

        <button type="submit" className="register-button">
          Зарегистрироваться
        </button>
      </Form>
    </div>
  );
};