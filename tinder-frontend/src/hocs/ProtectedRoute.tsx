import {  FunctionComponent, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetMyUser, MyUser } from "../api/Tinder";
import { Spinner } from "@chakra-ui/react";
import {  useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const {
    data: Myuser,
    isLoading,
  } = useQuery<MyUser>(["Myuser"], GetMyUser);
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner size={'xl'} color="pink.200" />;
  }

  return <>{Myuser ? <>{children}</> :<>{navigate("/signin")}</>}</>;
};

export const withProtectedRoute = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return function (props: T): JSX.Element {
    return (
      <ProtectedRoute>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

