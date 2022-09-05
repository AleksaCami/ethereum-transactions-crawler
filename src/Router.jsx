import React from "react";
import { HashRouter as Router, Route, Switch as RouterSwitch } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import routes from "./config/router.config";

const AppRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <Component {...props} />
        )
      }}
    />
  )
}

const AppRouter = () => {
  return (
    <Box marginLeft={12} marginRight={12}>
      <Router>
        <RouterSwitch>
          {routes.map(({ exact, path, component }) => (
            <AppRoute
              exact={exact}
              path={path}
              component={component}
              key={path}
            />
          ))}
        </RouterSwitch>
      </Router>
    </Box>
  );
};

export default AppRouter;
