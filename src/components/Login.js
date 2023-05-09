import { Flex, Heading, Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { postLoginData } from "@/fetching/postData";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()


  const handleSubmit = (e) => {
    e.preventDefault();

    postLoginData(username, password)
      .then(data => {
        const {token} = data;
        sessionStorage.setItem("accessToken", token)
        router.push("/dashboard")
      })
      .catch(err => {
        console.log(err)
      })

  }


  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" >
      <Flex direction="column" background="gray" p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <Input placeholder="username" variant="filled" mb={3} type="username" onChange={(e) => setUsername(e.target.value)}/>
        <Input placeholder="********" variant="filled" mb={6} type="password" onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={handleSubmit} mb={6} colorScheme="teal">Log in</Button>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
