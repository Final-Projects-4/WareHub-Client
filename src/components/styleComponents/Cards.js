import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { fetchOrderById } from "@/fetching/fetchById";
import { allCustomers, allWarehouses } from "../dataComponents/allData";

const useCustomers = () => {
  const { customers } = allCustomers();
  const customer = customers;
  return customer;
};

const useWarehouses = () => {
  const { warehouses } = allWarehouses();
  const warehouse = warehouses;
  return warehouse;
};


function OrderCard({ orderId }) {
  const [orderData, setOrderData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const customers = useCustomers();
  const warehouses = useWarehouses();
  useEffect(() => {
    const fetchOrderData = async () => {
      const data = await fetchOrderById(orderId);
      setOrderData(data);
    };
    fetchOrderData();
  }, [orderId]);

  if (!orderData) {
    return null;
  }
  

  const customer = customers.find((c) => c.id === orderData.customer_id);
  const warehouse = warehouses.find((w) => w.id === orderData.warehouse_id);
  return (
    <>
      <Button onClick={onOpen}>View Order Details</Button>
      {isOpen && (
        <Box
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          maxWidth="600px"
          mx="auto"
          mt={5}
        >
          <Flex justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Heading size="lg">{`Order No. ${orderData.name}`}</Heading>
              <Text fontWeight="light" color="gray.400">
                {orderData.createdAt}
              </Text>
            </Box>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </Flex>
          <Divider my={5} />
          <Stack spacing={5}>
            <Flex justifyContent="space-between">
              <Text fontWeight="medium">Customer:</Text>
              <Text>
                {customer.first_name} {customer.last_name}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontWeight="medium">Warehouse:</Text>
              <Text>{warehouse.name}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontWeight="medium">Total Price:</Text>
              <Text>{orderData.total_price}</Text>
            </Flex>
            <Divider />
          </Stack>
        </Box>
      )}
    </>
  );
}

export default OrderCard;
