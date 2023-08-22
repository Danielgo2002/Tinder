import {
  Grid,
  GridItem,
  Image,
  Heading,
  useBreakpointValue,
  Center,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import logo from "../assets/idoLogo.jpg";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const isOnComputer = useBreakpointValue({
    base: false,
    md: true,
    sm: false,
    xs: true,
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <Center height="90vh">
        <Flex direction="column" align="center">
          LOADING...
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="pink.200"
            size="xl"
          />
        </Flex>
      </Center>
    );
  }

  return (
    <Grid flexDir="column" justifyContent="center" h="100%">
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
