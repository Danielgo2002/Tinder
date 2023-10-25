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
        <Flex direction="column" align="center" dir="rtl">
          טוען...
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
          <Box dir="rtl">
          <form onSubmit={handleSubmit(submitData)}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              
            >
              עריכת פרופיל
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
                  label="שם"
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
                <FormField label="שם משפחה" error={errors?.last_Name?.message}>
                  <Input
                    defaultValue={Myuser?.last_Name}
                    placeholder="enter last name"
                    focusBorderColor="pink.200"
                    type="text"
                    {...register("last_Name", { required })}
                  />
                </FormField>
                <br />

                <FormField label="גיל" error={errors?.age?.message}>
                  <Input
                    placeholder="enter age"
                    defaultValue={Myuser?.age}
                    focusBorderColor="pink.200"
                    type="number"
                    {...register("age", { required })}
                  />
                </FormField>
                <FormField label="איזור מגורים" error={errors?.location?.message}>
                  <Select
                    focusBorderColor="pink.200"
                    defaultValue={Myuser?.location || ""}
                    {...register("location", { required })}
                  >
                    <option>צפון</option>
                    <option>מרכז</option>
                    <option>דרום</option>
                  </Select>
                </FormField>
                <FormField label="מין" error={errors?.gender?.message}>
                  <Select
                    defaultValue={Myuser?.gender}
                    focusBorderColor="pink.200"
                    {...register("gender", { required })}
                  >
                    <option>זכר</option>
                    <option>נקבה</option>
                  </Select>
                </FormField>
                <FormField label="ספר/י על עצמך" error={errors?.summery?.message}>
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

                <FormField label="בחר תמונה">
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
                שמור
              </Button>
            </Box>
          </form>
          </Box>
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
