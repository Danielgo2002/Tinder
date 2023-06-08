import {
  Button,
  Grid,
  GridItem,
  Image,
  Text,
  Heading,
  Flex,
  Center,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "./assets/idoLogo.jpg";

const Home = () => {
  const isOnComputer = useBreakpointValue({
    base: false,
    md: true,
    sm: false,
    xs: true,
  });
  console.log(isOnComputer);

  return (
    <Grid
      flexDir="column"
      justifyContent="center"
      height="calc(var(--chakra-vh) - 92px)"
    >
      <br />
      <br />
      <br />
      <GridItem>
        <Heading dir="rtl" fontSize={isOnComputer ? "8xl" : "4xl"} as="h1">
          תמצא. תכיר. תמשגל.
        </Heading>
      </GridItem>
      <GridItem>
        <Image src={logo} borderRadius={50}></Image>
      </GridItem>
    </Grid>
  );
};

export default Home;
