import { io, Socket } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import MessageInput from "./messageInput";
import Messages from "./messages";

type message = {
  id: number;
  text: string;
};

const Chat = () => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);

  const send = (value: string) => {
    socket?.emit("message", value);
  };

  useEffect(() => {
    const Newsocket = io("http://localhost:3000");
    setSocket(Newsocket)
  },[setSocket])

  const messageListener = (message:string)=>{
    setMessages([...messages , message])
  }

  useEffect(()=>{
    socket?.on("message",messageListener) 
    return()=> {socket?.off("message",messageListener)}
  },[messageListener])

   

  return (<>
  <MessageInput send={send}/>
  <Messages messages = {messages}/>
  </>
   
  );
};

export default Chat;

