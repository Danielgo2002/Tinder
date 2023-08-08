import { Route, Routes, useRoutes } from "react-router-dom";
import Home from "./componnents/HomePage";
import MePage from "./componnents/MePage";
import Preferences from "./componnents/Preferences";
import SignIn from "./auth/signIn";
import Signup from "./auth/signup";
import Tinder from "./componnents/TinderPage";
import HomePageChat from "./chat/HomePageChat";
import { Box, Flex } from "@chakra-ui/react";
import Nav from "./NavBar/Nav";

function App() {
  return (
    <Flex flexDir={"column"} height="100vh" overflow={'hidden'}>
      <Nav></Nav>
      <Box h="92vh">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/tinder" element={<Tinder />} />
          <Route path="/mePage" element={<MePage />} />
          <Route path="/chat" element={<HomePageChat />} />
        </Routes>
      </Box>
    </Flex>
  );
}

export default App;
