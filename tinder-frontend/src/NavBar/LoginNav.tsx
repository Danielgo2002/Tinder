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
        כניסה
      </Button>
      <Button
        onClick={() => {
          window.location.replace("/signup");
        }}
        variant="ghost"
        aria-label="signup"
      >
        הרשמה 
      </Button>

    </Flex>
    
  );
};

export default LoginNav;
