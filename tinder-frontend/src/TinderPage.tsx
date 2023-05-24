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
import { Link } from "react-router-dom";

//create route!!!!!!!!!
const Tinder = () => {
  return (<Link to={"/preferences"}>
  <Button>add prefrences</Button>
</Link>)
};

export default Tinder;
