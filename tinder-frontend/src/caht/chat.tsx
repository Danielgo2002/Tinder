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

  // const send = async (value: string) => {
  //   await socket?.emit("sendToUser", {
  //     userId: "64b3ea70a3586f2b99dfba3f",
  //     message: value,
  //   });
  //   console.log("room 8");
  // };

  // useEffect(() => {
  //   if (Myuser) {
  //     const Newsocket = io("http://localhost:3000", {
  //       query: { id: Myuser?._id },
  //     });
  //     setSocket(Newsocket);
  //   }
  //   if (socket) {
  //     socket?.on("recived", (data) => {
  //       setMessages([...messages, data]);
  //     });
  //   }
  // }, [setSocket, Myuser]);
  const send = (value: string) => {
    socket?.emit("sendToUser", {
      userId: "64b3ea70a3586f2b99dfba43",
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
    setMessages([...messages, message]);
  };

  useEffect(() => {
    socket?.on("recived", messageListener);
    return () => {
      socket?.off("recived", messageListener);
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
