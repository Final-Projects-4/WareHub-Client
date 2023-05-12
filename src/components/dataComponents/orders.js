import React from "react";
import { Flex, Avatar, Heading, Text, Stack, Checkbox, Table, Thead, Tbody, Tr, Th, Td, IconButton, TableCaption, TableContainer } from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import Charts from "@/components/Chart";
function Order() {
  return (
    <>
      <TableContainer>
        <Charts />
        <Flex justifyContent="space-between" mt={8} ml={8}>
          <Flex align="flex-end">
            <Heading as="h2" size="lg" letterSpacing="tight">
              Orders
            </Heading>
            <Text fontSize="small" color="gray" ml={4}>
              May 2023
            </Text>
          </Flex>
          <IconButton icon={<FiCalendar />} />
        </Flex>
        <Table variant="simple" mt="50px">
          <TableCaption fontWeight="light">List of order.</TableCaption>
          <Thead>
            <Tr alignItems="center">
              <Th>Order No.</Th>
              <Th>Customer</Th>
              <Th>Warehouse</Th>
              <Th>Price</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>CGK-1111</Td>
              <Td>
                <Flex align="center">
                  <Avatar size="sm" mr={2} src="user1.jpg" />
                  <Flex flexDir="column">
                    <Heading size="xs" letterSpacing="tight" fontWeight="medium">
                      Hendrik Charger
                    </Heading>
                  </Flex>
                </Flex>
              </Td>
              <Td>Jakarta</Td>
              <Td>
                <Text fontWeight="light" color="gray.400">
                  Rp. 1.500.000
                </Text>
              </Td>
              <Td>
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  <Checkbox size="sm" colorScheme="yellow" defaultChecked>
                    On Process
                  </Checkbox>
                  <Checkbox size="sm" colorScheme="green" isDisabled>
                    Success
                  </Checkbox>
                  <Checkbox size="sm" colorScheme="red" isDisabled>
                    Pending
                  </Checkbox>
                </Stack>
              </Td>
            </Tr>
            <Tr>
              <Td>SBY-1112</Td>
              <Td>
                <Flex align="center">
                  <Avatar size="sm" mr={2} src="user2.jpg" />
                  <Flex flexDir="column">
                    <Heading size="xs" letterSpacing="tight" fontWeight="medium">
                      Fitri Nangisan
                    </Heading>
                  </Flex>
                </Flex>
              </Td>
              <Td>Surabaya</Td>
              <Td>
                <Text fontWeight="light" color="gray.400">
                  Rp. 2.500.000
                </Text>
              </Td>
              <Td>
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  <Checkbox size="sm" colorScheme="yellow" defaultChecked>
                    On Process
                  </Checkbox>
                  <Checkbox size="sm" colorScheme="green" isDisabled>
                    Success
                  </Checkbox>
                  <Checkbox size="sm" colorScheme="red" isDisabled>
                    Pending
                  </Checkbox>
                </Stack>
              </Td>
            </Tr>
            <Tr>
              <Td>MDN-1113</Td>
              <Td>
                <Flex align="center">
                  <Avatar size="sm" mr={2} src="user3.jpg" />
                  <Flex flexDir="column">
                    <Heading size="xs" letterSpacing="tight" fontWeight="medium">
                      Maman Batako
                    </Heading>
                  </Flex>
                </Flex>
              </Td>
              <Td>Medan</Td>
              <Td>
                <Text fontWeight="light" color="gray.400">
                  Rp. 3.500.000
                </Text>
              </Td>
              <Td>
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  <Checkbox size="sm" colorScheme="yellow" defaultChecked>
                    On Process
                  </Checkbox>
                  <Checkbox size="sm" colorScheme="green" isDisabled>
                    Success
                  </Checkbox>
                  <Checkbox size="sm" colorScheme="red" isDisabled>
                    Pending
                  </Checkbox>
                </Stack>
              </Td>
            </Tr>
            <Tr>
              <Td>PLB-1114</Td>
              <Td>
                <Flex align="center">
                  <Avatar size="sm" mr={2} src="user4.jpg" />
                  <Flex flexDir="column">
                    <Heading size="xs" letterSpacing="tight" fontWeight="medium">
                      Leli Madagaskar
                    </Heading>
                  </Flex>
                </Flex>
              </Td>
              <Td>Palembang</Td>
              <Td>
                <Text fontWeight="light" color="gray.400">
                  Rp. 4.500.000
                </Text>
              </Td>
              <Td>
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  <Checkbox size="sm" colorScheme="yellow" defaultChecked>
                    On Process
                  </Checkbox>
                  <Checkbox size="sm" colorScheme="green" isDisabled>
                    Success
                  </Checkbox>
                  <Checkbox size="sm" colorScheme="red" isDisabled>
                    Pending
                  </Checkbox>
                </Stack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

const Orders = () => {
  return (
    <>
      <Order />
    </>
  );
};

export default Orders;
