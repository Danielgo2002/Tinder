import {
  Grid,
  GridItem,
  Image,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import logo from "../assets/idoLogo.jpg";
import Nav from "../NavBar/Nav";

const Home = () => {
  const isOnComputer = useBreakpointValue({
    base: false,
    md: true,
    sm: false,
    xs: true,
  });
  console.log(isOnComputer);

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
