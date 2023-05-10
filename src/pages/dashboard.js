import { useState, useEffect } from 'react';
import { fetchProducts, fetchOrders, fetchCustomers, fetchExpenses, fetchRevenues, fetchOrderDetails, fetchStocks, fetchVendors, fetchWarehouses, fetchCategories } from '@/fetching/fetchData';
import { Table, Thead, Tbody, Tr, Th, Td, Select, Container } from "@chakra-ui/react";

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
  
  const products = data.products;

  function renderProduct(products) {
    return products.map((product) => {
      const warehousesForProduct = product.Warehouses.map((warehouse) => ({
        id: product.id,
        name: warehouse.name,
        WarehouseStock: warehouse.WarehouseStock
      }));

      const totalQuantity = warehousesForProduct.reduce((acc, warehouse) => acc + warehouse.WarehouseStock.quantity, 0);

      const vendorsForProduct = product.Vendors.map((vendor) => ({
        id: product.id,
        name: vendor.name
      }));

      const warehouseSelect =
        warehousesForProduct.length > 1 ? (
          <Select>
            {warehousesForProduct.map((warehouse) => (
              <option key={warehouse.name}>
                {warehouse.name} Q({warehouse.WarehouseStock.quantity})
              </option>
            ))}
          </Select>
        ) : (
          <span>{warehousesForProduct[0]?.name} ({warehousesForProduct[0]?.WarehouseStock.quantity})</span>
        );
      
      const vendorSelect =
        vendorsForProduct.length > 1 ? (
          <Select>
            {vendorsForProduct.map((vendor) => (
              <option key={vendor.name}>
                {vendor.name}
              </option>
            ))}
          </Select>
        ) : (
          <span>{vendorsForProduct[0]?.name}</span>
        );

        return (
          <Tr key={product.id}>
            <Td>{product.name}</Td>
            <Td>
              {product.Categories.map((category) => (
                <span key={category.id}>{category.name}</span>
              ))}
            </Td>
            <Td>{warehouseSelect}</Td>
            <Td>{vendorSelect}</Td>
            <Td>{totalQuantity}</Td>
          </Tr>
        );
    });
  }

  const tableBody = renderProduct(products);


  return (
    <Container maxW="container.x1">
      <Table>
        <Thead>
          <Tr>
            <Th>Products List</Th>
            <Th>Category</Th>
            <Th>Warehouse</Th>
            <Th>Vendor</Th>
            <Th>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>{tableBody}</Tbody>
      </Table>
    </Container>
  );
}

export default Dashboard;
