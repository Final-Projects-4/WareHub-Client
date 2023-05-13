import React from "react";
import { useState, useEffect } from "react";
import { Flex, Avatar, Heading, Button, Text, Stack, Checkbox, Table, Thead, Tbody, Tr, Th, Td, IconButton, TableCaption, TableContainer, VStack } from "@chakra-ui/react";
import { FiCalendar, FiDelete } from "react-icons/fi";
import { allOrders } from "./dataComponents/allData";
import { deleteOrder } from "@/fetching/deleteData";
import { useToast } from "@chakra-ui/react";
import { fetchOrderById } from "@/fetching/fetchById";
import OrderCard from "./Cards";

const Orders = () => {
  const {data} = allOrders();
  const orderData = data.orders
  const toast = useToast()
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isOrderCardOpen, setIsOrderCardOpen] = useState(false);
  
  const handleOrderClick = async (orderId) => {
    try {
      const data = await fetchOrderById(orderId);
      setSelectedOrderId(orderId);
      setIsOrderCardOpen(true);
    } catch (error) {
    }
  };
  
  const handleOrderCardClose = () => {
    setIsOrderCardOpen(false);
    setSelectedOrderId(null);
  };
  function handleDelete(orderId) {
    const accessToken = sessionStorage.getItem('accessToken');
    deleteOrder(orderId, accessToken)
    .then(() => {
          toast({
            title: 'Order deleted',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          setTimeout(() => {
            window.location.reload();
          }, 800);
        })
        .catch((error) => {
          console.error('Error deleting Order:', error);
          toast({
            title: 'Error deleting Order',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
}

  return (
    <>
    <VStack>
    {isOrderCardOpen && <OrderCard orderId={selectedOrderId} onClose={handleOrderCardClose} />}
      <TableContainer>
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
            {orderData.map((o) => (
              <Tr key={o.id}>
              <Td>
                <Button variant="link" onClick={() => handleOrderClick(o.id)}>
                  {o.name}
                </Button>
              </Td>
                <Td>
                  <Flex align="center">
                    <Avatar as={FiCalendar} />
                    <Flex flexDir="column">
                      <Heading size="xs" letterSpacing="tight" fontWeight="medium">
                        {o.Customer.first_name} {o.Customer.last_name}
                      </Heading>
                    </Flex>
                  </Flex>
                </Td>
                <Td>{o.Warehouse.name}</Td>
                <Td>
                  <Text fontWeight="light" color="gray.400">
                    {o.total_price}
                  </Text>
                </Td>
                <Td>
                  <Stack spacing={[1, 5]} direction={["column", "row"]}>
                    <Checkbox size="sm" colorScheme="yellow">
                      On Process
                    </Checkbox>
                    <Checkbox size="sm" colorScheme="green">
                      Success
                    </Checkbox>
                    <Checkbox size="sm" colorScheme="red">
                      Pending
                    </Checkbox>
                  </Stack>
                </Td>
                <Td>
                <Button onClick={() => handleDelete(o.id)}>
                  Delete
                </Button>
              </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        
      </TableContainer>
      
      </VStack>
    </>
  );
  
};

export default Orders;