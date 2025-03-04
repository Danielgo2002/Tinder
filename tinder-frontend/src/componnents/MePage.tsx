import { CheckIcon } from "@chakra-ui/icons";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  useBreakpointValue,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetMyUser, MyUser, MyUsers } from "../api/Tinder";
import { withProtectedRoute } from "../hocs/ProtectedRoute";
import FullNav from "../NavBar/fullNav";
import { Blur } from "../auth/signIn";

const MePage = () => {
  const [currentUser, setCurrentUser] = useState(0);

  const {
    data: Myuser,
    isLoading,
    isError,
    refetch,
  } = useQuery<MyUser>(["Myuser"], GetMyUser);

  const user = Myuser;

  const userPref = Myuser?.preferences;
  console.log(user?.image);

  //   const specificUser = useMemo(
  //     () => Myuser?.data && Myuser.data[currentUser],
  //     [currentUser, Myuser]
  //   );
  //   console.log(specificUser);

  //   const specificUser = Myuser?.data;

  const cardSize = useBreakpointValue({ base: "1000px", md: "full" });
  const imageSize = useBreakpointValue({ base: "150", md: "300px" });
  const textsize = useBreakpointValue({ base: "15px", md: "25px" });
  const headingSize = useBreakpointValue({ base: "md", md: "2xl" });
  const space = useBreakpointValue({ base: "5", md: "48" });
  const Buttonspace = useBreakpointValue({ base: "20", md: "96" });
  const Buttonsize = useBreakpointValue({ base: "sm", md: "lg" });

  const Navigate = useNavigate();
  console.log(user?.image);

  return (
    <>
      <Center
        bgGradient={
          "linear-gradient(45deg, rgba(251, 218, 97, 0.7) 0%, rgba(255, 90, 205, 0.7) 100%)"
        }
      >
        <FullNav></FullNav>
        <Box
          // maxW={"1000px"}

          h={"100vh"}
          w={"1000px"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"dark-lg"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Box
            h={"200px"}
            w={"full"}
            objectFit={"cover"}
            flexDirection={"column"}
            justifyContent={"center"}
          />

          {/* <Text
          fontSize={textsize}
          fontWeight={"bold"}
          fontFamily={"body"}
          color={"blackAlpha.700"}
        >
          wellcome {user?.first_Name}
        </Text> */}
          <Flex bg={"t"} justify={"center"} mt={"-20"}>
            <Avatar
              boxSize={imageSize}
              boxShadow={"dark-lg"}
              src={
                user?.image.includes("https")
                  ? user.image
                  : `http://localhost:3000/static/${user?.image}`
              }
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>

          <Box p={8}>
            <Stack direction={"row"} justify={"center"} spacing={space}>
              <Stack spacing={0} align={"center"}>
                <Heading size={headingSize} color={"blackAlpha.700"}>
                  About You:
                </Heading>
                <br />
                <Text fontSize={textsize} color={"gray.500"}>
                  {" "}
                  Age : {user?.age}
                </Text>
                <br />
                <Text fontSize={textsize} color={"gray.500"}>
                  Location : {user?.location}
                </Text>
                <br />
                <Text fontSize={textsize} color={"gray.500"}>
                  gender : {user?.gender}
                </Text>
              </Stack>

              <Stack spacing={0} align={"center"}>
                <Heading color={"blackAlpha.700"} size={headingSize}>
                  Your Prefrences:
                </Heading>
                <br />
                <Text fontSize={textsize} color={"gray.500"}>
                  {" "}
                  MinAge : {userPref?.MinAge}
                </Text>
                <br/>
                <Text fontSize={textsize} color={"gray.500"}>
                  {" "}
                  MaxAge : {userPref?.MaxAge}
                </Text>
                <br />
                <Text fontSize={textsize} color={"gray.500"}>
                  Location : {userPref?.location}
                </Text>
                <br />
                <Text fontSize={textsize} color={"gray.500"}>
                  gender : {userPref?.gender}
                </Text>
                <br />
                <br />
                <br />
                <br />
              </Stack>
            </Stack>

            <Stack direction={"row"} justify={"center"} spacing={space}>
              <Stack spacing={Buttonspace} direction="row" align="center">
                <Button
                  bgGradient="linear(to-r, red.400,pink.400)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,pink.400)",
                    boxShadow: "xl",
                  }}
                  size={Buttonsize}
                  variant={"outline"}
                  onClick={() => {
                    window.location.href = "/Tinder";
                  }}
                >
                  Lett's Meet !!
                </Button>
                <Button
                  bgGradient="linear(to-r, red.400,pink.400)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,pink.400)",
                    boxShadow: "xl",
                  }}
                  size={Buttonsize}
                  variant={"outline"}
                  onClick={() => {
                    window.location.href = "/Preferences";
                  }}
                >
                  Change prefrences
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default withProtectedRoute(MePage);
