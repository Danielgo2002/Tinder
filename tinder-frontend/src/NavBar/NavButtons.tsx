import { Button } from "@chakra-ui/react";
import react from "react";
import { useNavigate } from "react-router-dom";

const NavButtons = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };
  return (
    <>
      <Button
        onClick={() => {
          window.location.replace("/Tinder");
        }}
        variant="outline"
        aria-label="Contact"
        color={"pink.600"}
        colorScheme={"pink"}
        w="100%"
      >
        Let's Meet!
      </Button>
      <Button
        onClick={() => {
          window.location.replace("/MePage");
        }}
        variant="outline"
        color={"pink.500"}
        colorScheme={"pink"}
        aria-label="Contact"

        w="100%"
      >
        My Page
      </Button>
      <Button
        onClick={() => {
          window.location.replace("/chat");
        }}
        variant="outline"
        color={"pink.500"}
        colorScheme={"pink"}
        aria-label="Contact"

        w="100%"
      >
        My Chats
      </Button>
      <Button
        onClick={logout}
        variant="outline"
        color={"pink.500"}
        colorScheme={"pink"}
        aria-label="Contact"

        w="100%"
      >
        Log Out
      </Button>
    </>
  );
};

export default NavButtons;
