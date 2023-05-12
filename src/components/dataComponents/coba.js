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
  

export const AddCobaForm = () => {
// Data Needed: customers, products
  const products = useProducts();
  const customers = useCustomers();
  
  
  console.log(products)

  //state variables
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({})
  const [currentWarehouses, setCurrentWarehouses] = useState([])
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
    
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {

        const orderProducts = details.order_products.map((product) => ({
            product_id: product.product_id,
            price: product.price,
            quantity: product.quantity
        }));
      const accessToken = sessionStorage.getItem('accessToken');
        
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
  
  const HandleSelectProduct = () => {
    let array = products.map((product, index) => {
      return (
        <option key={index} value={product.id}>{product.name} ${product.price}</option>
        )
      })
    return array
  }

  const HandleSelectWarehouse = () => {
    if(!(JSON.stringify(currentProduct) === "{}")) {
      let warehouses = currentProduct.Warehouses
      let array = warehouses.map((w, index) => (
        <option key={index} value={w.id}>Available Stock:{w.WarehouseStock.quantity} @ {w.name}</option>
      ))
      return array
    } else {
      return
    }
  }

  const handleOptionProduct = (e) => {
    let selectProduct = products.find((element) => element.id === +(e.target.value))
    setCurrentProduct(selectProduct)
    setCurrentWarehouses(selectProduct.Warehouses)
  }

  const handleOptionWarehouse = (e) => {
    let selectWarehouse = currentProduct.Warehouses.find(
      (element) => element.id === +e.target.value
    );
    setCurrentWarehouses(selectWarehouse);
  };

  const handleQuantityChange = (e) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      order_products: [
        {
          product_id: currentProduct.id,
          quantity: +e.target.value,
          price: currentWarehouses.price,
        },
      ],
      warehouse_id: currentWarehouses.id,
    }));
  };
  
  return (
    <Container textAlign="center">
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Cancel' : 'Coba'}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <form onSubmit={handleSubmit}>
          <h3>Name:</h3>{' '}
          <Input
            type='text'
            name='name'
            value={details.name}
            onChange={(e) =>
              setDetails((prevState) => ({
                ...prevState,
                name: e.target.value
              }))
            }
          ></Input>
          <h3>Products:</h3>
          <Select
            onChange={handleOptionProduct}
            value={currentProduct.id}
          >
            {HandleSelectProduct()}
          </Select>
          {currentProduct.id && (
            <>
              <h3>Stocks</h3>
              <Select
                onChange={(e) => {
                  const warehouseId = Number(e.target.value);
                  const warehouse = currentProduct.Warehouses.find(
                    (w) => w.id === warehouseId
                  );
                  const product = {
                    ...currentProduct,
                    price: warehouse.price,
                    warehouse_id: warehouseId
                  };
                  setCurrentProduct(product);
                  setDetails((prevState) => ({
                    ...prevState,
                    order_products: [
                      {
                        product_id: product.id,
                        quantity: 1,
                        price: product.price,
                        warehouse_id: product.warehouse_id
                      }
                    ]
                  }));
                }}
                value={currentProduct.warehouse_id}
              >
                {HandleSelectWarehouse()}
              </Select>
              <h3>Quantity:</h3>
              <Input
                type='number'
                name='quantity'
                value={details.order_products[0].quantity}
                onChange={(e) => {
                  const quantity = Number(e.target.value);
                  setDetails((prevState) => ({
                    ...prevState,
                    order_products: [
                      {
                        ...prevState.order_products[0],
                        quantity
                      }
                    ]
                  }));
                }}
              />
              <h3>Customer</h3>
              <Select
                name='customer_id'
                value={details.customer_id}
                onChange={(e) =>
                  setDetails((prevState) => ({
                    ...prevState,
                    customer_id: e.target.value
                  }))
                }
              >
                {customers.map((customer) => (
                  
                  <option key={customer.id} value={customer.id}>
                    {customer.first_name} {customer.last_name}
                  </option>
                ))}
              </Select>

              <Button type='submit'>Add Order</Button>
            </>
          )}
        </form>
      </Collapse>
    </Container>
  );
  
}
