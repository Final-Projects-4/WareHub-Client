// import { Flex, Heading,Button, Link, useColorMode, useColorModeValue, HStack, Spacer} from "@chakra-ui/react";
// import { WiMoonAltThirdQuarter } from "react-icons/wi";

// const Navbar = () => {
//   const { toggleColorMode } = useColorMode();
//   useColorModeValue("gray.100", "gray.700");

//   return (
//         <Flex>
//           <Heading><Link href="/">WareHub</Link></Heading>
//             <Spacer/>
//               <HStack>
//                 <Button variant="ghost">1</Button>
//                 <Button variant="ghost">2</Button>
//                 <Button variant="ghost" onClick={toggleColorMode} leftIcon={<WiMoonAltThirdQuarter />}/>
//               </HStack>
//         </Flex>
//   );
// };

// export default Navbar;

import { Flex, Heading, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex ml={10} mt={10}>
      <Heading fontWeight="normal" mb={4} letterSpacing="tight">
        Welcome back,{" "}
        <Flex display="inline-flex" fontWeight="bold">
          Sri Mules
        </Flex>
        <Text fontSize="sm" textAlign="end" fontWeight="light">
          Welcome to the jungle
        </Text>
      </Heading>
    </Flex>
  );
};

export default Navbar;
