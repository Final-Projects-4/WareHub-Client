import { Box,HStack, Spacer} from "@chakra-ui/react";
import ToggleColorButton from "./NavbarItems/ToggleDark";
import Footer from "./Footer";

const Navbar = () => {
  return (
      <HStack>
        <Footer/>
        <Spacer/>
        <Box flex="1" />
        <ToggleColorButton />
      </HStack>
  );
};

export default Navbar;
