import { Flex, Heading,Button, useColorMode, useColorModeValue, HStack, Spacer} from "@chakra-ui/react";
import { WiMoonAltThirdQuarter } from "react-icons/wi";

const Navbar = () => {
  const { toggleColorMode } = useColorMode(); 
  useColorModeValue("gray.100", "gray.700"); 

  return (
        <Flex>
          <Heading>WareHub</Heading>
            <Spacer/>
              <HStack>
                <Button variant="ghost">1</Button>
                <Button variant="ghost">2</Button>
                <Button variant="ghost" onClick={toggleColorMode} leftIcon={<WiMoonAltThirdQuarter />}/>
              </HStack>
        </Flex>
  );
};

export default Navbar;
