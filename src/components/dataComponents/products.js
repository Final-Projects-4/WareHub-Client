import { useState } from 'react';
import { postProduct } from '@/fetching/postData';
import { allCategories } from './allData';
import { Button, Collapse } from '@chakra-ui/react';
import { Container, Stack, Box, Table, Thead, Tbody, Tr, Th, Td, Select,} from "@chakra-ui/react";
import { allExpenses, allProducts, allRevenues } from './allData';
//Compile needed Data here
const useProducts = () => {
  const { data } = allProducts();
  const products = data.products;
  return products;
};

const useRevenues = () => {
  const { revenues } = allRevenues();
  const revenuesData = revenues.revenues;
  return revenuesData;
};

const useExpenses = () => {
  const { expenses } = allExpenses();
  const expensesData = expenses.expenses;
  return expensesData;
};


export const AddProductForm = () => {
  const { data, setData } = allCategories();
  const [details, setDetails] = useState({
    name: '',
    price: 0,
    weight: 0,
    size: '',
    description: '',
    SKU: '',
    category_id: 1,
  })
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDetails((prev) => {
        return { ...prev, [name]: value};
    });
  };

    
    const handleSubmit = async (e) => {
      const accessToken = sessionStorage.getItem('accessToken');
        e.preventDefault();
        try {
          await postProduct(
            details.name,
            details.price,
            details.weight,
            details.size,
            details.description,
            details.SKU,
            details.category_id,
            accessToken
          );
          setDetails({
            name: '',
            price: 0,
            weight: 0,
            size: '',
            description: '',
            SKU: '',
            category_id: 1,
          });
          
        } catch (err) {
        }
      };

      return (
        <>
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Cancel' : '+ Product'}
          </Button>
          <Collapse in={isOpen} animateOpacity>
            <form onSubmit={handleSubmit}>
              <h3>Name:</h3>{' '}
              <input
                type='text'
                name='name'
                value={details.name}
                onChange={handleChange}
              ></input>
              <h3>Price</h3>{' '}
              <input
                type='text'
                name='price'
                value={details.price}
                onChange={handleChange}
              ></input>
              <h3>Weight</h3>{' '}
              <input
                type='text'
                name='weight'
                value={details.weight}
                onChange={handleChange}
              ></input>
              <h3>Size</h3>{' '}
              <input
                type='text'
                name='size'
                value={details.size}
                onChange={handleChange}
              ></input>
              <h3>Description</h3>{' '}
              <input
                type='text'
                name='description'
                value={details.description}
                onChange={handleChange}
              ></input>
              <h3>SKU</h3>{' '}
              <input
                type='text'
                name='SKU'
                value={details.SKU}
                onChange={handleChange}
              ></input>
              <h3>Category</h3>{' '}
              <select
                name='category_id'
                value={details.category_id}
                onChange={handleChange}
              >
                {data.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Button type='submit'>Submit</Button>
            </form>
          </Collapse>
        </>
      );
};

export const RenderProducts = () => {
  const products = useProducts();
  const revenuesData = useRevenues();
  const expensesData = useExpenses();

  const ProfitLoss = ({ revenuesData, expensesData }) => {
      const profit = revenuesData.totalRevenue - expensesData.totalExpense;
      const color = profit > 0 ? "teal" : "red";
      const message = profit > 0 ? "Profit Gains: " : "Profit Loss: "
    
      return (
        <Box bg={color} display="flex" minH="65px" borderRadius={10} maxW="250px" textAlign='center'>
          {message}{profit}
        </Box>
      );
  };


  function renderProduct(products) {
    return products.map((product) => {
      const warehousesForProduct = product.Warehouses.map((warehouse) => ({
        id: product.id,
        name: warehouse.name,
        WarehouseStock: warehouse.WarehouseStock,
      }));

      const totalQuantity = warehousesForProduct.reduce((acc, warehouse) => acc + warehouse.WarehouseStock.quantity, 0);

      const vendorsForProduct = product.Vendors.map((vendor) => ({
        id: product.id,
        name: vendor.name,
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
          <span>
            {warehousesForProduct[0]?.name} ({warehousesForProduct[0]?.WarehouseStock.quantity})
          </span>
        );

      const vendorSelect =
        vendorsForProduct.length > 1 ? (
          <Select variant="unstyled">
            {vendorsForProduct.map((vendor) => (
              <option key={vendor.name}>{vendor.name}</option>
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
      <Container>
        <Stack>
          <ProfitLoss revenuesData={revenuesData} expensesData={expensesData}/>
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
        </Stack>
    </Container>
  );
};
