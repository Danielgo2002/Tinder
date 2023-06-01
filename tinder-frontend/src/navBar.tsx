// import {
//   Box,
//   Flex,
//   Text,
//   IconButton,
//   Button,
//   Stack,
//   Collapse,
//   Icon,
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   useColorModeValue,
//   useBreakpointValue,
//   useDisclosure,
//   Link,
//   Menu,
//   MenuButton,
//   Avatar,
//   MenuList,
//   Center,
//   MenuDivider,
//   MenuItem,
//   useColorMode,
//   Image,
// } from "@chakra-ui/react";
// import {
//   HamburgerIcon,
//   CloseIcon,
//   ChevronDownIcon,
//   ChevronRightIcon,
//   MoonIcon,
//   SunIcon,
// } from "@chakra-ui/icons";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// const NavBar = () => {
//   const isOnComputer = useBreakpointValue({
//     base: false,
//     md: true,
//     sm: false,
//     xs: true,
//   });
//   // const Navigate = useNavigate();
//   const { colorMode, toggleColorMode } = useColorMode();
//   const [showMenu, setShowMenu] = useState(false);
//   const [display, changeDisplay] = useState("none");

//   const isMobile = useBreakpointValue({ base: true, md: false });

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   return (
//     <Box>
//       <Flex
//         bg={useColorModeValue("white", "gray.800")}
//         color={useColorModeValue("gray.600", "white")}
//         minH={"60px"}
//         py={{ base: 2 }}
//         px={{ base: 4 }}
//         borderBottom={1}
//         borderStyle={"solid"}
//         borderColor={useColorModeValue("gray.200", "gray.900")}
//         align={"center"}
//       >
//         <Flex
//           flex={{ base: 1, md: "auto" }}
//           ml={{ base: -2 }}
//           display={{ base: "flex", md: "none" }}
//         ></Flex>
//         <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
//           <Text
//             textAlign={useBreakpointValue({ base: "center", md: "left" })}
//             fontFamily={"heading"}
//             color={useColorModeValue("gray.800", "white")}
//           >
//             <Image
//               borderRadius={"25px"}
//               boxSize={"50px"}
//               src="https://img.uxwing.com/wp-content/themes/uxwing/download/brands-social-media/tinder-icon.png"
//               alt="Dan Abramov"
//             />
//             Tinder
//           </Text>
//         </Flex>

//         <Stack
//           flex={{ base: 1, md: 0 }}
//           justify={"flex-end"}
//           direction={"row"}
//           spacing={6}
//         >
//           <Button
//             onClick={() => {
//               window.location.replace("/signin");
//             }}
//             as={"a"}
//             display={{ base: "none", md: "inline-flex" }}
//             fontSize={"sm"}
//             fontWeight={600}
//             color={"white"}
//             bg={"pink.400"}
//             _hover={{
//               bg: "pink.300",
//             }}
//           >
//             Sign In
//           </Button>

//           <Button
//             as={"a"}
//             display={{ base: "none", md: "inline-flex" }}
//             fontSize={"sm"}
//             onClick={() => {
//               window.location.replace("/signup");
//             }}
//             fontWeight={600}
//             color={"white"}
//             bg={"pink.400"}
//             _hover={{
//               bg: "pink.300",
//             }}
//           >
//             Sign Up
//           </Button>
//           {isMobile && (
//             <IconButton
//               onClick={() => {
//                 changeDisplay("flex");
//               }}
//               p={2}
//               size="md"
//               display="flex"
//               bg="gray.100"
//               colorScheme="gray"
//               aria-label="Search database"
//               icon={<HamburgerIcon />}
//             />
//           )}
//           <Flex alignItems={"center"}>
//             <Stack direction={"row"} spacing={7}>
//               <Button onClick={toggleColorMode}>
//                 {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
//               </Button>
//             </Stack>
//           </Flex>
//         </Stack>
//       </Flex>
//       <Flex
//         w="100vw"
//         bgColor="gray.50"
//         zIndex={20}
//         h="100vh"
//         pos="fixed"
//         top="0"
//         left="0"
//         overflow={"auto"}
//         flexDir="column"
//         display={display}
//       >
//         <Flex justify={"end"}>
//           <IconButton
//             mt={2}
//             mr={2}
//             aria-lable="Close Menu"
//             size="md"
//             icon={<CloseIcon />}
//             aria-label={""}
//             onClick={() => {
//               changeDisplay("none");
//             }}
//           />
//         </Flex>
//         <Flex flexDir={"column"} align={"center"}>
//           <Button
//             onClick={() => {
//               window.location.replace("/signin");
//             }}
//             as={"a"}
//             display={{ base: "none", md: "inline-flex" }}
//             fontSize={"sm"}
//             fontWeight={600}
//             color={"black"}
//             variant="ghost"
//             _hover={{
//               bg: "pink.300",
//             }}
//           >
//             Sign In
//           </Button>

//           <Button
//             as={"a"}
//             display={{ base: "none", md: "inline-flex" }}
//             fontSize={"sm"}
//             onClick={() => {
//               window.location.replace("/signup");
//             }}
//             fontWeight={600}
//             color={"black"}
//             variant="ghost"
//             _hover={{
//               bg: "pink.300",
//             }}
//           >
//             Sign Up
//           </Button>
//         </Flex>
//       </Flex>
//     </Box>
//   );
// };

// export default NavBar;

import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Link,
    Menu,
    MenuButton,
    Avatar,
    MenuList,
    Center,
    MenuDivider,
    MenuItem,
    useColorMode,
    Image,
  } from "@chakra-ui/react";
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MoonIcon,
    SunIcon,
  } from "@chakra-ui/icons";
  import { useNavigate } from "react-router-dom";
  import { useState } from "react";
  
  const NavBar = () => {
    const isOnComputer = useBreakpointValue({
      base: false,
      md: true,
      sm: false,
      xs: true,
    });
    // const Navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    const [showMenu, setShowMenu] = useState(false);
    const [display, changeDisplay] = useState("none");
  
    const isMobile = useBreakpointValue({ base: true, md: false });
  
    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };
  
    return (
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          ></Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
            >
              <Image
                borderRadius={"25px"}
                boxSize={"50px"}
                src="https://img.uxwing.com/wp-content/themes/uxwing/download/brands-social-media/tinder-icon.png"
                alt="Dan Abramov"
              />
              Tinder
            </Text>
          </Flex>
  
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              onClick={() => {
                window.location.replace("/signin");
              }}
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign In
            </Button>
  
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              onClick={() => {
                window.location.replace("/signup");
              }}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button>
            {isMobile && (
              <IconButton
                onClick={() => {
                  changeDisplay("flex");
                }}
                p={2}
                size="md"
                display="flex"
                bg="gray.100"
                colorScheme="gray"
                aria-label="Search database"
                icon={<HamburgerIcon />}
              />
            )}
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Stack>
            </Flex>
          </Stack>
          <Flex
          w="100vw"
          bgColor="gray.50"
          zIndex={20}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflow="auto"
          flexDir="column"
          display={display}
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={2}
              aria-lable="Close Menu"
              size="lg"
              icon={<CloseIcon />}
              color={"black"}
              aria-label={""}
              onClick={() => changeDisplay("none")}
            />
          </Flex>
          <Flex flexDir="column" align="center">
            <Button
              onClick={() => {
                window.location.replace("/signin");
              }}
              as={"a"}
              variant="ghost"
              color={"black"}
              aria-label="Contact"
              my={5}
              w="100%"
              // display={{ base: "none", md: "inline-flex" }}
              // fontSize={"sm"}
              // fontWeight={600}
              // color={"white"}
              // bg={"pink.400"}
              // _hover={{
              //   bg: "pink.300",
              // }}
            >
              Sign In
            </Button>

            <Button
              // display={{ base: "none", md: "inline-flex" }}
              // fontSize={"sm"}
              onClick={() => {
                window.location.replace("/signup");
              }}
              as={"a"}
              variant="ghost"
              aria-label="Contact"
              color={"black"}
              my={5}
              w="100%"
              // fontWeight={600}
              // color={"white"}
              // bg={"pink.400"}
              // _hover={{
              //   bg: "pink.300",
              // }}
            >
              Sign Up
            </Button>
          </Flex>
        </Flex>
        </Flex>
      </Box>
    );
  };
  
  export default NavBar;
  
