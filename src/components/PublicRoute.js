import React from "react";
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {authSelectors} from '../redux/auth';


/**
 * - Если маршрут ограниченный, и пользователь залогинен, рендерит редирект на /contacts
 * - В противном случае рендерит компонент
 */
const PublicRoute = ({
  component: Component,
  isAuthenticated,
  redirectTo,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={props =>
      isAuthenticated && routeProps.restricted ? (
        <Redirect to={redirectTo} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => ({
    isAuthenticated: authSelectors.getAuthenticated(state),
})

export default connect(mapStateToProps)(PublicRoute);

// export default function PublicRoute({
//     isAuthenticated,
//     redirectTo,
//     children,
//     ...routeProps
// }) {
//     const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);

//     return (
//         <Route {...routeProps}>
//             {isLoggedIn && routeProps.restricted ? (
//                 <Redirect to={redirectTo} />
//             ) : (
//                 children
//             )}
//         </Route>
//     );
// }