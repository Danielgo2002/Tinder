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
import Home from "./homePgae";

function App() {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}

export default App;
