import {
  Box,
  Button,
  ChakraProvider,
  extendTheme,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Step, Steps, StepsStyleConfig, useSteps } from "chakra-ui-steps";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { addPrefrences } from "./api/PrefrencesApi";
import { FormField } from "./FormField";

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
          <Image
            boxSize={"100px"}
            borderRadius={"50"}
            src="https://logowik.com/content/uploads/images/tinder4318.jpg"
            alt="tinder"
          />
          <Text fontSize={"5xl"} fontWeight={"bold"} textAlign={"center"}>
            {" "}
            Add Preferences!!
          </Text>
        </GridItem>

        <GridItem pl="3" bg="pink.300" area={"nav"}>
          <Box p={5}>
            <form onSubmit={handleSubmit(submitData)}>
              <Steps activeStep={activeStep}>
                <Step label="Add Prefrences">
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
                </Step>
                <Step label="Submit" />
              </Steps>
              <br />
              <br />
              <br />
              <br />
              <Flex gap={2} my={2}>
                {activeStep !== 1 && <Button type="submit"> Submit </Button>}
              </Flex>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

export default Preferences;
