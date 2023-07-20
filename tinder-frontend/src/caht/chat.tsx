import { io, Socket } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import MessageInput from "./messageInput";
import Messages from "./messages";
import { useQuery } from "@tanstack/react-query";
import { GetMyUser, MyUser } from "../api/Tinder";

type message = {
  id: number;
  text: string;
};

const Chat = () => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const {
    data: Myuser,
    isLoading,
    isError,
    refetch,
  } = useQuery<MyUser>(["Myuser"], GetMyUser);

  const send = (value: string) => {
    socket?.emit("sendToUser", {
      userId: "64b3ea70a3586f2b99dfba3f",
      message: value,
    });
  };

  useEffect(() => {
    if (Myuser) {
      const Newsocket = io("http://localhost:3000", {
        query: { id: Myuser?._id },
      });
      setSocket(Newsocket);
    }
  }, [setSocket, Myuser]);

  const messageListener = (message: string) => {
    console.log(message);

    setMessages([...messages, message]);
  };

  useEffect(() => {
    socket?.on("sendToUser", messageListener);
    return () => {
      //socket?.off("sendToUser", messageListener);
    };
  }, [messageListener]);

  return (
    <>
      <MessageInput send={send} />
      <Messages messages={messages} />
    </>
  );
};

export default Chat;
