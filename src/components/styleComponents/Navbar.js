import {
  Flex,
  Heading,
  Button,
  Link,
  useColorMode,
  useColorModeValue,
  HStack,
  Spacer,
  Text,
  Avatar,
  Divider,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { WiMoonAltThirdQuarter } from "react-icons/wi";
import { useEffect, useState } from "react";
import LoginPage from "./Login";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  useColorModeValue("White", "gray.700");
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Flex p={2} sx={{ position: "sticky", top: 0 }}>
      <Spacer />
      <HStack>
        <Button
          variant="ghost"
          onClick={toggleColorMode}
          leftIcon={<WiMoonAltThirdQuarter />}
        />
        {!isLogin ? (
          <Button onClick={onOpen} colorScheme="teal">
            Login
          </Button>
        ) : (
          <Flex mr={10} align="center">
            <Avatar size="sm" src="avatar1.jpg" />
            <Flex ml={4}>
              <Heading as="h3" size="sm">
                Admin
              </Heading>
              <Button
                colorScheme="blue"
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsLogin(false);
                  router.push("/");
                }}
              >
                Logout
              </Button>
            </Flex>
          </Flex>
        )}
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <LoginPage />
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Navbar;
