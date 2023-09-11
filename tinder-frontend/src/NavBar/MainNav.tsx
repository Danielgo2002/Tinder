
import {
  Flex,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetMyUser, MyUser } from "../api/Tinder";
import NotificationMenue from "../componnents/notificationMenu";
import NavButtons from "./NavButtons";

const MainNav = () => {




  return (
    <Flex gap={3} width="30%" ml="10px" alignItems={'center'} h="100%">
      <NotificationMenue />
      <NavButtons/>
    </Flex>
  );
};

export default MainNav;
