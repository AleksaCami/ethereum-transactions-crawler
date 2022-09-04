import { Box } from "@chakra-ui/react";
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
    <Box marginLeft={12} marginRight={12}>
      <Router>
        <Switch>
          {routes.map(({ exact, path, component }, idx) => (
            <AppRoute
              exact={exact}
              path={path}
              component={component}
              key={idx}
            />
          ))}
        </Switch>
      </Router>
    </Box>
  );
};

export default App;
