import { BellIcon, ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import {
  deleteNotifications,
  GetNotification,
  Notification,
} from "../api/notificationApi";
import { GetMyUser, MyUser } from "../api/Tinder";



const NotificationMenue: React.FC = () => {
  const [note, setNote] = useState();
  const queryClient = useQueryClient();
  const {
    data: userNotifications,
    isLoading,
    isError,
    refetch,
  } = useQuery<Notification[]>(["Notifications"], GetNotification);

  const { mutateAsync: deleteNotification } = useMutation(deleteNotifications, {
    onSuccess: async (res) => {
      await queryClient.invalidateQueries(["Notifications"]);
      queryClient.setQueryData(["Notifications"], []);
    },
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <Menu placement="bottom">
      <MenuButton as={IconButton} icon={<BellIcon />} bg="transparent">
        Your notifications
      </MenuButton>
      <MenuList>
        {userNotifications?.length === 0 ? (
          <Text fontWeight={"bold"} display={"flex"} justifyContent={"center"}>
            😶 אין התראות חדשות{" "}
          </Text>
        ) : (
          <>
            {userNotifications?.map((note) => (
              <MenuItem minH="48px" key={note._id}>
                {note.content}
              </MenuItem>
            ))}
            <MenuItem display={"flex"} justifyContent="center">
              <IconButton
                color={"red"}
                bg={""}
                aria-label="delete"
                icon={<DeleteIcon />}
                onClick={async () => await deleteNotification()}
              />
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default NotificationMenue;
