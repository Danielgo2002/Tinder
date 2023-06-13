import { CheckIcon, CloseIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Avatar,
  Badge,
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
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  theme,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import client from "./api/interseptors";
import { GetImages, GetUsers, Images, Users } from "./api/Tinder";
import logo from "./assets/idoLogo.jpg";

const Tinder = () => {
  const [currentUser, setCurrentUser] = useState(0);
  const [currentImage, setCurrentImage] = useState<number>(0);

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
  const avatarSize = useBreakpointValue({ base: "150px", md: "250px" });


  if (isLoading) {
    return (
      <>
        <Text> Loading</Text>
      </>
    );
  }

  return (
    <Center py={20} h={"100vh"}>
      <br/>
      <br/>
      <Box
        w={"100vw"}
        h={"110vh"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
        justifyContent={"center"}
      >
        <br />
        <br />
        <br />
        <br />
        
        <Avatar
          boxSize={"250px"}
          borderRadius={"100"}
          src={`http://localhost:3000/static/${specificUser?.image}`}
        />
        <Heading fontSize={"4xl"} fontFamily={"body"}>
          {specificUser?.first_Name} {specificUser?.last_Name}
        </Heading>
        <Text fontSize={'2xl'} fontWeight={600} color={"gray.500"} mb={4}>
          Age: {specificUser?.age}
        </Text>

        <Text fontSize={'2xl'} fontWeight={600} color={"gray.500"} mb={4}>
          Gender: {specificUser?.gender}
        </Text>
        <Text fontSize={'2xl'} fontWeight={600} color={"gray.500"} mb={4}>
          Location: {specificUser?.location}
        </Text>
        <Text
          textAlign={"center"}
          fontSize={'2xl'}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {specificUser?.summery}
        </Text>

        <Stack mt={8}  justify={'center'} direction={"row"} spacing={"auto"}>
          <IconButton
            boxSize={"100px"}
            colorScheme="red"
            aria-label="ex"
            size={"lg"}
            fontSize="60px"
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            onClick={() => setCurrentUser(currentUser + 1)}
            icon={<CloseIcon />}
          />
           <IconButton
      boxSize={"100px"}
      colorScheme="green"
      aria-label="ex"
      size={"lg"}
      boxShadow={
        "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
      }
      fontSize="60px"
      onClick={() => setCurrentUser(currentUser + 1)}
      icon={<CheckIcon />}
    />
        </Stack>
      </Box>
    </Center>
  );
};

export default Tinder;

// <Grid h={"100vh"} display={"flex"}>
//   <GridItem mt="auto" p={"10%"} w={"25vw"} bg={"blue"}>
//     <IconButton
//       boxSize={"100px"}
//       colorScheme="green"
//       aria-label="ex"
//       size={"lg"}
//       fontSize="60px"
//       onClick={() => setCurrentUser(currentUser + 1)}
//       icon={<CheckIcon />}
//     />
//   </GridItem>

//   <GridItem
//     justifySelf={"center"}
//     bg={"red"}
//     w={"50vw"}
//     textAlign={"left"}
//     p={20}
//   >
//     <Image
//       borderRadius="150"
//       boxSize="300px"
//       src={`http://localhost:3000/static/${specificUser?.image}`}
//       alt="Ido"
//     />
//     <Box w="500px" h="70px" bg="green.300">
//       <Text>First Name: {specificUser?.first_Name}</Text>
//       <br />
//       <Text>Last Name: {specificUser?.last_Name}</Text>
//     </Box>
//     <br />
//     <Box w="500px" h="70px" bg="green.300">
//       <Text>Age:{specificUser?.age}</Text>
//     </Box>
//     <Box w="500px" h="70px" bg="green.300">
//       <Text>Location:{specificUser?.location}</Text>
//     </Box>
//     <Box w="500px" h="70px" bg="green.300">
//       <Text>Summery: {specificUser?.summery}</Text>
//     </Box>
//   </GridItem>
//   <GridItem w={"25vw"} bg={"peru"} p={"10%"} mt="auto">
//    <IconButton
//       boxSize={"100px"}
//       colorScheme="red"
//       aria-label="ex"
//       size={"lg"}
//       fontSize="60px"
//       onClick={() => setCurrentUser(currentUser + 1)}
//       icon={<CloseIcon />}
//     />
//   </GridItem>
// </Grid>
