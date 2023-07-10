import {
  Box,
  Button,
  Container,
  extendTheme,
  Flex,
  Heading,
  Icon,
  IconProps,
  Input,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { StepsStyleConfig, useSteps } from "chakra-ui-steps";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../FormField";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/authApi";
import Nav from "../NavBar/nav";

export type SignInData = {
  gmail: string;
  password: string;
};

const SignIn = () => {
  const AuthSchema: ZodType<SignInData> = z.object({
    gmail: z.string().email().min(8).max(30),
    password: z.string().min(5).max(20),
  });
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<SignInData>({
    resolver: zodResolver(AuthSchema),
  });

  const { mutateAsync: signInUser } = useMutation(signIn, {
    onSuccess: (res) => {
      console.log(res);
      if (res.data.status == "error") alert("no user found");
      // else Navigate("/Tinder");
      else window.location.href = "/MePage";
    },
  });
  const submitData = async (data: SignInData) => {
    const { ...tempData } = data;
    console.log("rdvn dnvdvves", tempData);

    const response = await signInUser(tempData);
    console.log(response.data);
  };

  const theme = extendTheme({
    components: {
      Steps: StepsStyleConfig,
    },
  });
  const { activeStep, nextStep, prevStep } = useSteps({
    initialStep: 0,
  });

  const required = {
    value: true,
    message: "this field is requierd",
  };
  return (
    <Box position={"relative"}>
      <Nav></Nav>

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
                Sign In
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
                <FormField label="Gmail" error={errors?.gmail?.message}>
                  <Input focusBorderColor="pink.200" type="email" {...register("gmail", { required })} />
                  {errors.gmail && (
                    <Text color="red">{errors.gmail.message}</Text>
                  )}
                </FormField>
                <br />
                <FormField label="Password" error={errors?.password?.message}>
                  <Input
                  focusBorderColor="pink.200"
                    type="password"
                    {...register("password", { required })}
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
    </Box>
  );
  // <ChakraProvider theme={theme}>
  //   <Grid
  //     w={"100vw"}

  //   >
  //     <GridItem pl="3" bg="pink.300" area={"nav"} w="100vw" h={"100vh"}>
  //       <Text fontSize={"5xl"} fontWeight={"bold"} textAlign={"center"}>
  //         {" "}
  //         STEP 1
  //       </Text>
  //       <Box p={5}>
  //         <form onSubmit={handleSubmit(submitData)}>
  //           {/* <form onSubmit={handleSubmit(submitData)}> */}
  //           <Steps activeStep={activeStep}>
  //             <Step label="Sign In">
  //               <FormField label="Gmail" error={errors?.gmail?.message}>
  //                 <Input type="email" {...register("gmail", { required })} />
  //                 {errors.gmail && (
  //                   <Text color="red">{errors.gmail.message}</Text>
  //                 )}
  //               </FormField>
  //               <br />
  //               <FormField label="Password" error={errors?.password?.message}>
  //                 <Input
  //                   type="password"
  //                   {...register("password", { required })}
  //                 />
  //               </FormField>
  //             </Step>

  //             <Step label="Submit!" />
  //           </Steps>
  //           <br />
  //           <br />

  //           <Flex gap={2} my={2}>
  //             {activeStep !== 1 && <Button type="submit">Submit</Button>}
  //           </Flex>
  //         </form>
  //       </Box>
  //     </GridItem>
  //   </Grid>
  // </ChakraProvider>
};
export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="800px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="1" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

export default SignIn;

// <ChakraProvider theme={theme}>
//   <Grid
//     w={"100vw"}

//   >
//     <GridItem pl="3" bg="pink.300" area={"nav"} w="100vw" h={"100vh"}>
//       <Text fontSize={"5xl"} fontWeight={"bold"} textAlign={"center"}>
//         {" "}
//         STEP 1
//       </Text>
//       <Box p={5}>
//         <form onSubmit={handleSubmit(submitData)}>
//           {/* <form onSubmit={handleSubmit(submitData)}> */}
//           <Steps activeStep={activeStep}>
//             <Step label="Sign In">
//               <FormField label="Gmail" error={errors?.gmail?.message}>
//                 <Input type="email" {...register("gmail", { required })} />
//                 {errors.gmail && (
//                   <Text color="red">{errors.gmail.message}</Text>
//                 )}
//               </FormField>
//               <br />
//               <FormField label="Password" error={errors?.password?.message}>
//                 <Input
//                   type="password"
//                   {...register("password", { required })}
//                 />
//               </FormField>
//             </Step>

//             <Step label="Submit!" />
//           </Steps>
//           <br />
//           <br />

//           <Flex gap={2} my={2}>
//             {activeStep !== 1 && <Button type="submit">Submit</Button>}
//           </Flex>
//         </form>
//       </Box>
//     </GridItem>
//   </Grid>
// </ChakraProvider>
