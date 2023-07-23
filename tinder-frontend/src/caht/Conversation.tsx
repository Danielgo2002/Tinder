import {
  Avatar,
  Grid,
  GridItem,
  Input,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { User } from "../api/Tinder";

const Coinversation: React.FC<{ user: User | undefined }> = ({ user }) => {
  const myMessages = ["infinit", "rizz", "suck me"];
  const hisMessages = ["idocker", "hay ", "wa"];

  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav main"
                  "footer footer"`}
        gridTemplateRows={"100px 1fr 30px"}
        gridTemplateColumns={" 50%"}
        h="98vh"
        gap={1}
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem bg="orange.300" area={"header"}>
          <Avatar
            src={
              user?.image.includes("https")
                ? user.image
                : `http://localhost:3000/static/${user?.image}`
            }
          />
          {user?.first_Name}
        </GridItem>
        <GridItem pl="2" bg="pink.300" area={"nav"}>
          <List spacing={3} overflowY="auto" gap={2}>
            {hisMessages?.map((hisMessage, index) => {
              return (
                <>
                  <ListItem key={index} bg="blue.300">
                    {hisMessage}
                    <br />
                  </ListItem>
                </>
              );
            })}
          </List>
        </GridItem>
        <GridItem pl="2" bg="green.300" area={"main"}>
          <List spacing={3} overflowY="auto" gap={2}>
            {hisMessages?.map((myMessages, index) => {
              return (
                <>
                  <ListItem key={index} bg="blue.300">
                    {myMessages}
                    <br />
                  </ListItem>
                </>
              );
            })}
          </List>
        </GridItem>
        <GridItem h={"10vh"} pl="2" bg="blue.300" area={"footer"}>
          <Input placeholder={"idoCker"} />
        </GridItem>
      </Grid>
    </>
  );
};

export default Coinversation;
