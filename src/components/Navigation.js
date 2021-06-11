import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../redux/auth';

const styles = {
  link: {
    display: 'inline-block',
    textDecoration: 'none',
    padding: 12,
    fontWeight: 700,
    color: '#2A363B',
  },
  activeLink: {
    color: '#ff9800',
  },
};

export default function Navigation() {
  const isAuthenticated = useSelector(authSelectors.getAuthenticated);
  return (
    <nav>
      <NavLink exact to="/" style={styles.link} activeStyle={styles.activeLink}>
        Главная
      </NavLink>
      {isAuthenticated && (
        <NavLink
          to="/contacts"
          style={styles.link}
          activeStyle={styles.activeLink}
        >
          Контакты
        </NavLink>
      )}
    </nav>
  );
}
