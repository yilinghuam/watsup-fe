import React, { useContext, createContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { useCookies } from "react-cookie";

interface PrivateRouteProps {
  children: JSX.Element; // passed as prop
  path: string;
}
export const PrivateRoute = (props: PrivateRouteProps) => {
  const history = useHistory();
  const { children, ...rest } = props;

  const [cookies] = useCookies(["UserAuth"]);
  console.log(`private=${cookies.UserAuth}`);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        cookies.UserAuth ? (
          props.children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
