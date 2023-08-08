import {
  BellIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
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
import NotificationMenue from "../componnents/notificationMenu";
import NavButtons from "./NavButtons";

const MainNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [display, changeDisplay] = useState("none");
  const logoSize = useBreakpointValue({ base: "55px", md: "75px" });

  const {
    data: Myuser,
    isLoading,
    isError,
    refetch,
  } = useQuery<MyUser>(["Myuser"], GetMyUser);

  
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex gap={3} width="30%" ml="10px" alignItems={'center'} h="100%">
      <NotificationMenue />
      <NavButtons/>
    </Flex>
  );
};

export default MainNav;
