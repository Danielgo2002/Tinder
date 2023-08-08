import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetMyUser, MyUser } from "../api/Tinder";
import { withProtectedRoute } from "../hocs/ProtectedRoute";

const MePage = () => {
  const [currentUser, setCurrentUser] = useState(0);

  const {
    data: Myuser,
    isLoading,
  } = useQuery<MyUser>(["Myuser"], GetMyUser);

  const user = Myuser;

  const userPref = Myuser?.preferences;
  console.log(user?.image);

  const cardSize = useBreakpointValue({ base: "1000px", md: "full" });
  const imageSize = useBreakpointValue({ base: "120px", md: "300px" });
  const textsize = useBreakpointValue({ base: "20px", md: "25px" });
  const headingSize = useBreakpointValue({ base: "md", md: "2xl" });
  const space = useBreakpointValue({ base: "5", md: "48" });
  const Buttonspace = useBreakpointValue({ base: "10", md: "96" });
  const Buttonsize = useBreakpointValue({ base: "md", md: "lg" });

  const Navigate = useNavigate();

  return (
      <Center
        bgGradient={
          "linear-gradient(45deg, rgba(251, 218, 97, 0.7) 0%, rgba(255, 90, 205, 0.7) 100%)"
        }
        height='100%'
        width={'100%'}
      >
        <Box
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"dark-lg"}
          rounded={"md"}
        >
          <Box
            // w={"full"}
            objectFit={"cover"}
            flexDirection={"column"}
            justifyContent={"center"}
          />

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
                <br />
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
                  Let's Meet!
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
  );
};

export default withProtectedRoute(MePage);
