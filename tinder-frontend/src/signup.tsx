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
  Select,
  Text,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepsStyleConfig, Step, Steps, useSteps } from "chakra-ui-steps";
import { FormField } from "./FormField";
import { type } from "os";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "./api/authApi";
import { Link } from "react-router-dom";

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
};

function Signup() {
  const AuthSchema: ZodType<FormAuthData> = z
    .object({
      gmail: z.string().email().min(8).max(30),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
      first_Name: z.string().min(2).max(30),
      last_Name: z.string().min(2).max(30),
      age: z.number().min(17).max(99),
      location: z.string().min(2).max(20),
      gender: z.string().min(2).max(20),
      summery: z.string().max(100),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "passwords do not match",
      path: ["confirmPassword"],
    });

  // const LookingForSchema: ZodType<FormLokingForData> = z.object({
  //   age: z.number().min(17).max(99),
  //   location: z.string().min(2).max(20),
  //   gender: z.string().min(2).max(20),
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormAuthData>({
    resolver: zodResolver(AuthSchema),
  });

  const { mutateAsync: signUpUser } = useMutation(signUp, {
    onSuccess: (res) => {
      console.log(res);
      if (res.data.status == "error") alert("this gmail already exists");
      else Navigate("/preferences");
    },
  });

  const submitData = async (data: FormAuthData) => {
    const { confirmPassword, ...tempData } = data;
    console.log("res", tempData);

    const response = await signUpUser(tempData);
    console.log(response);
  };

  const theme = extendTheme({
    components: {
      Steps: StepsStyleConfig,
    },
  });

  const Navigate = useNavigate();

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
        fontWeight="bold"

        // templateAreas={`"header header"
        //           "nav main"
        //           `}
        // gridTemplateRows={"100% 1fr 50px"}
        // gridTemplateColumns={"100vh 1fr"}
        // h="100vh"
        // gap="1"
        // color="blackAlpha.700"
        // fontWeight="bold"
      >
        <GridItem pl="3" bg="pink.300" area={"nav"} w="100vw" h={"122%"}>
          <Text fontSize={"5xl"} fontWeight={"bold"} textAlign={"center"}>
            {" "}
            STEP 1
          </Text>
          <Box p={5}>
            <form onSubmit={handleSubmit(submitData)}>
              <Steps activeStep={activeStep}>
                <Step label="Sign Up">
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
                  <br />

                  <FormField
                    label="Confirm Password"
                    error={errors?.confirmPassword?.message}
                  >
                    <Input
                      type="password"
                      {...register("confirmPassword", { required })}
                    />
                  </FormField>
                  <FormField
                    label="First Name"
                    error={errors?.first_Name?.message}
                  >
                    <Input
                      type="text"
                      {...register("first_Name", { required })}
                    />
                  </FormField>
                  <FormField
                    label="Last Name"
                    error={errors?.last_Name?.message}
                  >
                    <Input
                      type="text"
                      {...register("last_Name", { required })}
                    />
                  </FormField>
                  <FormField label="Age" error={errors?.age?.message}>
                    <Input
                      type="number"
                      {...register("age", {
                        valueAsNumber: true,
                        required,
                      })}
                    />{" "}
                  </FormField>
                  <FormField label="Location" error={errors?.location?.message}>
                    <Select placeholder="Select area" required>
                      <option>north</option>
                      <option>center</option>
                      <option>south</option>
                    </Select>
                  </FormField>
                  <FormField label="Gender" error={errors?.gender?.message}>
                    <Select placeholder="Select gender" required>
                      <option>male</option>
                      <option>female</option>
                      <option>other</option>
                    </Select>
                  </FormField>
                  <FormField label="Summery" error={errors?.summery?.message}>
                    <Input type="text" {...register("summery", { required })} />
                  </FormField>
                </Step>

                <Step label="Submit!" />
              </Steps>
              <br />
              <br />
              <br />
              <br />
              <Flex gap={2} my={2}>
                {activeStep !== 1 && (
                  <Button color={"black"} type="submit">
                    Next
                  </Button>
                )}
              </Flex>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
export default Signup;
