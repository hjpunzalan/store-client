import { PropsWithChildren } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useAppSelector } from "src/app/store/configureStore";

const RequireAuth = ({ children }: PropsWithChildren) => {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location.pathname },
        }}
      />
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
