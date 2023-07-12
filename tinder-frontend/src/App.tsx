import {
  Badge,
  Box,
  Button,
  ChakraProvider,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link, Route, Routes, useRoutes } from "react-router-dom";
import Home from "./componnents/HomePage";
import MePage from "./componnents/MePage";
import NavBar from "./navBar";
import Preferences from "./componnents/Preferences";
import SignIn from "./auth/signIn";
import Signup from "./auth/signup";
import Tinder from "./componnents/TinderPage";
import Chat from "./caht/chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="/tinder" element={<Tinder />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mePage" element={<MePage />} />
      <Route path="/chat" element={<Chat/>}/>
    </Routes>
  );
}

export default App;
