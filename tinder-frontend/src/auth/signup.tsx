import {
  Box,
  Button,
  Center,
  Container,
  extendTheme,
  Flex,
  Heading,
  Input,
  Select,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormField } from "../FormField";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/authApi";
import React, { useEffect, useState } from "react";
import { Blur } from "./signIn";

export type FormAuthData = {
  gmail: string;
  password: string;
  confirmPassword: string;
  first_Name: string;
  last_Name: string;
  age: number;
  location: string;
  gender: string;
  summery: string;
  file: any;
};

export type AuthData = {
  gmail: string;
  password: string;
  first_Name: string;
  last_Name: string;
  age: number;
  location: string;
  gender: string;
  summery: string;
  file: any;
};

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormAuthData>({});
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const handleChange = (value: any) => setValue(value);

  const { mutateAsync: signUpUser } = useMutation(signUp, {
    onSuccess: (res) => {
      if (res.data.status == "error") alert("this gmail already exists");
      else Navigate("/preferences");
    },
  });

  const submitData = async (data: FormAuthData) => {
    const { confirmPassword, ...tempData } = data;

    const file = data.file[0];

    const response = await signUpUser({ ...tempData, file });
  };

  const theme = extendTheme({
    textStyles: {
      biggerAndBolder: {
        fontSize: '20px', // change this to your desired size
        fontWeight: 'bold', // makes the text bolder
      },
    },
  })
  const Navigate = useNavigate();

  const required = {
    value: true,
    message: "this field is requierd",
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <Center height="90vh">
        <Flex direction="column" align="center">
          טוען
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
          // maxW={"600px"}
          w="100%"
          spacing={{ base: 8 }}
          overflow="scroll"
        >
          <div dir="rtl">
            
              <form onSubmit={handleSubmit(submitData)}>
                <Heading
                  color={"gray.800"}
                  lineHeight={1.1}
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                >
                  הרשמה
                  <Text
                    as={"span"}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    bgClip="text"
                  >
                    !
                  </Text>
                </Heading>
                <Box mt={10}>
                  <Stack spacing={4} >
                    <FormField  label="אימיייל"  error={errors?.gmail?.message} >
                      <Input
                        focusBorderColor="pink.200"
                        type="email"
                        {...register("gmail", { required })}
                      />
                      {errors.gmail && (
                        <Text color="red">{errors.gmail.message}</Text>
                      )}
                    </FormField>
                    <br />
                    <FormField label="סיסמא" error={errors?.password?.message}>
                      <Input
                        focusBorderColor="pink.200"
                        type="password"
                        {...register("password", { required })}
                      />
                    </FormField>
                    <br />

                    <FormField
                      label="אשר סיסמא"
                      error={errors?.confirmPassword?.message}
                    >
                      <Input
                        focusBorderColor="pink.200"
                        type="password"
                        {...register("confirmPassword", { required })}
                      />
                    </FormField>
                    <FormField label="שם" error={errors?.first_Name?.message}>
                      <Input
                        focusBorderColor="pink.200"
                        type="text"
                        {...register("first_Name", { required })}
                      />
                    </FormField>
                    <FormField
                      label="שם משפחה"
                      error={errors?.last_Name?.message}
                    >
                      <Input
                        focusBorderColor="pink.200"
                        type="text"
                        {...register("last_Name", { required })}
                      />
                    </FormField>
                    <FormField label="גיל" error={errors?.age?.message}>
                      <Input
                        focusBorderColor="pink.200"
                        type="number"
                        {...register("age", {
                          valueAsNumber: true,
                          required,
                          min: {
                            value: 18,
                            message: "אופס , גילך חייב להיות 18 ומעלה",
                          },
                          max: {
                            value: 99,
                            message: "אופס , גילך חייב להיות מתחת ל 99",
                          },
                        })}
                      />{" "}
                    </FormField>
                    <FormField
                      label="איזור מגורים"
                      error={errors?.location?.message}
                    >
                      <Select
                        focusBorderColor="pink.200"
                        placeholder="בחר איזור"
                        {...register("location", { required })}
                      >
                        <option>צפון</option>
                        <option>מרכז</option>
                        <option>דרום</option>
                      </Select>
                    </FormField>
                    <FormField label="מין" error={errors?.gender?.message}>
                      <Select
                        placeholder="בחר מין"
                        focusBorderColor="pink.200"
                        {...register("gender", { required })}
                      >
                        <option>זכר</option>
                        <option>נקבה</option>
                      </Select>
                    </FormField>
                    <FormField
                      label="ספר/י על עצמך"
                      error={errors?.summery?.message}
                    >
                      <Input
                        focusBorderColor="pink.200"
                        type="text"
                        {...register("summery", { required })}
                      />
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
                    סיימתי
                  </Button>
                </Box>
              </form>
          </div>
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
}
export default Signup;
