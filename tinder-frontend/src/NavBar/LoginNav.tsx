import { Button, Flex, Image, useBreakpointValue } from "@chakra-ui/react";

const LoginNav = () => {

  return (
    <Flex>
      <Button
        onClick={() => {
          window.location.replace("/signin");
        }}
        variant="ghost"
        aria-label="signin"
      >
        Sign In
      </Button>
      <Button
        onClick={() => {
          window.location.replace("/signup");
        }}
        variant="ghost"
        aria-label="signup"
      >
        Sign Up
      </Button>

    </Flex>
    
  );
};

export default LoginNav;
