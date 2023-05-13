import { useState, useEffect } from 'react';
import { postProduct, postStock } from '@/fetching/postData';
import { allCategories } from './allData';
import { Button, Collapse } from '@chakra-ui/react';
import { InputGroup, useToast, Box, InputRightElement,Input, Container, Flex,Table, Thead, Tbody, Tr, Th, Td, Select, Heading} from "@chakra-ui/react";
import { allProducts, allVendors, allWarehouses} from './allData';
import { FiSearch } from 'react-icons/fi';
import { deleteProduct } from '@/fetching/deleteData';
//Compile needed Data here
const useProducts = (filters) => {
  const { data } = allProducts({ filters });
  const products = data.products;
  return products;
};

const useCategories = () => {
  const {data} = allCategories();
  const categories = data.categories
  return categories
}

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
  const toast = useToast();

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
          toast({
            title: 'Product created.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          setTimeout(() => {
            window.location.reload();
          }, 800);
          
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

      return (
        <>
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
                {data.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <Button type="submit" colorScheme="green">
                Submit
              </Button>
            </form>
          </Collapse>
        </>
      );
};

//Add Stock Form
export const AddStockForm = () => {
  //data needed: products , vendors, warehouses
    const { vendors } = allVendors();
    const { warehouses } = allWarehouses();
    const vendorsData = vendors;
    const warehousesData = warehouses;
    const products = useProducts()
    const toast = useToast();
    const [details, setDetails] = useState({
      product_id: 1,
      quantity: 0,
      vendor_id: 1,
      warehouse_id: 1
    })
    const [isOpen, setIsOpen] = useState(false);
  
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
          try {
            await postStock(
              details.product_id,
              details.quantity,
              details.vendor_id,
              details.warehouse_id,
              accessToken
            );
            setDetails({
              product_id: 1,
              quantity: 0,
              vendor_id: 0,
              warehouse_id: 0
            });
            toast({
              title: 'Stocks Added.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
            setTimeout(() => {
              window.location.reload();
            }, 800);
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
                    {products.map((product) => (
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
                    {vendorsData.map((vendor) => (
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
                  {warehousesData.map((warehouse) => (
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

//Render products with details
export const RenderProducts = () => {
  const toast = useToast();
  //Data fetching and state variables
  const categories = useCategories();
  const [filters, setFilters] = useState({
    warehouse_id: '',
    category_id: '',
    vendor_id: '',
    page: 1,
    limit: 10,
    q: '',
    sort: ''
  });
  
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const products = useProducts(filters);
  const { warehouses } = allWarehouses();
  const warehousesData = warehouses;
  function renderProduct(products) {
    return displayedProducts.map((product) => {
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
              setTimeout(() => {
                window.location.reload();
              }, 800);
            })
            .catch((error) => {
              console.error('Error deleting product:', error);
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
            <Td>
              <Button onClick={() => handleDelete(product.id)}>Delete</Button>
            </Td>
          </Tr>
        );
      });
  }

  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  function handleFilterChange(event) {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  }
  //Set States for displayed based on filters
  useEffect(() => {
    if (filters.category_id === '' && filters.warehouse_id === '') {
      setDisplayedProducts(products);
    } else {
      const filteredProducts = products.filter(
        product => product.Categories.some(category => category.id === parseInt(filters.category_id))
      );
      setDisplayedProducts(filteredProducts);
    } 
  }, [filters.category_id, products]);


  function handleSearchSubmit(event) {
    event.preventDefault();
    // Reset page to 1 when searching
    setFilters({ ...filters, page: 1 });
  }

  const tableBody = renderProduct(products);
  
  return (
      <Flex align="center" justify="center" direction="column" top="0"
      bottom="0"
      left="0"
      right="0">
        <form onSubmit={handleSearchSubmit}>
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
        </form>


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


