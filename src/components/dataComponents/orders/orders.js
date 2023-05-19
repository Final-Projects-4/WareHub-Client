import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  FormControl, ModalBody,
  FormLabel, ModalOverlay, ModalContent,
  Input, ButtonGroup,
  Select, ModalFooter,
  Button, Modal,
  Box, ModalHeader,
  HStack, Link , Text, Thead, Th, Tbody, Heading, Table, useToast, VStack, Tr, Td, Flex, useColorMode
} from '@chakra-ui/react';
import { FiPlus, FiEdit, FiDivideCircle, FiSearch, FiDelete } from 'react-icons/fi';
import { allCustomers, allWarehouses, allOrders } from '../allData';
import { postOrder } from '@/fetching/postData';
import { deleteOrder } from '@/fetching/deleteData';

//Parent
function Order() {
  const [dummyState, setDummyState] = useState(0);

  const[filters, setFilters] = useState({
    warehouse_id: '',
    customer_id: '',
    page: 1,
    limit: 5,
    sort: ''
  });
  const { data,setData} = allOrders({ filters, dummyState})
  const { totalData , totalPages } = data;
  const { customers } = allCustomers();
  const { warehouses } = allWarehouses()
  
  function handleAddOrder(details) {
    setData(prevData => ({
      ...prevData,
      orders: [...prevData.orders, details]
    }));
  
    setTimeout(() => {
      setDummyState(prevState => prevState + 1); // Update dummy state with delay
    }, 500); 
  }
  

  function handleApplyFilters() {
    setDummyState(prevState => prevState + 1);
  }
 
  return(
    <Box flex="1">
      <VStack>
      <FilterForm
        filters={filters}
        setFilters={setFilters}
        handleApplyFilters={handleApplyFilters}
        warehouses={warehouses}
        customers={customers}
        pageOptions={Array.from({length: totalPages}, (_, i) => i + 1)}
        totalData={totalData}
        />
      <HStack>
        <RenderOrders 
        data={data} 
        setData={setData} 
        filters={filters}
        customers={customers}
        warehouses={warehouses} />
        <AddOrderForm 
        customers={customers}
        warehouses={warehouses}
        handleAddOrder={handleAddOrder}
        />
      </HStack>
      </VStack>
    </Box>
  );
};

export default Order;

//Add Order 
export const AddOrderForm = ({ customers, warehouses,handleAddOrder}) => {
  
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState({
    name: '',
    warehouse_id: 0,
    customer_id: 0,
    order_products: []
  })
  const [selectedWarehouse, setSelectedWarehouse] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const addProduct = () => {
    const newProduct = {
      product_id: '',
      price: '',
      quantity: ''
    };
    setProducts([...products, newProduct]);
    setDetails(prevDetails => ({
      ...prevDetails,
      order_products: [...prevDetails.order_products, newProduct]
    }));    
  };
  

  const removeProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
    setDetails(prevDetails => ({
      ...prevDetails,
      order_products: prevDetails.order_products.filter((_, i) => i !== index)
    }));
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
    
    if (name === "customer_id") {
      setDetails((prev) => {
        return { ...prev, customer_id: parseInt(value) };
      });
    }
  };
  
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    const accessToken = sessionStorage.getItem('accessToken');
    e.preventDefault();
    handleAddOrder(details);
    try {
      const formattedProducts = products.map(product => ({
        product_id: product.product_id,
        price: product.price,
        quantity: product.quantity
      }));
      await postOrder(
        details.name,
        details.customer_id,
        details.warehouse_id,
        formattedProducts,
        accessToken
      );
      setDetails({
        name: '',
        customer_id: 0,
        warehouse_id: 0,
        order_products: []
      });
      setProducts([]);
      handleCloseModal();
      toast({
        title: 'Orders created.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      } catch (err) {
        toast({
          title: 'Failed to create orders.',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
};
  const {colorMode} = useColorMode();
  const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
  const counterColor = colorMode === 'dark' ? '#da7272' : '#fb997b';
  return (
    <Box >
        <Button size="sm" bgColor={buttonColor} leftIcon={<FiPlus/>} onClick={handleOpenModal}>
            Add Order
        </Button>
          <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <ModalOverlay/>
                <ModalContent>
                  <ModalHeader textAlign="center">Create Product</ModalHeader>
                  <ModalBody>
                <form onSubmit={handleSubmit} style={{marginTop: '1rem'}}>
                  <FormControl>
                    <FormLabel size="sm" textAlign="center">Order Event:</FormLabel>
                    <Input size="sm" variant="filled" name="name" value={details.name} onChange={handleChange} />
                    <FormLabel size="sm" textAlign="center">Warehouse:</FormLabel>
                    <Select 
                    size="sm" variant="filled"
                      value={selectedWarehouse} 
                      placeholder='select source warehouse'
                      onChange={(e) => {
                        setSelectedWarehouse(+ e.target.value);
                        setDetails((prev) => {
                          return { ...prev, warehouse_id: +e.target.value };
                        });
                      }}
                    >
                      {warehouses.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.name}
                        </option>
                      ))}
                    </Select>
                    <FormLabel size="sm" textAlign="center">Customer:</FormLabel>
                    <Select
                    size="sm" variant="filled"
                      placeholder='Choose Customer'
                      name="customer_id"
                      value={details.customer_id}
                      onChange={handleChange}
                    >
                      {customers.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.first_name} {c.last_name}
                        </option>
                      ))}
                    </Select>
                    {products.map((p, index) => (
                      <FormControl key={index}>
                        <FormLabel size="sm" textAlign="center">Product:</FormLabel>
                        <Select
                        size="sm" variant="filled"
                          placeholder='Select a product to sell'
                          value={p.product_id}
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[index].product_id = e.target.value;
                            setProducts(newProducts);
                          }}
                        >
                          {selectedWarehouse && warehouses.find((w) => w.id === selectedWarehouse)?.Products.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}  ${p.price} Available: {p.WarehouseStock.quantity}
                            </option>
                          ))}
                        </Select>
                        <FormLabel size="sm" textAlign="center">Price:</FormLabel>
                        <Input
                        size="sm" variant="filled"
                          value={p.price}
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[index].price = e.target.value;
                            setProducts(newProducts);
                          }}
                        />
                        <FormLabel size="sm" textAlign="center">Quantity:</FormLabel>
                        <Input
                          size="sm" variant="filled"
                          value={p.quantity}
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[index].quantity = e.target.value;
                            setProducts(newProducts);
                          }}
                        />
                        <Box p={4} display="flex" justifyContent="flex-end">
                          <Button  size="sm" bgColor={counterColor} onClick={() => removeProduct(index)}>
                            Remove Product
                          </Button>
                        </Box>
                      </FormControl>
                    ))}
                    <Box p={4} display="flex" justifyContent="flex-start"><Button  p={4} size="sm" bgColor={buttonColor} onClick={addProduct}>Add Product</Button></Box>
                  </FormControl>
                </form>
                    </ModalBody>
                <ModalFooter>
                <Button size="sm" bgColor={buttonColor} onClick={handleSubmit}>
                  Submit
                </Button>
                <Button  bgColor={counterColor} size="sm" colorScheme="gray" onClick={handleCloseModal} ml={2}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
      </Box>
  );
}

//Render Orders with details
export const RenderOrders = ({ data, setData, customers, warehouses}) => {
  const toast = useToast();
  const router = useRouter();
  const tableBody = renderOrder(data.orders);
  function renderOrder(data) {
    return data.map((o) => {
      function handleDelete(orderId) {
        const accessToken = sessionStorage.getItem('accessToken');
        deleteOrder(orderId, accessToken)
          .then(() => {
            toast({
              title: 'Order deleted',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            setData((prevData) => ({ ...prevData, orders: prevData.orders.filter((o) => o.id !== orderId) }));
          })
          .catch((error) => {
            toast({
              title: 'Error deleting order',
              description: error.message,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          });
      }

      const handleOrderDetails = (orderId) => {
        router.push(`/orders/${orderId}`)
      }

      return(
        <>
          <Tr key={o.id}>
            <Td>
            <HStack>
            <Link
              onClick={() => handleOrderDetails(o.id)}
              _hover={{
                textDecoration: 'glow',
                textShadow: '0 0 8px #fff, 0 0 12px #fff, 0 0 16px #fff',
              }}
            >
              {o.name}
              <Text fontSize="sm" color="gray.500" ml={1} display="inline">
              <FiEdit />
              </Text>
            </Link>
            </HStack>
              </Td>
              <Td>{o.total_price}</Td>
              <Td>
              {o.Customer ? `${o.Customer.first_name} ${o.Customer.last_name}` : null}
              </Td>
              <Td>{o.Warehouse ? o.Warehouse.name : null}</Td>
              <Td>
              <Button leftIcon={<FiDivideCircle />} onClick={() => handleDelete(o.id)}>Delete</Button>
            </Td>
          </Tr>
        </>
        
      )
    })
  }

  return (
    <Flex align="center" justify="center" direction="column" top="0"
    bottom="0"
    left="0"
    right="0">
      <Heading as="h2" size="lg" mb="4">
        Order List
      </Heading>
      <Table>
        <Thead style={{ position: "sticky", top: 0 }}>
          <Tr>
            <Th>Lists</Th>
            <Th>Total $</Th>
            <Th>Customers</Th>
            <Th>Warehouse</Th>
            
          </Tr>
        </Thead>
        
        <Tbody>{tableBody}</Tbody>
      </Table>
    </Flex>
);


}

//Filter
function FilterForm({ filters, setFilters, warehouses, customers,totalData,handleApplyFilters, pageOptions,setDummyState}) {
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

  function handleSubmit(e) {
    e.preventDefault();
    handleApplyFilters();
  }

  const handleClearFilters = () => {
    setFilters({ warehouse_id: "",  page: 1, customer_id:"",sort:'' });
  };
  return (
    <form onSubmit={handleSubmit}>
    <HStack spacing={4} alignItems="flex-end">
    <FormControl>
    <FormLabel htmlFor="warehouse_id">Warehouse</FormLabel>
    <Select
               id="warehouse_id"
               name="warehouse_id"
               value={filters.warehouse_id}
               onChange={handleChange}
               placeholder="Select Warehouse"
             >
    {warehouses.map((w) => {
    return (
    <option key={w.id} value={w.id}>
    {w.name}
    </option>
    );
    })}
    </Select>
    </FormControl>
    <FormControl>
    <FormLabel htmlFor="customer_id">Customer</FormLabel>
    <Select
               id="customer_id"
               name="customer_id"
               value={filters.customer_id}
               onChange={handleChange}
               placeholder="Select Customer"
             >
    {customers.map((c) => {
    return (
    <option key={c.id} value={c.id}>
    {c.first_name} {c.last_name}
    </option>
    );
    })}
    </Select>
    </FormControl>
    <FormControl>
    <FormLabel htmlFor="limit">Limit</FormLabel>
    <Select
               id="limit"
               name="limit"
               value={filters.limit}
               onChange={handleChange}
             >
    {limitOptions.map((option) => (
    <option key={option.value} value={option.value}>
    {option.label} ({totalData > 0 ? Math.min(totalData, option.value) : 0} data)
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
    <ButtonGroup>
    <Button type="submit" leftIcon={<FiSearch />}>
    Search
    </Button>
    <Button leftIcon={<FiDelete />} onClick={handleClearFilters}>
    Clear
    </Button>
    </ButtonGroup>
    </HStack>
    </form>
    );

}