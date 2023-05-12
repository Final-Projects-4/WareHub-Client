import { Flex, Stack } from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar";
import Orders from "@/components/Orders";
import { RenderProducts } from "@/components/dataComponents/products";
import Charts from "@/components/Chart";

const Dashboard = () => {
    return (
      <>
      <Flex>
        <Sidebar />
        <Stack>
        <Charts/>
        <RenderProducts/>
        <Orders />
        </Stack>
        <Flex p="3%" flexDir="column" overflow="auto" minH="100vh">
        </Flex>
      </Flex>
      </>
    );
};

export default Dashboard;





// =======
//   const products = useProducts();
//   const revenuesData = useRevenues();
//   const expensesData = useExpenses();


//   const ProfitLoss = ({ revenuesData, expensesData }) => {
//     const profit = revenuesData.totalRevenue - expensesData.totalExpense;
//     const color = profit > 0 ? "teal" : "red";
//     const message = profit > 0 ? "Profit Gains: " : "Profit Loss: "
  
//     return (
//       <Box bg={color} display="flex" minH="65px" borderRadius={10} maxW="250px" textAlign='center'>
//         {message}{profit}
//       </Box>
//     );
//   };



//   function renderProduct(products) {
//     return products.map((product) => {
//       const warehousesForProduct = product.Warehouses.map((warehouse) => ({
//         id: product.id,
//         name: warehouse.name,
//         WarehouseStock: warehouse.WarehouseStock
//       }));

//       const totalQuantity = warehousesForProduct.reduce((acc, warehouse) => acc + warehouse.WarehouseStock.quantity, 0);

//       const vendorsForProduct = product.Vendors.map((vendor) => ({
//         id: product.id,
//         name: vendor.name
//       }));

//       const warehouseSelect =
//         warehousesForProduct.length > 1 ? (
//           <Select variant="unstyled">
//             {warehousesForProduct.map((warehouse) => (
//               <option key={warehouse.name}>
//                 {warehouse.name} Q({warehouse.WarehouseStock.quantity})
//               </option>
//             ))}
//           </Select>
//         ) : (
//           <span>{warehousesForProduct[0]?.name} ({warehousesForProduct[0]?.WarehouseStock.quantity})</span>
//         );
      
//       const vendorSelect =
//         vendorsForProduct.length > 1 ? (
//           <Select variant="unstyled">
//             {vendorsForProduct.map((vendor) => (
//               <option key={vendor.name}>
//                 {vendor.name}
//               </option>
//             ))}
//           </Select>
//         ) : (
//           <span>{vendorsForProduct[0]?.name}</span>
//         );

//         return (
//           <Tr key={product.id}>
//             <Td>{product.name}</Td>
//             <Td>
//               {product.Categories.map((category) => (
//                 <span key={category.id}>{category.name}</span>
//               ))}
//             </Td>
//             <Td>{warehouseSelect}</Td>
//             <Td>{vendorSelect}</Td>
//             <Td>{totalQuantity}</Td>
//           </Tr>
//         );
//     });
//   }

//   const tableBody = renderProduct(products);
  
  
//   return (
    
//       <Stack>
        
//         <HStack>
//         <AddOrderForm/>
//         <AddWarehouseForm/>
//         </HStack>
//         <ProfitLoss revenuesData={revenuesData} expensesData={expensesData}/>
        
//           <Table>
//             <Thead style={{ position: 'sticky', top: 0}}>
//               <Tr>
//                 <Th>Products List</Th>
//                 <Th>Category</Th>
//                 <Th>Warehouse</Th>
//                 <Th>Vendor</Th>
//                 <Th>Quantity</Th>
//               </Tr>
//             </Thead>
//             <Tbody>{tableBody}</Tbody>
//           </Table>
        
//         <HStack>
//         <AddProductForm/>
//         <AddVendorForm/>
//         <AddCategoryForm/>
//         <AddCustomerForm/>
//         <AddStockForm/>
//         </HStack>
        
//       </Stack>
    

  
