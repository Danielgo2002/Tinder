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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z, ZodType } from "zod";
import { addPrefrences } from "../api/PrefrencesApi";
import { FormField } from "../FormField";
import { withProtectedRoute } from "../hocs/ProtectedRoute";
import { Blur } from "../auth/signIn";
import { useEffect, useState } from "react";
import { GetMyUser, MyUser } from "../api/Tinder";

export type FormPrefrencesData = {
  MinAge: number;
  MaxAge: number;
  location: string;
  gender: string;
};

const Preferences = () => {
  const [loading, setLoading] = useState(true);

  const PrefrencesSchema: ZodType<FormPrefrencesData> = z.object({
    MinAge: z.number().min(18).max(99),
    MaxAge: z.number().min(18).max(99),
    location: z.string().min(2).max(20),
    gender: z.string().min(2).max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPrefrencesData>({
    resolver: zodResolver(PrefrencesSchema),
  });
  const { data: Myuser } = useQuery<MyUser>(["Myuser"], GetMyUser);

  const required = {
    value: true,
    message: "this field is requierd",
  };

  const Navigate = useNavigate();

  const { mutateAsync: addPref } = useMutation(addPrefrences, {
    onSuccess: (res) => {
      Navigate("/MePage");
    },
  });

  const submitData = async (data: FormPrefrencesData) => {
    const response = await addPref(data);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <Center height="90vh">
        <Box>
          <Flex direction="column" align="center">
            טוען...
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="pink.200"
              size="xl"
            />
          </Flex>
        </Box>
      </Center>
    );
  }

  return (
    <Box position={"relative"}>
      <Container
        as={Flex}
        justifyContent={"center"}
        alignItems={"center"}
        maxW={"100vh"}
        minH={"100vh"}
        py={{}}
      >
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          shadow={"dark-lg"}
          p={{ base: 4, sm: 6, md: 8 }}
          maxW={"600px"}
          w="100%"
          spacing={{ base: 8 }}
        >
          <Box dir="rtl">
            <form onSubmit={handleSubmit(submitData)}>
              <Stack spacing={4}>
                <Heading
                  color={"gray.800"}
                  lineHeight={1.1}
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                >
                  הכנס העדפות
                  <Text
                    as={"span"}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    bgClip="text"
                  >
                    !
                  </Text>
                </Heading>
              </Stack>
              <Box mt={10}>
                <Stack spacing={4}>
                  <FormField
                    label="גיל מינימלי"
                    error={errors?.MinAge?.message}
                  >
                    <Input
                      defaultValue={Myuser?.preferences.MinAge}
                      placeholder="הכנס מספר"
                      focusBorderColor="pink.200"
                      type="number"
                      {...register("MinAge", {
                        valueAsNumber: true,
                        required,
                        min: {
                          value: 18,
                          message: "גילך חייב להיות מעל 18",
                        },
                        max: {
                          value: 99,
                          message: "גילך חייב להיות מתחת ל 99",
                        },
                      })}
                    />
                  </FormField>
                  <FormField
                    label="גיל מקסימלי"
                    error={errors?.MaxAge?.message}
                  >
                    <Input
                      defaultValue={Myuser?.preferences.MaxAge}
                      placeholder="הכנס מספר"
                      focusBorderColor="pink.200"
                      type="number"
                      {...register("MaxAge", {
                        valueAsNumber: true,
                        required,
                        min: {
                          value: 18,
                          message: "גילך חייב להיות מעל 18",
                        },
                        max: {
                          value: 99,
                          message: "גילך חייב להיות מתחת ל 99",
                        },
                      })}
                    />
                  </FormField>
                  <br />
                  <FormField
                    label="איזור מגורים"
                    error={errors?.location?.message}
                  >
                    <Select
                      focusBorderColor="pink.200"
                      defaultValue={Myuser?.preferences.location}
                      {...register("location", { required })}
                    >
                      <option>צפון</option>
                      <option>מרכז</option>
                      <option>דרום</option>
                    </Select>
                  </FormField>
                  <br />
                  <FormField label="מין" error={errors.gender?.message}>
                    <Select
                      defaultValue={Myuser?.preferences.gender}
                      placeholder="בחר מין"
                      focusBorderColor="pink.200"
                      {...register("gender", { required })}
                    >
                      <option>זכר</option>
                      <option>נקבה</option>
                    </Select>
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
    </Box>
  );
};

export default withProtectedRoute(Preferences);
