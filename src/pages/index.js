import { Flex, Heading, Input, Button, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { WiMoonAltThirdQuarter } from "react-icons/wi"

const LoginPage = () => {
  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue("gray.100", "gray.700")
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <Input placeholder="username" variant="filled" mb={3} type="username"/>
        <Input placeholder="********" variant="filled" mb={6} type="password"/>
        <Button mb={6} colorScheme="teal">Log in</Button>
        <Button onClick={toggleColorMode} leftIcon={<WiMoonAltThirdQuarter />} variant='outline'></Button>
      </Flex>
    </Flex>
  )
};

export default LoginPage;
