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
import { GetMyUser, MyUser } from "../api/Tinder";
import { withProtectedRoute } from "../hocs/ProtectedRoute";

const MePage = () => {
  const { data: Myuser } = useQuery<MyUser>(["Myuser"], GetMyUser);

  const user = Myuser;

  const userPref = Myuser?.preferences;
  console.log(user?.image);

  const imageSize = useBreakpointValue({ base: "120px", md: "300px" });
  const textsize = useBreakpointValue({ base: "17px", md: "25px" });
  const headingSize = useBreakpointValue({ base: "md", md: "2xl" });
  const space = useBreakpointValue({ base: "5", md: "48" });
  const Buttonspace = useBreakpointValue({ base: "10", md: "80" });
  const Buttonsize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <Center
      bgGradient={
        "linear-gradient(45deg, rgba(251, 218, 97, 0.7) 0%, rgba(255, 90, 205, 0.7) 100%)"
      }
      height="100%"
      width={"100%"}
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"dark-lg"}
        rounded={"md"}
      >
        <Box
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

        <Box p={8} dir="rtl">
          <Stack direction={"row"} justify={"center"} spacing={space}>
            <Stack spacing={0} align={"center"}>
              <Heading size={headingSize} color={"blackAlpha.700"}>
                הפרופיל שלי :
              </Heading>
              <br />
              <Text fontSize={textsize} color={"gray.500"}>
                {" "}
                גיל : {user?.age}
              </Text>
              <br />
              <Text fontSize={textsize} color={"gray.500"}>
                איזור מגורים : {user?.location}
              </Text>
              <br />
              <Text fontSize={textsize} color={"gray.500"}>
                מין : {user?.gender}
              </Text>
            </Stack>

            <Stack spacing={0} align={"center"}>
              <Heading color={"blackAlpha.700"} size={headingSize}>
                העדפות שלי :
              </Heading>
              <br />
              <Text fontSize={textsize} color={"gray.500"}>
                {" "}
                טווח גילאים : {userPref?.MinAge} - {userPref?.MaxAge}
              </Text>
              <br />

              <Text fontSize={textsize} color={"gray.500"}>
                איזור מגורים : {userPref?.location}
              </Text>
              <br />
              <Text fontSize={textsize} color={"gray.500"}>
                מין : {userPref?.gender}
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
                  window.location.href = "/editUser";
                }}
              >
                עריכת פרופיל                 </Button>
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
                שנה/י העדפות
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
};

export default withProtectedRoute(MePage);
