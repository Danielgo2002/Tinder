import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetMyUser, MyUser } from "../api/Tinder";
import { Center, Flex, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { data: Myuser, isLoading } = useQuery<MyUser>(["Myuser"], GetMyUser);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Center height="90vh">
        <Flex direction="column" align="center">
          LOADING...
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="pink.200"
            size="xl"
          />
        </Flex>
      </Center>
    );
  }

  return <>{Myuser ? <>{children}</> : <>{navigate("/signin")}</>}</>;
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
