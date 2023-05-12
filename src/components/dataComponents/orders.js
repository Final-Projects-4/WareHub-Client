import { useState, useEffect } from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button
} from '@chakra-ui/react';
import { allCustomers, allWarehouses } from './allData';
import { postOrder } from '@/fetching/postData';

const useCustomers = () => {
  const { customers } = allCustomers();
  const customer = customers;
  return customer;
};

const useWarehouses = () => {
  const { warehouses } = allWarehouses();
  const warehouse = warehouses;
  return warehouse;
};


export const AddOrderForm = () => {
  const customers = useCustomers();
  const warehouses = useWarehouses();
  const [selectedWarehouse, setSelectedWarehouse] = useState(0);
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState({
    name: '',
    warehouse_id: 0,
    customer_id: 0,
    order_products: []
  })
  
  console.log(products)
  console.log(details, '<<<<<<<<<<<<<')
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
    e.preventDefault();
    const accessToken = sessionStorage.getItem('accessToken');
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
    } catch (err) {
      console.log(err);
    }
  };
  


  return (
    <Container>
      <FormControl>
        <FormLabel>Name:</FormLabel>
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
  );
  
  
}
