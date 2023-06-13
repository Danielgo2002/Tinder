import {
  Box,
  Button,
  ChakraProvider,
  extendTheme,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { StepsStyleConfig, Step, Steps, useSteps } from "chakra-ui-steps";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "./FormField";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "./api/authApi";
import { Link } from "react-router-dom";

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
      else Navigate("/Tinder");
    },
  });
  const submitData = async (data: SignInData) => {
    const { ...tempData } = data;
    console.log("res", tempData);

    const response = await signInUser(tempData);
    console.log(response);
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
    <ChakraProvider theme={theme}>
      <Grid
        w={"100vw"}
        
      >
        <GridItem pl="3" bg="pink.300" area={"nav"} w="100vw" h={"100vh"}>
          <Text fontSize={"5xl"} fontWeight={"bold"} textAlign={"center"}>
            {" "}
            STEP 1
          </Text>
          <Box p={5}>
            <form onSubmit={handleSubmit(submitData)}>
              {/* <form onSubmit={handleSubmit(submitData)}> */}
              <Steps activeStep={activeStep}>
                <Step label="Sign In">
                  <FormField label="Gmail" error={errors?.gmail?.message}>
                    <Input type="email" {...register("gmail", { required })} />
                    {errors.gmail && (
                      <Text color="red">{errors.gmail.message}</Text>
                    )}
                  </FormField>
                  <br />
                  <FormField label="Password" error={errors?.password?.message}>
                    <Input
                      type="password"
                      {...register("password", { required })}
                    />
                  </FormField>
                </Step>

                <Step label="Submit!" />
              </Steps>
              <br />
              <br />

              <Flex gap={2} my={2}>
                {activeStep !== 1 && <Button type="submit">Submit</Button>}
              </Flex>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

export default SignIn;
