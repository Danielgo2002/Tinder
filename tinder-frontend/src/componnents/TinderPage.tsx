import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Center,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import {
  DislikeUser,
  GetFilterUsers,
  GetMyUser,
  LikeUser,
  MyUser,
  Users,
} from "../api/Tinder";
import { withProtectedRoute } from "../hocs/ProtectedRoute";

const Tinder = () => {
  const [currentUser, setCurrentUser] = useState(0);
  const [finishedIterating, setFinishedIterating] = useState(false);
  const [message, setMessage] = useState("false");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    data: users,
  } = useQuery<Users>(["users"], GetFilterUsers);

  const { data: Myuser } = useQuery<MyUser>(["Myuser"], GetMyUser);

  const specificUser = useMemo(
    () => users?.data && users.data[currentUser],
    [currentUser, users]
  );

  const myUserId = Myuser?._id;

  const checkMatch = () => {
    if (myUserId) {
      const match = specificUser?.likes.includes(myUserId);
      if (match) {
        onOpen();
      }
    }
  };

  useEffect(() => {
    if (users?.data && currentUser >= users.data.length) {
      setFinishedIterating(true);
    } else {
      setFinishedIterating(false);
    }
  }, [users, currentUser]);

  const reciverId = specificUser?._id;

  const avatarSize = useBreakpointValue({ base: "150px", md: "300px" });
  const buttonSize = useBreakpointValue({ base: "80px", md: "100px" });
  const buttonSpace = useBreakpointValue({ base: "48", md: "96" });
  const modalSize = useBreakpointValue({ base: "xs", md: "sm" });

  const { mutateAsync: Like } = useMutation(LikeUser, {
    onSuccess: (res) => {
      if (res.data == "error") alert("alredy liked this user");

      if (res.match) {
        setMessage(res.message);

        onOpen();
      }
    },
  });
  const { mutateAsync: Dislike } = useMutation(DislikeUser);



  return (
    <>
      <Center h="100%">
        <Box
          bgGradient={
            "linear-gradient(45deg, rgba(251, 218, 97, 0.7) 0%, rgba(255, 90, 205, 0.7) 100%)"
          }
          h="100%"
          position={"relative"}
          w={"100vw"}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
          justifyContent={"center"}
        >
          <Avatar
            boxSize={avatarSize}
            borderRadius={"100"}
            src={
              specificUser?.image.includes("https")
                ? specificUser.image
                : `http://localhost:3000/static/${specificUser?.image}`
            }
          />

          <Heading fontSize={"4xl"} fontFamily={"body"}>
            {specificUser?.first_Name} {specificUser?.last_Name}
            {finishedIterating && (
              <Heading>אין יותר משתמשים כרגע... נסה שנית מאוחר יותר</Heading>
            )}
          </Heading>
          <Text fontSize={"2xl"} fontWeight={600} color={"gray.500"} mb={4}>
            Age: {specificUser?.age}
          </Text>

          <Text fontSize={"2xl"} fontWeight={600} color={"gray.500"} mb={4}>
            Gender: {specificUser?.gender}
          </Text>
          <Text fontSize={"2xl"} fontWeight={600} color={"gray.500"} mb={4}>
            Location: {specificUser?.location}
          </Text>
          <Text textAlign={"center"} fontSize={"2xl"} px={3}>
            {specificUser?.summery}
          </Text>

          <Stack
            mt={5}
            justify={"center"}
            direction={"row"}
            spacing={buttonSpace}
          >
            <IconButton
              boxSize={buttonSize}
              colorScheme="red"
              aria-label="ex"
              size={"lg"}
              fontSize="60px"
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              onClick={async () => {
                const date = new Date().valueOf();
                await Dislike({ reciverID: reciverId! });
                setCurrentUser(currentUser + 1);
              }}
              icon={<CloseIcon />}
            />
            <IconButton
              boxSize={buttonSize}
              colorScheme="green"
              aria-label="ex"
              size={"lg"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              fontSize="60px"
              onClick={async () => {
              checkMatch();

                await Like({ reciverID: reciverId! });
                setCurrentUser(currentUser + 1);
              }}
              icon={<CheckIcon />}
            />
          </Stack>
        </Box>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontFamily={"body"}
            fontStyle={"italic"}
            fontWeight={"extrabold"}
            fontSize={"3xl"}
            color={"pink.300"}
          >
            It's A Match !!!
          </ModalHeader>
          <ModalCloseButton color={"pink.300"} size={"xl"} />
          <ModalBody
            fontFamily={"body"}
            fontStyle={"italic"}
            fontWeight={"medium"}
            fontSize={"xl"}
          >
            {message}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withProtectedRoute(Tinder);
