import { useState, useEffect } from 'react';
import { postProduct, postStock } from '@/fetching/postData';
import { InputGroup, useToast, Button, Card, Collapse, Box, InputRightElement,Input, Container, Flex,Table, Thead, Tbody, Tr, Th, Td, Select, Heading} from "@chakra-ui/react";
import { allProducts, allVendors, allWarehouses, allCategories} from './allData';
import { FiSearch } from 'react-icons/fi';
import { deleteProduct } from '@/fetching/deleteData';

//Parent
function Product() {
  const [dummyState, setDummyState] = useState(0); // Create dummy state
  const { data, setData } = allProducts({ filters: {}, dummyState });

  function handleAddProduct(details) {
    setData(prevData => ({
      ...prevData,
      products: [...prevData.products, details]
    }));
    setDummyState(prevState => prevState + 1); // Update dummy state
  }
  

  return(
    <>
      <AddProductForm handleAddProduct={handleAddProduct} />
      <RenderProducts data={data} setData={setData} />
      <AddStockForm data={data} setData={setData} handleAddProduct={handleAddProduct}/>
    </>
  )
}
export default Product;

//Add Product
export const AddProductForm = ({ handleAddProduct }) => {
  const [details, setDetails] = useState({
    name: '',
    price: 0,
    weight: 0,
    size: '',
    description: '',
    SKU: '',
    category_id: 0,
  })
  const { category, setCategory } = allCategories();
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  
  const handleSubmit = async (e) => {
    const accessToken = sessionStorage.getItem('accessToken');
      e.preventDefault();
      handleAddProduct(details);
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
          category_id: 0,
        });
        toast({
          title: 'Product created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        } catch (err) {
          toast({
            title: 'Failed to create product.',
            description: err.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDetails((prev) => {
        return { ...prev, [name]: value};
    });
  };

  return (
    <Box w="30%" maxW="md" mx="auto" >
      <Card mt={4} bgColor="transparent" borderRadius={10}>
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Cancel' : '+ Product'}
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <Input
              placeholder="Name"
              name="name"
              value={details.name}
              onChange={handleChange}
              mb={4}
            />
            <Input
              placeholder="Price"
              name="price"
              value={details.price}
              onChange={handleChange}
              mb={4}
            />
            <Input
              placeholder="Weight"
              name="weight"
              value={details.weight}
              onChange={handleChange}
              mb={4}
            />
            <Input
              placeholder="Size"
              name="size"
              value={details.size}
              onChange={handleChange}
              mb={4}
            />
            <Input
              placeholder="Description"
              name="description"
              value={details.description}
              onChange={handleChange}
              mb={4}
            />
            <Input
              placeholder="SKU"
              name="SKU"
              value={details.SKU}
              onChange={handleChange}
              mb={4}
            />
            <Select
              placeholder="Select category"
              name="category_id"
              value={details.category_id}
              onChange={handleChange}
              mb={4}
            >
              {category.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
            <Button type="submit" colorScheme="green">
              Submit
            </Button>
          </form>
        </Collapse>
      </Card>
    </Box>
  );  
};

//Render products with details
// const { category, setCategory } = allCategories();
  //warehouses.map
  // const { warehouses, setWarehouses } = allWarehouses();
  //category.categories
  //Data fetching and state variables
  // const [filters, setFilters] = useState({
  //   warehouse_id: '',
  //   category_id: '',
  //   vendor_id: '',
  //   page: 1,
  //   limit: 10,
  //   q: '',
  //   sort: ''
  // });
  // //data.products
export const RenderProducts = ({ data, setData}) => {
  const toast = useToast();
  function renderProduct(data) {
    return data.map((p) => {
      if (!p.Warehouses) {
        return null; 
      } else if (!p.Vendors) {
        return null;
      } 
  
      const warehousesForProduct = p.Warehouses.map((w) => ({
        id: p.id,
        name: w.name,
        WarehouseStock: w.WarehouseStock,
      }));

      const totalQuantity = warehousesForProduct.reduce((acc, w) => acc + w.WarehouseStock.quantity, 0);

      const vendorsForProduct = p.Vendors.map((v) => ({
        id: p.id,
        name: v.name,
      }));

      const warehouseSelect =
        warehousesForProduct.length > 1 ? (
          <Select variant="unstyled">
            {warehousesForProduct.map((w) => (
              <option key={w.name}>
                {w.name} Q({w.WarehouseStock.quantity})
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
            {vendorsForProduct.map((v) => (
              <option key={v.name}>{v.name}</option>
            ))}
          </Select>
        ) : (
          <span>{vendorsForProduct[0]?.name}</span>
        );


        function handleDelete(productId) {
          const accessToken = sessionStorage.getItem('accessToken');
          deleteProduct(productId, accessToken)
            .then(() => {
              toast({
                title: 'Product deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
              setData((prevData) => ({ ...prevData, products: prevData.products.filter((p) => p.id !== productId) }));
            })
            .catch((error) => {
              toast({
                title: 'Error deleting product',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            });
        }
        return (
          <Tr key={p.id}>
            <Td>{p.name}</Td>
            <Td>
              {p.Categories.map((c) => (
                <span key={c.id}>{c.name}</span>
              ))}
            </Td>
            <Td>{warehouseSelect}</Td>
            <Td>{vendorSelect}</Td>
            <Td>{totalQuantity}</Td>
            <Td>
              <Button onClick={() => handleDelete(p.id)}>Delete</Button>
            </Td>
          </Tr>
        );
    });
  }

  const tableBody = renderProduct(data.products);
  
  return (
      <Flex align="center" justify="center" direction="column" top="0"
      bottom="0"
      left="0"
      right="0">
        {/* <form>
          <InputGroup mb="4" w="full" maxW="lg">
            <Input
              type="text"
              name="q"
              value={filters.q}
              onChange={handleFilterChange}
              placeholder="Search products"
              rounded="full"
              bg="white"
              boxShadow="md"
              _focus={{ boxShadow: 'outline' }}
            />
            <InputRightElement>
              <Box 
                as={FiSearch}
                aria-label="Search"
                type="submit"  
                rounded="full"
                boxShadow="md"
                _hover={{ bg: 'gray.100' }}
                _active={{ bg: 'gray.200' }}
              />
            </InputRightElement>
            <Select
              mb="4"
              w="full"
              maxW="lg"
              name="category_id"
              value={filters.category_id}
              onChange={handleFilterChange}
              rounded="full"
              bg="white"
              boxShadow="md"
              _focus={{ boxShadow: 'outline' }}
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </InputGroup>
        </form> */}
        <Heading as="h2" size="lg" mb="4">
          Product List
        </Heading>
        <Table>
          <Thead style={{ position: "sticky", top: 0 }}>
            <Tr>
              <Th>Lists</Th>
              <Th>Category</Th>
              <Th>Warehouse</Th>
              <Th>Vendor</Th>
              <Th>Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>{tableBody}</Tbody>
        </Table>
      </Flex>
  );
};

//Add Stock Form
export const AddStockForm = ({ data, setData, handleAddProduct }) => {
  //data needed: products , vendors, warehouses
    const { vendors } = allVendors();
    const { warehouses } = allWarehouses();
    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [details, setDetails] = useState({
      product_id: data.products[0].id,
      quantity: 0,
      vendor_id: 1,
      warehouse_id: 1
    })
    
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (value === '') {
        setDetails((prev) => ({ ...prev, [name]: 0 }));
      } else {
        const quantity = parseInt(value);
        setDetails((prev) => ({ ...prev, [name]: quantity }));
      }
    };
    const handleSubmit = async (e) => {
        const accessToken = sessionStorage.getItem('accessToken');
          e.preventDefault();
          handleAddProduct(details);
          try {
            await postStock(
              details.product_id,
              details.quantity,
              details.vendor_id,
              details.warehouse_id,
              accessToken
            );
            setDetails({
              product_id: data.products[0].id,
              quantity: 1,
              vendor_id: vendors[0].id,
              warehouse_id: warehouses[0].id
            });
            setData(prevData => ({
              ...prevData,
              products: [...prevData.products, details]
            }));
            toast({
              title: 'Stocks Added.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          } catch (err) {
            toast({
              title: 'Failed to add stocks.',
              description: err.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
    };
    return (
          <>
            <Button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? 'Cancel' : '+ Stocks'}
            </Button>
            <Collapse in={isOpen} animateOpacity>
              <form onSubmit={handleSubmit}>
                <h3>Product</h3>{' '}
                  <select
                    name='product_id'
                    value={details.product_id}
                    onChange={handleChange}
                  >
                    {data.products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                <h3>Quantity</h3>{' '}
                <input
                  type='text'
                  name='quantity'
                  value={details.quantity}
                  onChange={handleChange}
                ></input>
                
                <h3>Vendor</h3>{' '}
                <select
                    name='vendor_id'
                    value={details.vendor_id}
                    onChange={handleChange}
                  >
                    {vendors.map((vendor) => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name}
                      </option>
                    ))}
                </select>
                <h3>Warehouse</h3>{' '}
                <select
                  name='warehouse_id'
                  value={details.warehouse_id}
                  onChange={handleChange}
                >
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))}
                </select>
                <Button type='submit'>Submit</Button>
              </form>
            </Collapse>
          </>
    );
};




