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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { postLoginData } from "@/fetching/postData";
import { useRouter } from "next/router";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import Link from "next/link";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    postLoginData(username, password)
      .then((data) => {
        const { token } = data;
        sessionStorage.setItem("accessToken", token);
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Box rounded={"lg"} bg={"orange"} boxShadow={"lg"} p={4}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Welcome Back...</Heading>
              <Text
                fontSize={"lg"}
                color={useColorModeValue("gray.700", "white")}
              >
                Please Login with your personal information
              </Text>
            </Stack>
          </Box>

          <Stack spacing={4} pt={6}>
            <FormControl>
              <InputGroup>
                <Input
                  variant="flushed"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  variant="flushed"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
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

            <Stack spacing={10}>
              <Button
                onClick={handleSubmit}
                mb={6}
                bg={"blue.400"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
              >
                Login
              </Button>
            </Stack>
          </Stack>
          <Stack>
            <Text align={"center"}>
              Doesn't have an account?{" "}
              <Link href="/register" color="blue.400">
                Register
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
