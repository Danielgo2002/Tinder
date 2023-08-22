import {
  Box,
  Button,
  Center,
  Container,
  extendTheme,
  Flex,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { StepsStyleConfig, useSteps } from "chakra-ui-steps";
import { FormField } from "../FormField";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/authApi";
import React, { useEffect, useState } from "react";
import { Blur } from "./signIn";
import Nav from "../NavBar/Nav";

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
    control,
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
    console.log(event.target);

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
    <>
      <Container
        h="90%"
        as={Flex}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack
          height={'70%'}
          bg={"gray.50"}
          rounded={"xl"}
          shadow={"dark-lg"}
          p={{ base: 4, sm: 6, md: 8 }}
          // maxW={"600px"}
          w="100%"
          spacing={{ base: 8 }}
          overflow='scroll'
        >
          <form onSubmit={handleSubmit(submitData)}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Sign Up
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
                <FormField label="Gmail" error={errors?.gmail?.message}>
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
                <FormField label="Password" error={errors?.password?.message}>
                  <Input
                    focusBorderColor="pink.200"
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
                    focusBorderColor="pink.200"
                    type="password"
                    {...register("confirmPassword", { required })}
                  />
                </FormField>
                <FormField
                  label="First Name"
                  error={errors?.first_Name?.message}
                >
                  <Input
                    focusBorderColor="pink.200"
                    type="text"
                    {...register("first_Name", { required })}
                  />
                </FormField>
                <FormField label="Last Name" error={errors?.last_Name?.message}>
                  <Input
                    focusBorderColor="pink.200"
                    type="text"
                    {...register("last_Name", { required })}
                  />
                </FormField>
                <FormField label="Age" error={errors?.age?.message}>
                  <Input
                    focusBorderColor="pink.200"
                    type="number"
                    {...register("age", {
                      valueAsNumber: true,
                      required,
                      min: {
                        value: 18,
                        message: "You must be at least 18 years old",
                      },
                      max: {
                        value: 99,
                        message: "You must be less than 99 years old",
                      },
                    })}
                  />{" "}
                </FormField>
                <FormField label="Location" error={errors?.location?.message}>
                  <Select
                    focusBorderColor="pink.200"
                    placeholder="Select area"
                    {...register("location", { required })}
                  >
                    <option>north</option>
                    <option>center</option>
                    <option>south</option>
                  </Select>
                </FormField>
                <FormField label="Gender" error={errors?.gender?.message}>
                  <Select
                    placeholder="Select gender"
                    focusBorderColor="pink.200"
                    {...register("gender", { required })}
                  >
                    <option>male</option>
                    <option>female</option>
                  </Select>
                </FormField>
                <FormField label="Summery" error={errors?.summery?.message}>
                  <Input
                    focusBorderColor="pink.200"
                    type="text"
                    {...register("summery", { required })}
                  />
                </FormField>
                <FormField label="file">
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
    </>
  );
}
export default Signup;
