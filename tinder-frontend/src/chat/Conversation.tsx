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
} from "@chakra-ui/react";
import { GetMyUser, MyUser, User } from "../api/Tinder";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type Message = {
  senderId: string;
  reciverId: string;
  content: string;
  name: string;
  date: Number;
};

const Coinversation: React.FC<{ user: User }> = ({ user }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const { data: Myuser } = useQuery<MyUser>(["Myuser"], GetMyUser);

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
    if (event.key === "Enter") {
      send(value);
      // Perform your operation here
    }
  };

  if (user == undefined) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <Heading>
        <Avatar
          src={
            user?.image.includes("https")
              ? user.image
              : `http://localhost:3000/static/${user?.image}`
          }
        />
        {user?.first_Name}
      </Heading>
      <br />
      <Box h="80vh" border="2px" borderColor="blue.500">
        <Grid
          display={"flex"}
          flexDirection={"column-reverse"}
          overflow="auto"
          h="78vh"
          gap={4}
        >
          <GridItem>
            {messages.map((message, index) => (
              <Flex
                key={index}
                justifyContent={
                  message.senderId === Myuser?._id ? "flex-end" : "flex-start"
                }
              >
                <Text
                  bg={
                    message.senderId === Myuser?._id ? "blue.500" : "green.500"
                  }
                  color="white"
                  p={2}
                  marginTop={index == 0 ? 2 : 0}
                  marginRight={message.senderId === Myuser?._id ? 3 : 0}
                  marginLeft={message.senderId !== Myuser?._id ? 3 : 0}
                  marginBottom={3}
                  rounded="md"
                >
                  {message.content}
                </Text>
                <Box></Box>
              </Flex>
            ))}
            <Box ref={messagesRef} />
          </GridItem>
        </Grid>
      </Box>
      <Box h="2vh"></Box>
      <Flex float={"right"} dir="rtl" display={"inline-table"}>
        <Input
          onKeyPress={handleKeyPress}
          onChange={(e) => {
            console.log(e.target.value);

            setValue(e.target.value);
          }}
          placeholder="הקלד כאן..."
          value={value}
        />
        <Button isDisabled={value === ""} onClick={() => send(value)}>
          שלח הודעה
        </Button>
      </Flex>
    </>
  );
};

export default Coinversation;
