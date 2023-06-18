import {
  Box,
  Button,
  ChakraProvider,
  Container,
  extendTheme,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Step, Steps, StepsStyleConfig, useSteps } from "chakra-ui-steps";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { addPrefrences } from "./api/PrefrencesApi";
import { FormField } from "./FormField";
import { Blur } from "./signIn";

export type FormPrefrencesData = {
  age: number;
  location: string;
  gender: string;
};

const Preferences = () => {
  const PrefrencesSchema: ZodType<FormPrefrencesData> = z.object({
    age: z.number().min(17).max(99),
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

  const { mutateAsync: addPref } = useMutation(addPrefrences, {
    onSuccess: (res) => {
      console.log("mutate", res);
      alert("prefrences added succesfully");
    },
  });

  const submitData = async (data: FormPrefrencesData) => {
    const response = await addPref(data);
    console.log(response);
  };

  return (
    // <ChakraProvider theme={theme}>
    //   <Grid

    //     fontWeight="bold"
    //   >
    //     <GridItem pl="2" bg="orange.300" area={"header"}>
    //       <Image
    //         boxSize={"100px"}
    //         borderRadius={"50"}
    //         src="https://logowik.com/content/uploads/images/tinder4318.jpg"
    //         alt="tinder"
    //       />
    //       <Text fontSize={"5xl"} fontWeight={"bold"} textAlign={"center"}>
    //         {" "}
    //         Add Preferences!!
    //       </Text>
    //     </GridItem>

    //     <GridItem pl="3" bg="pink.300" area={"nav"}>
    //       <Box p={5}>
    //         <form onSubmit={handleSubmit(submitData)}>
    //           <Steps activeStep={activeStep}>
    //             <Step label="Add Prefrences">
    //               <FormField label="Age" error={errors?.age?.message}>
    //                 <Input
    //                   type="number"
    //                   {...register("age", {
    //                     valueAsNumber: true,
    //                     required,
    //                   })}
    //                 />
    //               </FormField>
    //               <br />
    //               <FormField label="Location" error={errors?.location?.message}>
    //                 <Input
    //                   type="text"
    //                   {...register("location", {
    //                     required,
    //                   })}
    //                 />
    //               </FormField>
    //               <br />
    //               <FormField label="Gender" error={errors.gender?.message}>
    //                 <Input type="text" {...register("gender", { required })} />
    //               </FormField>
    //             </Step>
    //             <Step label="Submit" />
    //           </Steps>
    //           <br />
    //           <br />
    //           <br />
    //           <br />
    //           <Flex gap={2} my={2}>
    //             {activeStep !== 1 && <Button type="submit"> Submit </Button>}
    //           </Flex>
    //         </form>
    //       </Box>
    //     </GridItem>
    //   </Grid>
    // </ChakraProvider>

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
                <FormField label="Age" error={errors?.age?.message}>
                  <Input
                    type="number"
                    {...register("age", {
                      valueAsNumber: true,
                      required,
                    })}
                  />
                </FormField>
                <br />
                <FormField label="Location" error={errors?.location?.message}>
                  <Input
                    type="text"
                    {...register("location", {
                      required,
                    })}
                  />
                </FormField>
                <br />
                <FormField label="Gender" error={errors.gender?.message}>
                  <Input type="text" {...register("gender", { required })} />
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

export default Preferences;
