import { Button } from "@chakra-ui/react";
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
        בוא נכיר
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
        דף הבית
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
        הצ׳אטים שלי
      </Button>
      <Button
        onClick={logout}
        variant="outline"
        color={"pink.500"}
        colorScheme={"pink"}
        aria-label="Contact"

        w="100%"
      >
        התנתק
      </Button>
    </>
  );
};

export default NavButtons;
