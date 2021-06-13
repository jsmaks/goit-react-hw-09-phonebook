import React, { useState, useCallback } from 'react';
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
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = useCallback(e => {
    const {
      currentTarget: { name, value },
    } = e;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  }, []);

  const onRegister = useCallback(
    data => dispatch(authOperations.register(data)),
    [dispatch],
  );
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      onRegister(registerData);
    },
    [onRegister, registerData],
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
            value={registerData.name}
            onChange={handleChange}
          />
        </label>

        <label style={styles.label}>
          Почта
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
          />
        </label>

        <label style={styles.label}>
          Пароль
          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleChange}
          />
        </label>

        <button className="btn" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
