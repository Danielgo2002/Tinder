import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import NotificationMenue from "../componnents/notificationMenu";
import LoginNav from "./LoginNav";
import MainNav from "./MainNav";
import NavButtons from "./NavButtons";

const loginRoutes = ["/", "/signin", "/signup"];

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [display, changeDisplay] = useState("none");
  const location = useLocation();
  const route = location.pathname;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(isMobile);

  return (
    <Flex
      height={"8vh"}
      color={useColorModeValue("gray.600", "white")}
      alignItems={"center"}
    >
      <Box flexGrow={1} h="100%">
        {loginRoutes.includes(route) ? (
          <LoginNav />
        ) : isMobile ? (
          <Flex justifyContent={"space-between"} h="100%" alignItems={"center"}>
            <NotificationMenue />
            <Image
              onClick={() => window.location.replace("/")}
              borderRadius={"25px"}
              height="100%"
              aspectRatio={1}
              src="https://www.logo.wine/a/logo/Tinder_(app)/Tinder_(app)-Flame-Logo.wine.svg"
              alt="tinder"
              margin={"auto"}
            />
            <IconButton
              aria-label="drawer"
              icon={<HamburgerIcon />}
              bg="transparent"
              onClick={onOpen}
            />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                  <VStack mt="20">
                    <NavButtons />
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        ) : (
          <MainNav />
        )}
      </Box>
      <Image
        onClick={() => window.location.replace("/")}
        borderRadius={"25px"}
        height="100%"
        aspectRatio={1}
        src="https://www.logo.wine/a/logo/Tinder_(app)/Tinder_(app)-Flame-Logo.wine.svg"
        alt="tinder"
        display={isMobile ? "none" : "block"}
      />
    </Flex>
  );
};

export default Nav;
