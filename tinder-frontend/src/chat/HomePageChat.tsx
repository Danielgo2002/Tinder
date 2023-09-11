import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetChatUsers } from "../api/chatApi";
import { ResponseUsers, User, Users } from "../api/Tinder";
import { useState } from "react";
import {
  Avatar,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  List,
  ListItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { withProtectedRoute } from "../hocs/ProtectedRoute";
import Conversation from "./Conversation";

const HomePageChat = () => {
  const [showConversation, setShowConversation] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const { data: users, isLoading } = useQuery<ResponseUsers>(
    ["chatUsers"],
    GetChatUsers,
    {
      onSuccess: (data) => {
        setCurrentUser(data.data[0].user);
      },
    }
  );


  const queryClient = useQueryClient();

  const handleBackClick = () => {
    setShowConversation(false);
  };

  if (isLoading || currentUser == undefined) {
    return (
      <Center height="90vh">
        <Flex direction="column" align="center">
          <Text fontSize={"3xl"} fontWeight={""} mb={2}>
            No Chats Avalible 🙂
          </Text>
        </Flex>
      </Center>
    );
  }

  return (
    <Center h="100%">
      <Grid
        overflow="hidden"
        templateAreas={`"header header" "nav main"`}
        flexGrow={1}
        gridTemplateRows={"0px 1fr 0px"}
        gridTemplateColumns={"1fr"}
        h={"100%"}
        gap="0"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        {isMobile ? (
          showConversation ? (
            <GridItem pl="2" bg="blackAlpha.200" area={"main"}>
              <Conversation user={currentUser!} show={handleBackClick} />
            </GridItem>
          ) : (
            <GridItem pl="2" bg="#3d4d5c" area={"nav"} w="100%">
              <List spacing={3} overflowY="auto">
                {users?.data.map((res, index) => (
                  <ListItem
                    key={index}
                    onClick={() => {
                      setCurrentUser(res.user);
                      queryClient.invalidateQueries([
                        "Messages",
                        { userId: res.user._id },
                      ]);
                      setShowConversation(true);
                    }}
                  >
                    <Flex
                      textColor={"white"}
                      alignItems="center"
                      gap={10}
                      p={3}
                    >
                      <Avatar
                        key={index}
                        boxShadow={"dark-lg"}
                        src={
                          res.user?.image.includes("https")
                            ? res.user.image
                            : `http://localhost:3000/static/${res.user?.image}`
                        }
                      />
                      <Text>
                        {res.user.first_Name} {res.user.last_Name}
                      </Text>
                    </Flex>
                    <Divider />
                  </ListItem>
                ))}
              </List>
            </GridItem>
          )
        ) : (
          <>
            <GridItem pl="2" bg="#3d4d5c" area={"nav"}>
              <List spacing={3} overflowY="auto">
                {users?.data.map((res, index) => (
                  <ListItem
                    key={index}
                    onClick={() => {
                      setCurrentUser(res.user);
                      queryClient.invalidateQueries([
                        "Messages",
                        { userId: res.user._id },
                      ]);
                    }}
                  >
                    <Flex
                      textColor={"white"}
                      alignItems="center"
                      gap={10}
                      p={3}
                    >
                      <Avatar
                        key={index}
                        boxShadow={"dark-lg"}
                        src={
                          res.user?.image.includes("https")
                            ? res.user.image
                            : `http://localhost:3000/static/${res.user?.image}`
                        }
                      />
                      <Text>
                        {res.user.first_Name} {res.user.last_Name}
                      </Text>
                    </Flex>
                    <Divider />
                  </ListItem>
                ))}
              </List>
            </GridItem>
            <GridItem pl="2" bg="blackAlpha.200" area={"main"}>
              <Conversation user={currentUser!} show={handleBackClick} />
            </GridItem>
          </>
        )}
      </Grid>
    </Center>
  );
};

export default withProtectedRoute(HomePageChat);
