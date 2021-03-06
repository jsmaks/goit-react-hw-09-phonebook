import { Suspense,  useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { authOperations } from './redux/auth';

// import { connect } from 'react-redux';
import AppBar from './components/AppBar';

import Phonebook from './pages/Phonebook';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import Container from './components/Container/Container';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

// const HomePage = lazy(() =>
//   import('./pages/HomePage' /* webpackChunkName: "home-page" */),
// );
// const RegisterPage = lazy(() =>
//   import('./pages/RegisterPage' /* webpackChunkName: "register-page" */),
// );
// const LoginPage = lazy(() =>
//   import('./pages/LoginPage' /* webpackChunkName: "login-page" */),
// );
// const Phonebook = lazy(() =>
//   import('./pages/Phonebook' /* webpackChunkName: "phonebook-page" */),
// );

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch])
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<p>Загруз</p>}>
        <Switch>
          <Route exact path="/" component={HomePage} />

          <PrivateRoute restricted path="/contacts" redirectTo="/login">
            <Phonebook />
          </PrivateRoute>

          <PublicRoute
            path="/register"
            restricted
            component={RegisterPage}
            redirectTo="/contacts"
          />

          <PublicRoute
            path="/login"
            restricted
            component={LoginPage}
            redirectTo="/contacts"
          />
        </Switch>
      </Suspense>
    </Container>
  );
}
