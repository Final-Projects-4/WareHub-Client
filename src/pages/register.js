import {
  Flex,
  Heading,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  Box,
  Link,
  HStack,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddres] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      postRegisterData(
        firstName,
        lastName,
        email,
        userName,
        password,
        address,
        company
      )
    );
  };

  const toast = useToast();

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "#1A202C")}
          boxShadow={"lg"}
          p={8}
        >
          <Box rounded={"lg"} boxShadow={"lg"} p={2}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Registrasi
              </Heading>
              <Text
                fontSize={"lg"}
                color={useColorModeValue("gray.700", "white")}
              >
                to enjoy all of our cool features ✌️
              </Text>
            </Stack>
          </Box>
          <Stack spacing={2} pt={6}>
            <Flex>
              <Box>
                <FormControl id="firstName" isRequired>
                  <Input
                    type="text"
                    variant="flushed"
                    placeHolder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Spacer />
              <Box>
                <FormControl id="lastName">
                  <Input
                    type="text"
                    variant="flushed"
                    placeHolder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Box>
            </Flex>
            <FormControl id="email" isRequired>
              <Input
                type="email"
                variant="flushed"
                placeHolder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <Input
                type="text"
                variant="flushed"
                placeHolder="User Name"
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>

            <HStack>
              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    variant="flushed"
                    placeHolder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    variant="flushed"
                    placeHolder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowConfirmPassword(
                          (showConfirmPassword) => !showConfirmPassword
                        )
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </HStack>
            {password !== confirmPassword && (
              <Text fontSize="xs" color="red.500">
                The password does not match
              </Text>
            )}

            <FormControl isRequired>
              <Input
                type="text"
                variant="flushed"
                placeHolder="Address"
                onChange={(e) => setAddres(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <Input
                type="text"
                variant="flushed"
                placeHolder="Company"
                onChange={(e) => setCompany(e.target.value)}
              />
            </FormControl>

            <Stack spacing={10}>
              <Button
                onClick={handleSubmit}
                loadingText="Submitting"
                size="lg"
                bg={"teal.400"}
                color={"white"}
                _hover={{
                  bg: "teal.900",
                }}
              >
                Submit
              </Button>
            </Stack>
            <Stack>
              <Text align={"center"}>
                Already a user?{" "}
                <Link href={"/"} color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
