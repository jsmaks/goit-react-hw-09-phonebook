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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = e => {
    setEmail(e.currentTarget.value);
  };

  const handleChangePassword = e => {
    setPassword(e.currentTarget.value);
  };
  const onLogin = useCallback(
    data => dispatch(authOperations.login(data)),
    [dispatch],
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      const data = { email, password };
      console.log(data);
      onLogin(data);
      setEmail('');
      setPassword('');
    },
    [onLogin, email, password],
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
            value={email}
            onChange={handleChangeEmail}
          />
        </label>

        <label style={styles.label}>
          Пароль
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
          />
        </label>

        <button className="btn" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
