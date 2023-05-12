import React from "react";
import { Flex, Icon, Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import { BsFillStarFill } from "react-icons/bs";

const Cards = ({ icon }) => {
  return (
    <>
      <Card maxW="sm">
        <Image objectFit="cover" src="card.jpg" alt="Chakra UI" borderTopRadius="xl" />
        <CardBody>
          <Heading size="xs" fontWeight="light">
            Chair
          </Heading>
          <Text fontWeight="bold">This is not play play chair.</Text>
          <Flex justifyContent="space-between" alignItems="center">
            <Text color="gray.600" fontSize="2xl" fontWeight="bold">
              $450
            </Text>
            <Flex>
              <Icon as={icon} fontSize="xl" color="#fca311">
                <BsFillStarFill />
              </Icon>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      <Card maxW="sm" mt="10%">
        <Image objectFit="cover" src="card2.jpg" alt="Chakra UI" borderTopRadius="xl" />
        <CardBody>
          <Heading size="xs" fontWeight="light">
            Chair
          </Heading>
          <Text fontWeight="bold">This is not play play chair.</Text>
          <Flex justifyContent="space-between" alignItems="center">
            <Text color="gray.600" fontSize="2xl" fontWeight="bold">
              $450
            </Text>
            <Flex>
              <Icon as={icon} fontSize="xl" color="#fca311">
                <BsFillStarFill />
              </Icon>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      <Card maxW="sm" mt="10%">
        <Image objectFit="cover" src="card3.jpg" alt="Chakra UI" borderTopRadius="xl" />
        <CardBody>
          <Heading size="xs" fontWeight="light">
            Chair
          </Heading>
          <Text fontWeight="bold">This is not play play chair.</Text>
          <Flex justifyContent="space-between" alignItems="center">
            <Text color="gray.600" fontSize="2xl" fontWeight="bold">
              $450
            </Text>
            <Flex>
              <Icon as={icon} fontSize="xl" color="#fca311">
                <BsFillStarFill />
              </Icon>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default Cards;
