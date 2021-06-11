import React, { useState,  useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth/';

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

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeName = e => {
    setName(e.currentTarget.value);
  };

  const handleChangeEmail = e => {
    setEmail(e.currentTarget.value);
  };

  const handleChangePassword = e => {
    setPassword(e.currentTarget.value);
  };

  // const onRegister = data => dispatch(authOperations.onRegister(data));

  const onRegister = useCallback(
    data => dispatch(authOperations.onRegister(data)),
    [dispatch],
  );
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      const data = { name, email };
      onRegister(data);
      setName('');
      setEmail('');
      setPassword('');
    },
    [onRegister, name, email],
  );

  return (
    <div>
      <h1>Регистрация</h1>

      <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
        <label style={styles.label}>
          Имя
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChangeName}
          />
        </label>

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
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
