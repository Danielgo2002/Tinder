import { CheckIcon, CloseIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  ChakraProvider,
  extendTheme,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GetUsers, User, Users } from "./api/Tinder";

const Tinder = () => {
  const [currentUser, setCurrentUser] = useState(0);

  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery<Users>(["users"], GetUsers);
  console.log(users);

  const specificUser = useMemo(
    () => users?.data && users.data[currentUser],
    [currentUser, users]
  );

  if (isLoading) {
    return (
      <>
        <Text> Loading</Text>
      </>
    );
  }

  return (
    <Box
      bg={"red"}
      h="100vh"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Link to={"/preferences"}>
        <Button>add prefrences</Button>
      </Link>
      <Grid h={"100vh"} display={"flex"}>
        <GridItem mt="auto" p={"10%"} w={"25%"} bg={"blue"}>
        <IconButton
          boxSize={'100px'}
            colorScheme="green"
            aria-label="ex"
            size={'lg'}
            fontSize='60px'
            onClick={() => setCurrentUser(currentUser + 1)}
            icon={<CheckIcon />}
          />
        </GridItem>

        <GridItem
          justifySelf={"center"}
          bg={"white"}
          w={"50%"}
          textAlign={"left"}
          p={20}
        >
          <Image
            borderRadius="150"
            boxSize="300px"
            src="https://www.looper.com/img/gallery/zekes-beast-titan-powers-from-attack-on-titan-explained/l-intro-1620834206.jpg"
            alt="Ido"
          />
          <Box w="500px" h="70px" bg="green.300">
            <Text>First Name: {specificUser?.first_Name}</Text>
            <br />
            <Text>Last Name: {specificUser?.last_Name}</Text>
          </Box>
          <br />
          <Box w="500px" h="70px" bg="green.300">
            <Text>Age:{specificUser?.age}</Text>
          </Box>
          <Box w="500px" h="70px" bg="green.300">
            <Text>Location:{specificUser?.location}</Text>
          </Box>
          <Box w="500px" h="70px" bg="green.300">
            <Text>Summery: {specificUser?.summery}</Text>
          </Box>
        </GridItem>
        <GridItem w={"25%"} bg={"peru"} p={"10%"} mt="auto">
          <IconButton
          boxSize={'100px'}
            colorScheme="red"
            aria-label="ex"
            size={'lg'}
            fontSize='60px'
            onClick={() => setCurrentUser(currentUser + 1)}
            icon={<CloseIcon />}
          />
        
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Tinder;
