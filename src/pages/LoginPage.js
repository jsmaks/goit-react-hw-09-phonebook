import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';

const styles = {
  form: {
    width: 320,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
  },
};

export default function LoginPage() {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = useCallback(e => {
    const {
      currentTarget: { name, value },
    } = e;
    setLoginData(prev => ({ ...prev, [name]: value }));
  }, []);

  const onLogin = useCallback(
    data => dispatch(authOperations.login(data)),
    [dispatch],
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      onLogin(loginData);
      setLoginData({ email: '', password: '' });
    },
    [onLogin, loginData],
  );

  return (
    <div>
      <h1>Логин</h1>

      <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
        <label style={styles.label}>
          Почта
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
        </label>

        <label style={styles.label}>
          Пароль
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </label>

        <button className="btn" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
