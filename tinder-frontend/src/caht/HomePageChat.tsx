import { useQuery } from "@tanstack/react-query";
import { GetChatUsers } from "../api/chatApi";
import { Users } from "../api/Tinder";
import React, { useMemo, useState } from "react";
import { createContext } from "react";
import { Avatar, Flex, Text, useColorMode } from "@chakra-ui/react";


const HomePageChat = () => {
  const [chats, setchats] = useState([]);
  const [currentUser, setCurrentUser] = useState(0);

  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery<Users>(["chatUsers"], GetChatUsers);

  console.log(users);
  const dataUsers = users?.data.map((user)=>user.first_Name)



  console.log(dataUsers);
  

//   const specificUser = useMemo(
//     () => users?.data && users.data[currentUser],
//     [currentUser, users]
//   );

  return (

    
      <>
      <div>{dataUsers?.map(user=>(<div >{user}</div>))}</div>
      </>
   
  );
};

export default HomePageChat;




