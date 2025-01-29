import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../core/store/store';
import { updateUser } from '../../core/store/slices/userSlice';
import { User } from '../../core/api/API';
import { useAppDispatch, useAppSelector } from '../../core/store/hooks';
import './UserAccountForm.css';

export const UserAccountForm: React.FC = () => {
    const user = useAppSelector((state: RootState) => state.user);

    const [username, setUsername] = useState(user.username || '');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        setUsername(user.username);
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== repeatPassword) {
            setError('Пароли не совпадают');
            return;
        }

        const dataToSend: Partial<User> = {};
        if (email) dataToSend.email = email; 
        if (password) dataToSend.password = password;
        

        try {
            const resultAction = await dispatch(updateUser(dataToSend));

            if (updateUser.fulfilled.match(resultAction)) {
                navigate('/user-account');
            } else {
                setError('Не удалось обновить данные. Попробуйте еще раз.');
            }
        } catch (err) {
            setError('Произошла ошибка при обновлении данных. Попробуйте еще раз.');
            console.error(err);
        }

        setEmail('');
        setPassword('');
        setRepeatPassword('');
    };

    return (
        <div className="account-form-container">
            <h1 className="account-form-title">Изменение данных аккаунта</h1>
            <h2 className="account-username">Здравствуйте, {username}!</h2>
            <Form onSubmit={handleSubmit} className="account-form">
                <div className="current-email-container">
                    <label className="current-email-label">Текущий email:</label>
                    <p className="current-email">{user.email}</p>
                </div>
                <Form.Floating>
                    <Form.Control
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="email">Новый email</label>
                </Form.Floating>
    
                <Form.Floating>
                    <Form.Control
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Пароль</label>
                </Form.Floating>
    
                <Form.Floating>
                    <Form.Control
                        id="repeatPassword"
                        type="password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    <label htmlFor="repeatPassword">Повторите пароль</label>
                </Form.Floating>
    
                {error && <div className="alert-danger">{error}</div>}
    
                <button type="submit" className="account-form-button">
                    Сохранить
                </button>
            </Form>
        </div>
    );
};