import { BellIcon, ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { MdDelete } from "react-icons/md";

import {
  Badge,
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
  console.log(userNotifications?.length);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <Menu placement="bottom">
      {userNotifications?.length! > 0 ? (
        <Box position={"relative"}>
          <Badge
            colorScheme={"whiteAlpha"}
            boxSize={"4"}
            fontSize={"xs"}
            borderRadius={"90"}
            bg="red"
            position={"absolute"}
            top="-2px"
            right={"-2px"}
          >
            {userNotifications?.length}
          </Badge>
          <MenuButton
            _hover={{ bg: "transparent" }}
            as={IconButton}
            icon={<BellIcon boxSize={"6"} bg="transparent" />}
            bg="t"
          ></MenuButton>
        </Box>
      ) : (
        <MenuButton
          as={IconButton}
          icon={<BellIcon />}
          bg="transparent"
        ></MenuButton>
      )}

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
