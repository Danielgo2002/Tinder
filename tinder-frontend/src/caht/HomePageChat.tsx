import { useQuery } from "@tanstack/react-query";
import { GetChatUsers } from "../api/chatApi";
import { User, Users } from "../api/Tinder";
import React, { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import SimpleSidebar from "./sideBar";
import Nav from "../NavBar/nav";
import FullNav from "../NavBar/fullNav";
import Coinversation from "./Conversation";

const HomePageChat = () => {
  const [chats, setchats] = useState([]);

  const {
    data: data,
    isLoading,
    isError,
    refetch,
  } = useQuery<Users>(["chatUsers"], GetChatUsers);
  const [currentUser, setCurrentUser] = useState<User | undefined>(
    data?.data[0]
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {/* <FullNav></FullNav> */}

      <Grid
        overflow="hidden"
        templateAreas={`"header header"
                  "nav main"
                  `}
        gridTemplateRows={"0px 1fr 0px"}
        gridTemplateColumns={"450px 1fr"}
        h={"100vh"}
        gap="0"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="pink.300" area={"nav"}>
          <List spacing={3} overflowY="auto">
            {data?.data.map((user, index) => {
              return (
                <>
                  <ListItem
                    key={index}
                    onClick={() => {
                      setCurrentUser(user);
                    }}
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
                    {user.first_Name} {user.last_Name}
                    <br />
                  </ListItem>
                </>
              );
            })}
          </List>
        </GridItem>
        <GridItem pl="2" bg="green.300" area={"main"}>
          <Coinversation user={currentUser} />
        </GridItem>
      </Grid>
    </>
  );
};

export default HomePageChat;
