import { useMutation, useQuery } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormField } from "../FormField";
import { Blur } from "../auth/signIn";
import { useEffect, useState } from "react";
import { GetMyUser, MyUser } from "../api/Tinder";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { editUser, editUserData } from "../api/editUserApi";

const EditUser = () => {
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editUserData>({});

  const submitData = async (data: editUserData) => {
    
    const file = data.file[0];

     await edituser({ ...data, file });
  };

  const { data: Myuser } = useQuery<MyUser>(["Myuser"], GetMyUser);



 

  const required = {
    value: true,
    message: "this field is requierd",
  };

  const Navigate = useNavigate();
  const { mutateAsync: edituser } = useMutation(editUser, {
    onSuccess: (res) => {
      Navigate("/MePage");
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <Center height="90vh">
        <Flex direction="column" align="center">
          LOADING...
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="pink.200"
            size="xl"
          />
        </Flex>
      </Center>
    );
  }

  return (
    <>
      <Container
        h="90%"
        as={Flex}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack
          height={"70%"}
          bg={"gray.50"}
          rounded={"xl"}
          shadow={"dark-lg"}
          p={{ base: 4, sm: 6, md: 8 }}
          w="100%"
          spacing={{ base: 8 }}
          overflow="scroll"
        >
          <form onSubmit={handleSubmit(submitData)}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Edit User
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Box mt={10}>
              <Stack spacing={4}>
                <FormField
                  label="First Name"
                  error={errors?.first_Name?.message}
                >
                  <Input
                    placeholder="enter first name"
                    defaultValue={Myuser?.first_Name}
                    focusBorderColor="pink.200"
                    type="text"
                    {...register("first_Name", { required })}
                  />
                </FormField>
                <br />
                <FormField label="Last Name" error={errors?.last_Name?.message}>
                  <Input
                    defaultValue={Myuser?.last_Name}
                    placeholder="enter last name"
                    focusBorderColor="pink.200"
                    type="text"
                    {...register("last_Name", { required })}
                  />
                </FormField>
                <br />

                <FormField label="Age" error={errors?.age?.message}>
                  <Input
                    placeholder="enter age"
                    defaultValue={Myuser?.age}
                    focusBorderColor="pink.200"
                    type="number"
                    {...register("age", { required })}
                  />
                </FormField>
                <FormField label="Location" error={errors?.location?.message}>
                  <Select
                    focusBorderColor="pink.200"
                    defaultValue={Myuser?.location || ""}
                    {...register("location", { required })}
                  >
                    <option>north</option>
                    <option>center</option>
                    <option>south</option>
                  </Select>
                </FormField>
                <FormField label="Gender" error={errors?.gender?.message}>
                  <Select
                    defaultValue={Myuser?.gender}
                    focusBorderColor="pink.200"
                    {...register("gender", { required })}
                  >
                    <option>male</option>
                    <option>female</option>
                  </Select>
                </FormField>
                <FormField label="Summery" error={errors?.summery?.message}>
                  <Input
                    placeholder="Enter Summery"
                    defaultValue={Myuser?.summery}
                    focusBorderColor="pink.200"
                    type="text"
                    {...register("summery", {
                      required,
                    })}
                  />{" "}
                </FormField>

                <FormField label="file">
                  <Input
                    focusBorderColor="pink.200"
                    type="file"
                    {...register("file")}
                  />
                </FormField>
              </Stack>
              <br />
              <Button
                type="submit"
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Stack>
      </Container>
      <Blur
        position={"fixed"}
        top={5}
        left={-5}
        style={{ filter: "blur(70px)" }}
      />
    </>
  );
};
export default EditUser;
