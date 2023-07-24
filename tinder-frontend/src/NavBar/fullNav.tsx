import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { GetMyUser, MyUser } from "../api/Tinder";

const FullNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [display, changeDisplay] = useState("none");
  const logoSize = useBreakpointValue({ base: "55px", md: "75px" });

  const {
    data: Myuser,
    isLoading,
    isError,
    refetch,
  } = useQuery<MyUser>(["Myuser"], GetMyUser);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/home");
  };

  return (
    <Flex
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.600", "white")}
      py={{ base: 8 }}
      px={{ base: 4 }}
      borderBottom={3}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
      align={"center"}
      position="fixed"
      top={0} // Position the navbar at the top of the page
      left={0} // Position the navbar at the left side of the page
      right={0} // Position the navbar at the right side of the page
      zIndex={999} // Ensure the navbar is on top of other elements
    >
      <br />

      <Flex pos="fixed" top="1rem" right="1rem  " align={"center"}>
        {/* //////////////////// */}
        <Flex pos="fixed" top="1rem" left="1rem  " align={"left"}>
          <Text textAlign={{ base: "left", md: "left" }} fontFamily={"heading"}>
            <Image
              onClick={() => logout()}
              borderRadius={"25px"}
              boxSize={logoSize}
              src="https://www.logo.wine/a/logo/Tinder_(app)/Tinder_(app)-Flame-Logo.wine.svg"
              alt="tinder"
            />
          </Text>
        </Flex>
        {/* ////////////////////////// */}
        <Flex display={["none", "none", "flex", "flex"]} gap={3}>
          <Button
            onClick={() => {
              window.location.replace("/Tinder");
            }}
            as={"a"}
            variant="outline"
            aria-label="Contact"
            color={"pink.600"}
            colorScheme={"pink"}
            my={5}
            w="100%"
          >
            Lett's Meet!
          </Button>
          <Button
            onClick={() => {
              window.location.replace("/MePage");
            }}
            as={"a"}
            variant="outline"
            color={"pink.500"}
            colorScheme={"pink"}
            aria-label="Contact"
            my={5}
            w="100%"
          >
            My Page
          </Button>
          <Button
            onClick={() => {
              window.location.replace("/chat");
            }}
            as={"a"}
            variant="outline"
            color={"pink.500"}
            colorScheme={"pink"}
            aria-label="Contact"
            my={5}
            w="100%"
          >
            My Chats
          </Button>
          <Button
            onClick={() => {
              logout();
            }}
            as={"a"}
            variant="outline"
            color={"pink.500"}
            colorScheme={"pink"}
            aria-label="Contact"
            my={5}
            w="100%"
          >
            Log Out
          </Button>
        </Flex>
        <IconButton
          aria-label="Open Menu"
          size="md"
          mr={2}
          icon={<HamburgerIcon />}
          display={["flex", "flex", "none", "none"]}
          onClick={() => changeDisplay("flex")}
        />

        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
      <Flex
        w="100vw"
        bgColor="gray.50"
        zIndex={20}
        h="100%"
        width={"100%"}
        pos="fixed"
        top="0"
        left="0"
        overflow="auto"
        flexDir="column"
        display={display}
      >
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Close Menu"
            size="lg"
            icon={<CloseIcon />}
            color={"black"}
            onClick={() => changeDisplay("none")}
          />
        </Flex>
        <Flex flexDir="column" align="center">
          <Button
            onClick={() => {
              window.location.replace("/MePage");
            }}
            as={"a"}
            variant="ghost"
            color={"pink.500"}
            colorScheme={"pink"}
            aria-label="Contact"
            my={5}
            w="100%"
          >
            My Page
          </Button>
          <Button
            onClick={() => {
              window.location.replace("/Tinder");
            }}
            as={"a"}
            variant="ghost"
            color={"pink.500"}
            colorScheme={"pink"}
            aria-label="Contact"
            my={5}
            w="100%"
          >
            Let's Meet!
          </Button>
          <Button
            onClick={() => {
              window.location.replace("/chat");
            }}
            as={"a"}
            variant="ghost"
            color={"pink.500"}
            colorScheme={"pink"}
            aria-label="Contact"
            my={5}
            w="100%"
          >
            My Chats
          </Button>
          <Button
            onClick={() => {
              logout();
            }}
            as={"a"}
            variant="ghost"
            color={"pink.500"}
            colorScheme={"pink"}
            aria-label="Contact"
            my={5}
            w="100%"
          >
            Log Out
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FullNav;
