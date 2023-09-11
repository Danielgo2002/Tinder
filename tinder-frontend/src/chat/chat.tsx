import { io, Socket } from "socket.io-client";
import  { useEffect, useState } from "react";
import MessageInput from "./messageInput";
import Messages from "./messages";
import { useQuery } from "@tanstack/react-query";
import { GetMyUser, MyUser } from "../api/Tinder";



const Chat = () => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const {
    data: Myuser,
  } = useQuery<MyUser>(["Myuser"], GetMyUser);

  
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
