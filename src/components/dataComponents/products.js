import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { postProduct, postStock } from '@/fetching/postData';
import { InputGroup, HStack, useToast, Link, Stack, FormControl, FormLabel, Text, Button, Card, Collapse, Box, Input, InputLeftElement, Flex,Table, Thead, Tbody, Tr, Th, Td, Select, Heading, VStack, Spacer} from "@chakra-ui/react";
import { allProducts, allVendors, allWarehouses, allCategories} from './allData';
import { FiSearch, FiEdit, FiPlus, FiMaximize, FiDelete, FiDivideCircle } from 'react-icons/fi';
import { deleteProduct } from '@/fetching/deleteData';

//Parent
function Product() {
  const [dummyState, setDummyState] = useState(0); // Create dummy state
  
  const [filters, setFilters] = useState({
    warehouse_id: '',
    category_id: '',
    vendor_id: '',
    page: 1,
    limit: 10,
    q: '',
    sort: ''
  });
  const { data, setData, isLoading, error } = allProducts({ filters, dummyState });
  const { products, totalItems, totalPages, currentPage } = data;
  const { warehouses } = allWarehouses();
  function handleAddProduct(details) {
    setData(prevData => ({
      ...prevData,
      products: [...prevData.products, details]
    }));
    setDummyState(prevState => prevState + 1); // Update dummy state
  }
  function handleApplyFilters() {
    setDummyState(prevState => prevState + 1);
  }
  const { vendors } = allVendors();
  const { category, setCategory } = allCategories();

  return(
    <>
    <Flex>
      <VStack>
      <FilterForm 
      filters={filters} 
      setFilters={setFilters} 
      handleApplyFilters={handleApplyFilters}
      warehouses={warehouses}
      vendors={vendors} 
      category={category}
      pageOptions={Array.from({length: totalPages}, (_, i) => i + 1)}
      totalItems={totalItems}/>
        {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <RenderProducts data={data} setData={setData} filters={filters}/>
      )}
   
      </VStack>
      <Box pb={8}>
      <Stack>
      <AddProductForm category={category} handleAddProduct={handleAddProduct} />
      <Spacer/>
      <AddStockForm 
      data={data} 
      setData={setData} 
      handleAddProduct={handleAddProduct}
      warehouses={warehouses}
      vendors={vendors}/>
      </Stack>
      </Box>
      </Flex>
    </>
  )
  
}
export default Product;

//Add Product
export const AddProductForm = ({ handleAddProduct, category }) => {
  const [details, setDetails] = useState({
    name: '',
    price: 0,
    weight: 0,
    size: '',
    description: '',
    SKU: '',
    category_id: 0,
  })
  
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
    <Box >
      <Card mt={4} bgColor="transparent" borderRadius={10}>
        <Button as={FiPlus} onClick={() => setIsOpen(!isOpen)}>
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
export const RenderProducts = ({ data, setData , filters}) => {
  const toast = useToast();
  const router = useRouter();
  const tableBody = renderProduct(data.products);
  function renderProduct(data) {
    
    return data.map((p) => {
      const warehousesForProduct = p.Warehouses ? p.Warehouses.map((w) => ({
        id: p.id,
        name: w.name,
        WarehouseStock: w.WarehouseStock,
      })) : [];

      const totalQuantity = warehousesForProduct.reduce((acc, w) => acc + w.WarehouseStock.quantity, 0);

      const vendorsForProduct = p.Vendors ? p.Vendors.map((v) => ({
        id: p.id,
        name: v.name,
      })) : [];

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

        const handleProductDetails = (productId) => {
          router.push(`/products/${productId}`)
        }
        return (
          <Tr key={p.id}>
            <Td>
            <HStack>
            <Link
              onClick={() => handleProductDetails(p.id)}
              _hover={{
                textDecoration: 'glow',
                textShadow: '0 0 8px #fff, 0 0 12px #fff, 0 0 16px #fff',
              }}
            >
              {p.name}
              <Text fontSize="sm" color="gray.500" ml={1} display="inline">
              <FiEdit />
              </Text>
            </Link>
            </HStack>
              </Td>
              <Td>
              {p.Categories && p.Categories.map((c) => (
                <span key={c.id}>{c.name}</span>
              ))}
            </Td> 

            <Td>{warehouseSelect}</Td>
            <Td>{vendorSelect}</Td>
            <Td>{totalQuantity}</Td>
            <Td>
              <Button leftIcon={<FiDivideCircle />} onClick={() => handleDelete(p.id)}>Delete</Button>
            </Td>
          </Tr>
        );
    });
  }

  
  return (
      <Flex align="center" justify="center" direction="column" top="0"
      bottom="0"
      left="0"
      right="0">
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
export const AddStockForm = ({ data, setData, warehouses, vendors, handleAddProduct }) => {
  //data needed: products , vendors, warehouses
    
    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);
    
    const [details, setDetails] = useState({
      product_id: 0,
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
              product_id: 0,
              quantity: 1,
              vendor_id: 0,
              warehouse_id: 0
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
          <Box>
            <Button as={FiMaximize} onClick={() => setIsOpen(!isOpen)}>
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
          </Box>
    );
};

//filter component
function FilterForm({ filters, setFilters, warehouses, vendors, category, totalItems,handleApplyFilters, pageOptions}) {
  //category.categories
  const limitOptions = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "15", value: 15 },
    { label: "20", value: 20 },
  ];
  function handleChange(e) {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  }
  //warehouses[]
  function handleSubmit(e) {
    e.preventDefault();
    handleApplyFilters();
  }

  const handleClearFilters = () => {
    setFilters({ q: "", warehouse: "", vendor: "", page: 1, category:"",sort:'' });
  };
  
  return (
    <form onSubmit={handleSubmit}>
    <Flex alignItems="center"  p={4}>
  <Box flex="1">
    <Flex alignItems="center">
    <InputGroup mr={2}>
      <InputLeftElement pointerEvents="none" />
      <Select
        type="text"
        name="warehouse_id"
        value={filters.warehouse_id}
        onChange={handleChange}
        placeholder='Select Warehouse'
      >
        {warehouses.map((w) => {
          return (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          );
        })}
      </Select>

    </InputGroup>
    <InputGroup mr={2}>
      <InputLeftElement pointerEvents="none"/>
      <Select
        type="text"
        name="category_id"
        value={filters.category_id}
        onChange={handleChange}
        placeholder='Select Category'
      >
        {category.categories.map((c) => {
          return (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          );
        })}
      </Select>
    </InputGroup>
    <InputGroup mr={2}>
      <InputLeftElement pointerEvents="none"/>
      <Select
        type="text"
        name="vendor_id"
        value={filters.vendor_id}
        onChange={handleChange}
        placeholder='Select Vendor'
      >
        {vendors.map((v) => {
          return (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          );
        })}
      </Select>
    </InputGroup>
    </Flex>
    <Stack direction={{ base: 'column', md: 'row' }} spacing="4">
      <FormControl>
        <FormLabel htmlFor="q">Search</FormLabel>
        <Input
          type="text"
          id="q"
          name="q"
          value={filters.q}
          onChange={handleChange}
          placeholder="Search products"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="limit">Limit</FormLabel>
        <Select id="limit" name="limit" value={filters.limit} onChange={handleChange}>
        {limitOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label} ({totalItems > 0 ? Math.min(totalItems, option.value) : 0} items)
          </option>
        ))}
      </Select>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="page">Page</FormLabel>
        <Select
          id="page"
          name="page"
          value={filters.page}
          onChange={handleChange}
        >
          {pageOptions.map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="sort">Sort</FormLabel>
        <Select
          id="sort"
          name="sort"
          value={filters.sort}
          onChange={handleChange}
        >
          <option value="">None</option>
          <option value="name:ASC">Name (A-Z)</option>
          <option value="name:DESC">Name (Z-A)</option>
        </Select>
      </FormControl>
    </Stack>
  </Box>
    <VStack>
    <Button type="submit" leftIcon={<FiSearch />}>
      Apply filters
    </Button>
    
    <Button 
    onClick={handleClearFilters}
    leftIcon={<FiDelete />}
    >
      Clear Filters
      </Button>
    </VStack>
    
    </Flex>
    </form>

  );
}





