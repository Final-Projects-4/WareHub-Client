import { Flex,HStack, Spacer} from "@chakra-ui/react";
import ToggleColorButton from "./NavbarItems/ToggleDark";

const Navbar = () => {
  return (
    <Flex>
    <Spacer />
    <HStack>
      <ToggleColorButton/>
    </HStack>
    </Flex>
  
  );
};

export default Navbar;
