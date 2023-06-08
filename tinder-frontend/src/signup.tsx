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
import { any, optional, z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepsStyleConfig, Step, Steps, useSteps } from "chakra-ui-steps";
import { FormField } from "./FormField";
import { type } from "os";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "./api/authApi";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import axios from "axios";

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
  image?: any;
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
  image?: Blob;
};
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
      image: z
        .any()
        .refine(
          (image) => image[0].size <= MAX_FILE_SIZE,
          `Max image size is ${MAX_FILE_SIZE / 1000000}MB.`
        )
        .refine(
          (image) => ACCEPTED_IMAGE_TYPES.includes(image[0]?.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "passwords do not match",
      path: ["confirmPassword"],
    });

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
      console.log(res.data);

      if (res.data.status == "error") alert("this gmail already exists");
      else Navigate("/preferences");
    },
  });

  const submitData = async (data: FormAuthData) => {
    const { confirmPassword, ...tempData } = data;

    const image = data.image[0];

    const response = await signUpUser({ ...tempData, image: image });
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

  const [iimage, setImage] = useState();

  function handleFile(event: any) {
    setImage(event.target.file);
  }

 

  function convertToBase64(e: any) {
    console.log(e);
    var render = new FileReader();
    render.readAsDataURL(e.target.file);
    render.onload = () => {
      console.log(render.result);
    };
    render.onerror = (error) => {
      console.log("error", error);
    };
  }

  return (
    <ChakraProvider theme={theme}>
      <Grid w={"100vw"} fontWeight="bold">
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
                    <Input
                      type="text"
                      {...register("location", { required })}
                    />
                    {/* <Select placeholder="Select area">
                      <option>north</option>
                      <option>center</option>
                      <option>south</option>
                    </Select> */}
                  </FormField>
                  <FormField label="Gender" error={errors?.gender?.message}>
                    <Input type="text" {...register("gender", { required })} />
                    {/* <Select placeholder="Select gender">
                      <option>male</option>
                      <option>female</option>
                      <option>other</option>
                    </Select> */}
                  </FormField>
                  <FormField label="Summery" error={errors?.summery?.message}>
                    <Input type="text" {...register("summery", { required })} />
                  </FormField>
                  <FormField label="file">
                    <Input
                      type="file"
                      {...register("image")}
                      onChange={handleFile}
                    />
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
