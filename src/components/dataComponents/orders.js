import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  Card,
  Collapse, useToast
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { allCustomers, allWarehouses, allOrders } from './allData';
import { postOrder } from '@/fetching/postData';

//Parent
function Order() {
  const [dummyState, setDummyState] = useState(0);

  const[filters, setFilters] = useState({
    warehouse_id: '',
    customer_id: '',
    page: 1,
    limit: 5,
    sort: ''
  })

  const { data, isLoading ,setData, error} = allOrders({ filters, dummyState})
  const { orders, totalData , totalPages, currentPage } = data;
  const { customers } = allCustomers();
  const { warehouses } = allWarehouses();
  
  function handleApplyFilters() {
    setDummyState(prevState => prevState + 1);
  }

  function handleAddOrders(details) {
    setData(prevData => ({
      ...prevData,
      orders: [...prevData.orders, details]
    }));
    setDummyState(prevState => prevState + 1); // Update dummy state
  }

  return(
    <>
      <AddOrderForm 
      customers={customers}
      warehouses={warehouses}
      handleAddOrders={handleAddOrders}
      data={data}/>
    </>
  );
};

export default Order;

export const AddOrderForm = ({ data, customers, warehouses, handleAddOrders}) => {
  
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
  

  const handleSubmit = async (e) => {
    const accessToken = sessionStorage.getItem('accessToken');
    e.preventDefault();
    handleAddOrders(details);
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
  


  return (
    <Box >
        <Card mt={4} bgColor="transparent" borderRadius={10}>
            <Button as={FiPlus} onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? 'Cancel' : '+ Product'}
            </Button>
              <Collapse in={isOpen} animateOpacity>
                <Container>
                  <FormControl>
                    <FormLabel>Order Event:</FormLabel>
                    <Input name="name" value={details.name} onChange={handleChange} />
                    <FormLabel>Warehouse:</FormLabel>
                    <Select 
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
                    <FormLabel>Customer:</FormLabel>
                    <Select
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
                        <FormLabel>Product:</FormLabel>
                        <Select
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
                        <FormLabel>Price:</FormLabel>
                        <Input
                          value={p.price}
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[index].price = e.target.value;
                            setProducts(newProducts);
                          }}
                        />
                        <FormLabel>Quantity:</FormLabel>
                        <Input
                          value={p.quantity}
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[index].quantity = e.target.value;
                            setProducts(newProducts);
                          }}
                        />
                        <Button onClick={() => removeProduct(index)}>Remove Product</Button>
                      </FormControl>
                    ))}
                    <Button onClick={addProduct}>Add Product</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                  </FormControl>
                </Container>
              </Collapse>
          </Card>
      </Box>
  );
}

