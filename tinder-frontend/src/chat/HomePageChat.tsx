import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetChatUsers, getMessagesForChat } from "../api/chatApi";
import { User, Users } from "../api/Tinder";
import { SetStateAction, useState } from "react";
import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  GenericAvatarIcon,
  Grid,
  GridItem,
  IconButton,
  List,
  ListItem,
  Spacer,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Coinversation, { Message } from "./Conversation";
import { withProtectedRoute } from "../hocs/ProtectedRoute";
import { HamburgerIcon } from "@chakra-ui/icons";
import Conversation from "./Conversation";

const HomePageChat = () => {
  const [chats, setchats] = useState([]);
  const [id, setId] = useState("");
  const [isUserListOpen, setIsUserListOpen] = useState(true);
  const [showConversation, setShowConversation] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const { data: users, isLoading } = useQuery<Users>(
    ["chatUsers"],
    GetChatUsers,
    {
      onSuccess: (data) => {
        setCurrentUser(data.data[0]);
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
            Don't have chats yet 🙂
          </Text>
          <Spinner size={"lg"} />
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
                {users?.data.map((user, index) => (
                  <ListItem
                    key={index}
                    onClick={() => {
                      setCurrentUser(user);
                      queryClient.invalidateQueries([
                        "Messages",
                        { userId: user._id },
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
                          user?.image.includes("https")
                            ? user.image
                            : `http://localhost:3000/static/${user?.image}`
                        }
                      />
                      <Text>
                        {user.first_Name} {user.last_Name}
                        <Text>last message</Text>
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
                {users?.data.map((user, index) => (
                  <ListItem
                    key={index}
                    onClick={() => {
                      setCurrentUser(user);
                      queryClient.invalidateQueries([
                        "Messages",
                        { userId: user._id },
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
                          user?.image.includes("https")
                            ? user.image
                            : `http://localhost:3000/static/${user?.image}`
                        }
                      />
                      <Text>
                        {user.first_Name} {user.last_Name}
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
