import { Box, Button, HStack, Stack, Collapse, Table, Thead, Tbody, Tr, Th, Td, Select, Container } from "@chakra-ui/react";
import { allData } from '@/components/dataComponents/allData';
import { AddProductForm } from "@/components/Products";
import { AddVendorForm } from "@/components/dataComponents/vendor";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const {data} = allData();
  const [dataDashboard, setDataDashboard] = useState(data);
  
  
  const products = data.products;
  const revenues = data.revenues;

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
          <Select variant="unstyled">
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
          <Select variant="unstyled">
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

  const handleAddProduct = (newProduct) => {
    setDataDashboard((prevDataDashboard) => ({
      products: [...prevDataDashboard.products, newProduct],
      revenues: prevDataDashboard.revenues
    }));
  };
  
  
  return (
    <Container justifyContent="center">
      <Stack>
        <Box maxW="300px" bg="teal" display='flex' justifyContent="center" textAlign="center" borderRadius={15}  w='100%' p={4} >
          ${revenues.totalRevenue}
        </Box>
        <Container maxW="700px" maxH="400px" overflowY="scroll">
          <Table>
            <Thead style={{ position: 'sticky', top: 0}}>
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
        <HStack>
        <AddProductForm onAddProduct={handleAddProduct} />
        <AddVendorForm/>
        </HStack>
      </Stack>
    </Container>
  );
}

export default Dashboard;
