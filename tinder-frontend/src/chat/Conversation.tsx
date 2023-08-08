import {
  Avatar,
  Box,
  Grid,
  GridItem,
  Flex,
  Heading,
  Input,
  Text,
  Spinner,
  Button,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Textarea,
  Center,
  VStack,
  Stack,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import { GetMyUser, MyUser, User } from "../api/Tinder";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getMessagesForChat } from "../api/chatApi";
import { withProtectedRoute } from "../hocs/ProtectedRoute";
import { useConversationHight } from "../hooks/conversationHook";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export type Message = {
  senderId: string;
  reciverId: string;
  content: string;
  name: string;
  date: number;
};

const Coinversation: React.FC<{ user: User }> = ({ user }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const { data: Myuser } = useQuery<MyUser>(["Myuser"], GetMyUser);
  const userId = user._id;
  const { isLoading: isLoadingMessages } = useQuery<Message[]>(
    ["Messages", { userId }],
    () => getMessagesForChat(userId),
    {
      onSuccess: (res) => {
        setMessages(res);
      },
    }
  );
  const queryClient = useQueryClient();

  queryClient.invalidateQueries(["Messages"]);

  const scrollToBottom = () => {
    messagesRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (messagesRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  const send = (value: string) => {
    socket?.emit("sendToUser", {
      content: value,
      date: new Date().valueOf(),
      name: user?.first_Name,
      senderId: Myuser?._id,
      reciverId: user?._id,
    });

    setValue("");
  };

  useEffect(() => {
    if (Myuser?._id) {
      const Newsocket = io("http://localhost:3000", {
        query: { id: Myuser?._id },
      });

      setSocket(Newsocket);
    }
  }, [setSocket, Myuser]);

  useEffect(() => {
    setMessages([]);
  }, [user]);
  const messageListener = (message: Message) => {
    if (user._id === message.senderId || message.senderId == Myuser?._id) {
      setMessages([...messages, message]);
    }
  };

  useEffect(() => {
    socket?.on("recived", messageListener);
    return () => {
      socket?.off("recived", messageListener);
    };
  }, [messageListener]);

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && value !== "") {
      send(value);
    }
  };

  const maxMessageWidth = useBreakpointValue({ base: "140px", md: "300px" });
  const headingAvaterSize = useBreakpointValue({ base: "lg", md: "xl" });

  const buttonSize = useBreakpointValue({ base: "sm", md: "lg" });
  const popsize = useBreakpointValue({ base: "170", md: "250" });
  const popsizeAvater = useBreakpointValue({ base: "xl", md: "2xl" });
  const popsizeFont = useBreakpointValue({ base: "md", md: "3xl" });
  const fontSize = useBreakpointValue({ base: "xs", md: "s" });
  const dateSize = useBreakpointValue({ base: "3xs", md: "2xs" });
  const conversationWidth = useBreakpointValue({ base: "99vw", md: "72vw" });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const conversationHigth = useConversationHight();

  if (user == undefined || isLoadingMessages) {
    return (
      <Center>
        <Spinner> </Spinner>
      </Center>
    );
  }

  return (
    <Flex
      w="100%"
      h="100%"
      flexDir={"column"}
      gap={5}
      justifyContent={"space-between"}
    >
      <Heading>
        <Flex alignItems="center">
          <Popover>
            <PopoverTrigger>
              <Avatar
                size={headingAvaterSize}
                src={
                  user?.image.includes("https")
                    ? user.image
                    : `http://localhost:3000/static/${user?.image}`
                }
              />
            </PopoverTrigger>
            <PopoverContent
              bg={"whiteAlpha.900"}
              boxSize={popsize}
              borderRadius={"2xl"}
              fontSize={popsizeFont}
            >
              <Avatar
                size={popsizeAvater}
                src={
                  user?.image.includes("https")
                    ? user.image
                    : `http://localhost:3000/static/${user?.image}`
                }
              />{" "}
              {user?.first_Name} {user?.last_Name} <br /> {user.age}
              <br /> {user?.location}
            </PopoverContent>
          </Popover>
          <Text>{user?.first_Name}</Text>
          <Spacer />

          {isMobile && (
            <IconButton
              bg="transparent"
              aria-label="back to chats"
              icon={<ArrowForwardIcon />}
            />
          )}
        </Flex>
      </Heading>
      <Flex
        h="75%"
        w={conversationWidth}
        maxH={conversationHigth * 0.63}
        border="2px"
        borderColor="blue.500"
        overflowY={"scroll"}
        flexDir="column"
      >
        {messages.map((message, index) => (
          <Flex
            key={index}
            justifyContent={
              message.senderId === Myuser?._id ? "flex-end" : "flex-start"
            }
          >
            <Text
              shadow="lg"
              bg={message.senderId === Myuser?._id ? "blue.500" : "green.500"}
              color="white"
              p={2}
              marginTop={index == 0 ? 2 : 0}
              marginRight={message.senderId === Myuser?._id ? 3 : 0}
              marginLeft={message.senderId !== Myuser?._id ? 3 : 0}
              marginBottom={3}
              rounded="2xl"
              maxWidth={maxMessageWidth}
              fontSize={fontSize}
            >
              {message.content}
              <Text
                as="span"
                marginLeft={2}
                textAlign="right"
                fontSize={dateSize}
              >
                {new Date(message.date).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Text>
          </Flex>
        ))}
        <Box ref={messagesRef} />
      </Flex>
      <Flex alignItems={"center"} flexDir="row-reverse" gap={5}>
        <Textarea
          flexGrow={1}
          size={buttonSize}
          borderColor={"blue.400"}
          resize={"none"}
          dir="rtl"
          placeholder="הקלד כאן..."
          onKeyPress={handleKeyPress}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          maxLength={10000}
          value={value}
          focusBorderColor="blue.400"
          errorBorderColor="blue.300"
        />
        <Button
          size={buttonSize}
          colorScheme={"blue"}
          isDisabled={value === ""}
          onClick={() => send(value)}
        >
          שלח הודעה
        </Button>
      </Flex>
    </Flex>
  );
};

export default withProtectedRoute(Coinversation);
