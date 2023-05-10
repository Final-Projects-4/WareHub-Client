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
  
  const allProducts = data.products
  allProducts.map((product) => (
    product.Warehouses.map((warehouse) => (
      console.log(warehouse)
    ))
  ))
  


  function renderProduct(products) {


    return products.map((product) => (
          <Tr key={product.id}>
            <Td>{product.name}</Td>
            <Td>{product.Categories.map((category) => (<span key={category.id}>{category.name}</span>))}</Td>
            <Td></Td>
          </Tr>
    ));
    
    

  }


  return (
    <Table>
    <Thead>
      <Tr>
        <Th>Products List</Th>
        <Th>Category</Th>
        <Th>Warehouse</Th>
        <Th>Vendor</Th>
      </Tr>
    </Thead>
    <Tbody>{renderProduct(allProducts)}</Tbody>
  </Table>
  );
  
  
};

export default Dashboard;
