import { useQuery } from "@tanstack/react-query";
import { GetChatUsers } from "../api/chatApi";
import { Users } from "../api/Tinder";
import React, { useMemo, useState } from "react";
import {
  Avatar,
  Box,
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

const HomePageChat = () => {
  const [chats, setchats] = useState([]);
  const [currentUser, setCurrentUser] = useState(0);

  const {
    data: data,
    isLoading,
    isError,
    refetch,
  } = useQuery<Users>(["chatUsers"], GetChatUsers);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {/* <Grid templateColumns="repeat(5, 1fr)" gap={1}>
        <GridItem bg={"yellow"} w={"30%"} colSpan={2}>
          <List spacing={3}>
            {data?.data.map((user, index) => {
              return (
                <>
                  <ListItem key={index}>
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
                  </ListItem>
                </>
              );
            })}
          </List>
        </GridItem>
        <GridItem bg={"red"} colSpan={2}>
          <Text>idocker</Text>
        </GridItem>
      </Grid> */}
      <Grid
  templateAreas={`"header header"
                  "nav main"
                  `}
  gridTemplateRows={'0px 1fr 0px'}
  gridTemplateColumns={'450px 1fr'}
  h='900px'
  gap='0'
  color='blackAlpha.700'
  fontWeight='bold'
>

  <GridItem pl='2' bg='pink.300' area={'nav'}>
  <List spacing={3}>
            {data?.data.map((user, index) => {
              return (
                <>
                  <ListItem key={index}>
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
                  </ListItem>
                </>
              );
            })}
          </List>
  </GridItem>
  <GridItem pl='2' bg='green.300' area={'main'}>
    chats
  </GridItem>
 
</Grid>
    </>
  );
};

export default HomePageChat;
