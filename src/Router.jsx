import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import routes from "./config/router.config";

const AppRoute = ({ component: Component }) => {
  return (
    <Route
      render={props => {
        return (
          <>
            <Component {...props} />
          </>
        )
      }}
    />
  )
}

const App = () => {
  return (
    <Router>
      <Switch>
        {routes.map(({ exact, path, component, fullLayout }) => (
          <AppRoute
            exact={exact}
            path={path}
            component={component}
            key={path}
            fullLayout={fullLayout}
          />
        ))}
      </Switch>
    </Router>
  );
};

export default App;
