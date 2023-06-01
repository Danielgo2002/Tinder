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
import { Link } from "react-router-dom";
import Home from "./HomePage";
import NavBar from "./navBar";

function App() {
  return (
    <ChakraProvider>
      <Home></Home>
    </ChakraProvider>
  );
}

export default App;
