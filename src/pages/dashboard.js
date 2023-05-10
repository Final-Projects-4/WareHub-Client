import { useState, useEffect } from 'react';
import { fetchProducts, fetchOrders, fetchCustomers, fetchExpenses, fetchRevenues, fetchOrderDetails, fetchStocks, fetchVendors, fetchWarehouses, fetchCategories } from '@/fetching/fetchData';
import { Box, Heading, List, ListItem, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const Dashboard = () => {
  const [data, setData] = useState(
    { products: [], 
      orders: [], 
      customers: [],
      expenses: [],
      revenues: [],
      orderDetails: [],
      stocks: [],
      vendors: [],
      warehouses: [],
      categories:[]
    });

  useEffect(() => {
    Promise.all(
      [
        fetchProducts(), fetchOrders(), fetchCustomers(),
        fetchCategories(),fetchExpenses(),fetchRevenues(),
        fetchOrderDetails(),fetchStocks(),fetchVendors(),
        fetchWarehouses()
      ]
      )
      .then((
        [
          productsData, ordersData, customersData, expensesData, revenuesData,
          orderDetailsData, stocksData, vendorsData, warehousesData, categoriesData
        ]
      ) => {
        setData({
          products: productsData, 
          orders: ordersData, 
          customers: customersData,
          expenses: expensesData,
          revenues: revenuesData,
          orderDetails: orderDetailsData,
          stocks: stocksData,
          vendors: vendorsData,
          warehouses: warehousesData,
          categories: categoriesData 
        });
      })      
      .catch(err => console.log(err));
  }, []);
  

  return (
    <Table>
    <Thead>
      <Tr>
        <Th>Product Name</Th>
        <Th>Order Name</Th>
        <Th>Total Price</Th>
        <Th>Customer Name</Th>
      </Tr>
    </Thead>
    <Tbody>
      {data.products.map((product) => (
        <Tr key={product.id}>
          <Td>{product.name}</Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      ))}
      {data.orders.map((order) => (
        <Tr key={order.id}>
          <Td></Td>
          <Td>{order.name}</Td>
          <Td>{order.total_price}</Td>
          <Td></Td>
        </Tr>
      ))}
      {data.customers.map((customer) => (
        <Tr key={customer.id}>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td>{customer.first_name} {customer.last_name}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
  );
  
  
};

export default Dashboard;
