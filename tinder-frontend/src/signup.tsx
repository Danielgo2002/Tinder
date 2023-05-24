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
        templateAreas={`"header header"
                  "nav main"
                  `}
        gridTemplateRows={"170px 1fr 50px"}
        gridTemplateColumns={"900px 1fr"}
        h="950px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="orange.300" area={"header"}>
          <Text textAlign={"right"}>
            {" "}
            <Link to={"/"}>
              <Button>home</Button>
            </Link>
            <Link to={"/signin"}>
              <Button>singnin</Button>
            </Link>
          </Text>
          <Image
            boxSize={"100px"}
            borderRadius={"50"}
            src="https://logowik.com/content/uploads/images/tinder4318.jpg"
            alt="tinder"
          />
          <Text fontSize={"5xl"} fontWeight={"bold"} textAlign={"center"}>
            {" "}
            LET'S SIGN UP!!
          </Text>
        </GridItem>

        <GridItem pl="3" bg="pink.300" area={"nav"}>
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
                    <Input
                      type="text"
                      {...register("location", { required })}
                    />
                  </FormField>
                  <FormField label="Gender" error={errors?.gender?.message}>
                    <Input type="text" {...register("gender", { required })} />
                  </FormField>
                  <FormField label="Summery" error={errors?.summery?.message}>
                    <Input type="text" {...register("summery", { required })} />
                  </FormField>
                </Step>
                {/* <Step label="Lookin for...">
                  <FormField
                    label="Gender"
                    error={LookingForErrors?.gender?.message}
                  >
                    <Input
                      type="text"
                      {...LookingRegister("gender", { required })}
                    />
                  </FormField>
                  <FormField label="Age" error={LookingForErrors?.age?.message}>
                    <Input
                      type="number"
                      {...LookingRegister("age", {
                        valueAsNumber: true,
                        required,
                      })}
                    />{" "}
                  </FormField>
                  <FormField
                    label="Location"
                    error={LookingForErrors?.location?.message}
                  >
                    <Input
                      type="text"
                      {...LookingRegister("location", { required })}
                    />
                  </FormField>
                </Step> */}
                <Step label="Submit!" />
              </Steps>
              <br />
              <br />
              <br />
              <br />
              <Flex gap={2} my={2}>
                {activeStep !== 1 && <Button type="submit">Next</Button>}
              </Flex>
            </form>
          </Box>

          {/* <form onSubmit={handleSubmit(submitData)}>
            <label> Email:</label>
            <Input type="email" {...register("email")} />
            <br />
            <br />
            <label> Password:</label>
            <Input type="password" {...register("password")} />
            <br />
            <br />
            <label>Confirm Passsword:</label>
            <Input type="password" {...register("confirmPasssword")} />
            <br />
            <label>First Name:</label>
            <Input type="text" {...register("first_Name")} />
            <br />
            <br />
            <label> Last Name:</label>
            <Input type="text" {...register("last_Name")} />
            <br />
            <br />
            <label> Age:</label>
            <Input
              type="number"
              {...register("age", { valueAsNumber: true })}
            />
            <br />
            <br />
            <label> Location:</label>
            <Input type="text" {...register("location")} />
            <br />
            <br />
            <label> Gender:</label>
            <Input type="text" {...register("gender")} />
            <br />
            <br />
            <label> summery</label>
            <Input type="text" {...register("summery")} />
            <br />
            <br />
            <br />
            <br /> <br />
          </form> */}
          {/* <Button
            dir="rigth"
            type="submit"
            loadingText="Submitting"
            colorScheme="teal"
            variant="outline"
            // onClick={navigate("/signup/step2")}
          >
            Submit
          </Button> */}
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
export default Signup;

// <Grid
// templateAreas={`"header header"
//             "nav main"
//             `}
// gridTemplateRows={"170px 1fr 50px"}
// gridTemplateColumns={"650px 1fr"}
// h="950px"
// gap="1"
// color="blackAlpha.700"
// fontWeight="bold"
// >
// <GridItem pl="2" bg="orange.300" area={"header"}>
//   <Image
//     boxSize={"100px"}
//     borderRadius={"50"}
//     src="https://logowik.com/content/uploads/images/tinder4318.jpg"
//     alt="tinder"
//   />
//   <Text fontSize={"5xl"} fontWeight={"bold"} textAlign={"center"}>
//     {" "}
//     LET'S SIGN UP!!
//   </Text>
// </GridItem>

// <GridItem pl="3" bg="pink.300" area={"nav"}>
//   <Text fontSize={"5xl"} fontWeight={"bold"} textAlign={"center"}>
//     {" "}
//     STEP 1
//   </Text>

//   <form onSubmit={handleSubmit(submitData)}>
//     <label> Email:</label>
//     <Input type="email" {...register("email")} />
//     <br />
//     <br />
//     <label> Password:</label>
//     <Input type="password" {...register("password")} />
//     <br />
//     <br />
//     <label>Confirm Passsword:</label>
//     <Input type="password" {...register("confirmPasssword")} />
//     <br />
//     <br />
//   </form>
// </GridItem>
// <GridItem pl="2" bg="green.300" area={"main"}>
//   <form onSubmit={handleSubmit(submitData)}>
//     <Text fontSize={"5xl"} fontWeight={"bold"} textAlign={"center"}>
//       {" "}
//       About you:
//     </Text>
//     <label>First Name:</label>
//     <Input type="text" {...register("first_Name")} />
//     <br />
//     <br />
//     <label> Last Name:</label>
//     <Input type="text" {...register("last_Name")} />
//     <br />
//     <br />
//     <label> Age:</label>
//     <Input type="number" {...register("age", { valueAsNumber: true })} />
//     <br />
//     <br />
//     <label> Location:</label>
//     <Input type="text" {...register("location")} />
//     <br />
//     <br />
//     <label> Gender:</label>
//     <Input type="text" {...register("gender")} />
//     <br />
//     <br />
//     <label> summery</label>
//     <Input type="text" {...register("summery")} />
//     <br />
//     <br />
//     <br />
//     <br /> <br />
//   </form>
//   <Button
//     dir="rigth"
//     type="submit"
//     loadingText="Submitting"
//     colorScheme="teal"
//     variant="outline"
//     // onClick={navigate("/signup/step2")}
//   >
//     Submit
//   </Button>
// </GridItem>
// </Grid>
