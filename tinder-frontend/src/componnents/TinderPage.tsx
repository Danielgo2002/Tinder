import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Center,
  Heading,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import {
  DislikeUser,
  GetFilterUsers,
  GetUsers,
  LikeUser,
  Users,
} from "../api/Tinder";
import { withProtectedRoute } from "../hocs/ProtectedRoute";
import FullNav from "../NavBar/fullNav";
import { Blur } from "../auth/signIn";

const Tinder = () => {
  const [currentUser, setCurrentUser] = useState(0);
  const [finishedIterating, setFinishedIterating] = useState(false);

  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery<Users>(["users"], GetFilterUsers);

  console.log(users?.data);

  const specificUser = useMemo(
    () => users?.data && users.data[currentUser],
    [currentUser, users]
  );

  useEffect(() => {
    if (users?.data && currentUser >= users.data.length) {
      setFinishedIterating(true);
    } else {
      setFinishedIterating(false);
    }
  }, [users, currentUser]);

  const reciverId = specificUser?._id;
  console.log(reciverId);

  const avatarSize = useBreakpointValue({ base: "150px", md: "300px" });
  const buttonSize = useBreakpointValue({ base: "75px", md: "100px" });
  const buttonSpace = useBreakpointValue({ base: "48", md: "96" });
  // const bgcolor = useBreakpointValue({ base: <Blur />, md: "white" });

  const { mutateAsync: Like } = useMutation(LikeUser, {
    onSuccess: (res) => {
      if (res.data == "error") alert("alredy liked this user");
      console.log("ggfdjbvhjdvkv", res.data);
    },
  });
  const { mutateAsync: Dislike } = useMutation(DislikeUser);

  if (isLoading) {
    return (
      <>
        <Text> Loading</Text>
      </>
    );
  }
  console.log(specificUser);

  return (
    <Center py={20} h={"100vh"}>
      <FullNav></FullNav>
      <Box
        bgGradient={
          "linear-gradient(45deg, rgba(251, 218, 97, 0.7) 0%, rgba(255, 90, 205, 0.7) 100%)"
        }
        position={"relative"}
        w={"100vw"}
        h={"100vh"}
        //  bg={useColorModeValue("white", "gray.900")}
        // bgColor={bgcolor}
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
        <br />
        <br />

        <Avatar
          boxSize={avatarSize}
          borderRadius={"100"}
          src={
            specificUser?.image.includes("https")
              ? specificUser.image
              : `http://localhost:3000/static/${specificUser?.image}`
          }
        />

        <Heading fontSize={"4xl"} fontFamily={"body"}>
          {specificUser?.first_Name} {specificUser?.last_Name}
          {finishedIterating && (
            <Heading>אין יותר משתמשים כרגע... נסה שנית מאוחר יותר</Heading>
          )}
        </Heading>
        <Text fontSize={"2xl"} fontWeight={600} color={"gray.500"} mb={4}>
          Age: {specificUser?.age}
        </Text>

        <Text fontSize={"2xl"} fontWeight={600} color={"gray.500"} mb={4}>
          Gender: {specificUser?.gender}
        </Text>
        <Text fontSize={"2xl"} fontWeight={600} color={"gray.500"} mb={4}>
          Location: {specificUser?.location}
        </Text>
        <Text
          textAlign={"center"}
          fontSize={"2xl"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {specificUser?.summery}
        </Text>

        <Stack
          mt={5}
          justify={"center"}
          direction={"row"}
          spacing={buttonSpace}
        >
          <IconButton
            boxSize={buttonSize}
            colorScheme="red"
            aria-label="ex"
            size={"lg"}
            fontSize="60px"
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            onClick={async () => {
              const date = new Date().valueOf();
              await Dislike({ reciverID: reciverId! });
              setCurrentUser(currentUser + 1);
            }}
            icon={<CloseIcon />}
          />
          <IconButton
            boxSize={buttonSize}
            colorScheme="green"
            aria-label="ex"
            size={"lg"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            fontSize="60px"
            onClick={() => {
              Like({ reciverID: reciverId! });
              setCurrentUser(currentUser + 1);
            }}
            icon={<CheckIcon />}
          />
        </Stack>
        {/* <Blur
          position={"fixed"}
          top={5}
          right={5}
          transform={"scaleX(-1)"}
          style={{ filter: "blur(100px)" }}
        />
        <Blur
          position={"fixed"}
          top={5}
          left={-5}
          style={{ filter: "blur(100px)" }}
        /> */}
      </Box>
    </Center>
  );
};

export default withProtectedRoute(Tinder);

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
