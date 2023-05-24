import { Button, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
      gridTemplateRows={"200px 2fr 100px"}
      gridTemplateColumns={"660px 1fr"}
      h="880px"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" bg="orange.300" area={"header"}>
        <Text textAlign={"right"}>
          {" "}
          <Link to={"/signup"}>
            <Button>signup</Button>
          </Link>
          <Link to={"/signin"}>
            <Button>singnin</Button>
          </Link>
        </Text>
        <Image
          boxSize={"100px"}
          borderRadius={"50"}
          src="https://logowik.com/content/uploads/images/tinder4318.jpg"
          alt="tinder"
        />

        <Text fontSize={"6xl"} fontWeight={"bold"} textAlign={"center"} h={"5"}>
          Welcome to Tinder
        </Text>
      </GridItem>
      <GridItem pl="2" bg="pink.300" area={"nav"}>
        Nav
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        Main
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default Home;
