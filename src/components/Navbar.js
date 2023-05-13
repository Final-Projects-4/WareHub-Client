import { Flex, Heading,Button, Link, useColorMode, useColorModeValue, HStack, Spacer, Text, Avatar, Divider} from "@chakra-ui/react";
import { WiMoonAltThirdQuarter } from "react-icons/wi";

const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  useColorModeValue("gray.100", "gray.700");

  return (
    <Flex>
    <Spacer />
    <HStack>
      <Button variant="ghost">1</Button>
      <Button variant="ghost">2</Button>
      <Button variant="ghost" onClick={toggleColorMode} leftIcon={<WiMoonAltThirdQuarter />} />
      <Flex mr={10} align="center">
        <Avatar size="sm" src="avatar1.jpg" />
        <Flex ml={4}>
          <Heading as="h3" size="sm">
            Admin
          </Heading>
        </Flex>
      </Flex>
    </HStack>
  </Flex>
  
  );
};

export default Navbar;
