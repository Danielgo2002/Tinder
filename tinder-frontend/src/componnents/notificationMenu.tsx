import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GetMyUser, MyUser } from "../api/Tinder";

interface NotificationMenueProps {
  isOpen: boolean;
}

const NotificationMenue: React.FC<NotificationMenueProps> = ({ isOpen }) => {

    const [note, setNote] = useState()
  const {
    data: Myuser,
    isLoading,
    isError,
    refetch,
  } = useQuery<MyUser>(["Myuser"], GetMyUser);
  

//   const handleDeleteNote = (noteId :string)=>{



//   }


  

  return (
    <Menu isOpen={isOpen} placement="bottom">
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Your notifications
      </MenuButton>
      <MenuList>
        {Myuser?.notifications.map((note) => (
          <MenuItem minH="48px" key={note._id}>
            {note.content}
            <IconButton
              color={"red"}
              bg={""}
              aria-label="delete"
              icon={<DeleteIcon />}
            />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default NotificationMenue;
