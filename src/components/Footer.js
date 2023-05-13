import { Box, Flex, HStack, useColorMode } from "@chakra-ui/react";
import { FiBox } from "react-icons/fi";


function Footer() {
  const { colorMode } = useColorMode();
  const lightBgColor = "gray.080";
  const darkBgColor = "gray.800";
  const bgColor = colorMode === "light" ? lightBgColor : darkBgColor;

  return (
    <Flex
      as="footer"
      align="center"
      justify="center"
      w="100%"
      h="5%"
      color="gray.600"
      pos="fixed"
      bottom="0"
      bgColor={bgColor}
     
    >
        <Box>
            <HStack>
                <Box as={FiBox} color="gray.600" />
                <Box as="span" fontWeight="bold" fontSize="lg">
                WareHub
                </Box>
                <Box as="span" fontSize="sm" ml="5px">
                - inventory management made easy
                </Box>
            </HStack>
        </Box>
        
    </Flex>
  );
}

export default Footer;
