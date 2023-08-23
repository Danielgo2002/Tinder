
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useMutation, useQuery } from "@tanstack/react-query";
  import { StepsStyleConfig, useSteps } from "chakra-ui-steps";
  import { useForm } from "react-hook-form";
  import { useNavigate } from "react-router-dom";
  import { z, ZodType } from "zod";
  import { addPrefrences } from "../api/PrefrencesApi";
  import { FormField } from "../FormField";
  import { withProtectedRoute } from "../hocs/ProtectedRoute";
  import { Blur } from "../auth/signIn";
  import { useEffect, useState } from "react";
  import { GetMyUser, MyUser } from "../api/Tinder";
import { FormPrefrencesData } from "./Preferences";
import { Box, Button, Center, Container, Flex, Heading, Input, Select, Spinner, Stack, Text, extendTheme } from "@chakra-ui/react";
  

  
  const EditUser = () => {
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
      trigger,
    } = useForm<FormPrefrencesData>({
      resolver: zodResolver(PrefrencesSchema),
    });
    const { data: Myuser, isLoading } = useQuery<MyUser>(["Myuser"], GetMyUser);
  
    const { activeStep, nextStep, prevStep } = useSteps({
      initialStep: 0,
    });
  
    const theme = extendTheme({
      components: {
        Steps: StepsStyleConfig,
      },
    });
  
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
            <form onSubmit={handleSubmit(submitData)}>
              <Stack spacing={4}>
                <Heading
                  color={"gray.800"}
                  lineHeight={1.1}
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                >
                  Add Preferences
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
                  <FormField label="MinAge" error={errors?.MinAge?.message}>
                    <Input
                      placeholder={
                        Myuser && Myuser.preferences.MinAge
                          ? Myuser.preferences.MinAge.toString()
                          : "enter number"
                      }
                      focusBorderColor="pink.200"
                      type="number"
                      {...register("MinAge", {
                        valueAsNumber: true,
                        required,
                        min: {
                          value: 18,
                          message: "Age must be more then 18",
                        },
                        max: {
                          value: 99,
                          message: "Age must be less then 18",
                        },
                      })}
                    />
                  </FormField>
                  <FormField label="MaxAge" error={errors?.MaxAge?.message}>
                    <Input
                      placeholder={
                        Myuser && Myuser.preferences.MaxAge
                          ? Myuser.preferences.MaxAge.toString()
                          : "enter number"
                      }
                      focusBorderColor="pink.200"
                      type="number"
                      {...register("MaxAge", {
                        valueAsNumber: true,
                        required,
                        min: {
                          value: 18,
                          message: "Age must be more then 18",
                        },
                        max: {
                          value: 99,
                          message: "Age must be less then 18",
                        },
                      })}
                    />
                  </FormField>
                  <br />
                  <FormField label="Location" error={errors?.location?.message}>
                    <Select
                      focusBorderColor="pink.200"
                      placeholder={
                        Myuser ? Myuser.preferences.location : "enter location"
                      }
                      {...register("location", { required })}
                    >
                      <option value={""}>select location</option>
                      <option>north</option>
                      <option>center</option>
                      <option>south</option>
                    </Select>
                  </FormField>
                  <br />
                  <FormField label="Gender" error={errors.gender?.message}>
                    <Select
                      placeholder={
                        Myuser ? Myuser.preferences.gender : "enter gender"
                      }
                      focusBorderColor="pink.200"
                      {...register("gender", { required })}
                    >
                      <option value={""}>select gender</option>
                      <option>male</option>
                      <option>female</option>
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
      </Box>
    );
  };
  export default EditUser