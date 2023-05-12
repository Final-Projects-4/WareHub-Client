import { useState, useEffect } from 'react';
import { Button, Collapse, Input, Container, Select, FormControl, FormLabel, Optgroup, Option } from '@chakra-ui/react';
import { allCustomers, allProducts } from './allData';
import { postOrder } from '@/fetching/postData';

const useProducts = () => {
    const { data } = allProducts();
    const products = data.products;
    return products;
  };
  
  const useCustomers = () => {
    const { customers } = allCustomers();
    const customersData = customers;
    return customersData;
  };
  

export const AddOrderForm = () => {
// Data Needed: customers, products
    const products = useProducts();
    const customers = useCustomers();
    const accessToken = sessionStorage.getItem('accessToken');
    const [isOpen, setIsOpen] = useState(false);

    const [details, setDetails] = useState({
        name: '',
        customer_id: 1,
        warehouse_id: 1,
        order_products: [
            {   
                product_id: 1,
                quantity: 1,
                price: 1
            }
        ],
    });
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === "quantity" || name === "price") {
          setDetails((prev) => {
            const orderProducts = [...prev.order_products];
            orderProducts[index] = {
              ...orderProducts[index],
              [name]: name === "quantity" ? parseInt(value) : parseInt(value),
            };
            return { ...prev, order_products: orderProducts };
          });
        } else {
          setDetails((prev) => {
            return { ...prev, [name]: value };
          });
        }
    };

    const handleProductChange = (e, index) => {
      const { name, value } = e.target;
      const product = products.find((p) => p.id === parseInt(value));
      console.log(product,'<<<<<<<<<<<<<<<<<<<<<')
      if (product) {
        const warehouses = product.Warehouses || [];
        console.log(warehouses)
        const warehouseId = warehouses.length ? warehouses[0].id : null;
        console.log(warehouseId)
        setDetails((prev) => {
          const orderProducts = [...prev.order_products];
          orderProducts[index] = {
            ...orderProducts[index],
            [name]: value,
            warehouse_id: warehouseId,
          };
          if (index === 0) {
            return {
              ...prev,
              order_products: orderProducts,
              warehouse_id: warehouseId,
            };
          } else {
            return {
              ...prev,
              order_products: orderProducts,
            };
          }
        });
      }
    };

      
      

    const handleAddProduct = () => {
        setDetails((prev) => {
          const newOrderProducts = [
            ...prev.order_products,
            {
              product_id: 1,
              quantity: 1,
              price: 1
            }
          ];
          return { ...prev, order_products: newOrderProducts };
        });
    };

    const handleRemoveProduct = (index) => {
        setDetails((prev) => {
          const newOrderProducts = [...prev.order_products];
          newOrderProducts.splice(index, 1);
          return { ...prev, order_products: newOrderProducts };
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        const orderProducts = details.order_products.map((product) => ({
            product_id: product.product_id,
            price: product.price,
            quantity: product.quantity
          }));


      await postOrder(
        details.name,
        details.customer_id,
        details.warehouse_id,
        orderProducts,
        accessToken
      );
      
      setDetails({
        name: '',
        customer_id: 1,
        warehouse_id: 1,
        order_products: [{product_id: 1, quantity: 1, price: 1}]
      });
      setIsOpen(false);
    } catch (err) {
    }
    };
  
  
  
  return (
    <Container>
        <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Cancel' : '+ Order'}
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
          <h3>Products:</h3>
            {details.order_products.map((product, index) => (
            <div key={index}>
                <Select
                name='product_id'
                value={product.product_id}
                onChange={(e) => handleProductChange(e, index)}
                >
                <option value=''>Select a product</option>
                {products.map((p) => (
                    <option key={p.id} value={p.id}>
                    {p.name} @{p.price}
                    </option>
                ))}
                </Select>
                <Select>
                {product.product_id &&
                    (products.find((p) => p.id === product.product_id)?.Warehouses?.length ? (
                        products.find((p) => p.id === product.product_id)?.Warehouses?.map((warehouse) => {
                          console.log(warehouse.WarehouseStock,'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
                          return(
                            <option key={warehouse.id} value={`${product.product_id},${warehouse.id}`}>
                            {warehouse.name} - {warehouse.WarehouseStock.quantity}
                            </option>

                          )
                        })
                    ) : (
                    <option>No Stocks</option>
                    ))}
                </Select>
                Quantity
                    <Input
                    type="number"
                    min="1"
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Quantity"
                    />
                Price
                    <Input
                    type="number"
                    min="0"
                    step="0.01"
                    name="price"
                    value={product.price}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Price"
                    />
                <Button onClick={() => handleRemoveProduct(index)}>Remove</Button>
            </div>
            ))}
            <Button onClick={() => handleAddProduct()}>Add Product</Button>
            <h3>Customers:</h3>
            <Select
                name='customer_id'
                value={details.customer_id}
                onChange={handleChange}
                >
                <option value=''>Select a customer</option>
                {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                    {customer.id}-{customer.first_name} {customer.last_name}
                    </option>
                ))}
            </Select>
            <Button type='submit'>Submit</Button>
        </form>
        </Collapse>
    </Container>
    )
}
