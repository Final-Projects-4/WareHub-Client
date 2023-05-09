import { useState, useEffect } from 'react';
import { fetchProducts, fetchOrders, fetchCustomers } from '@/fetching/fetchData';

const Dashboard = () => {
  const [data, setData] = useState({ products: [], orders: [], customers: [] });

  useEffect(() => {
    Promise.all([fetchProducts(), fetchOrders(), fetchCustomers()])
      .then(([productsData, ordersData, customersData]) => {
        setData({ products: productsData, orders: ordersData, customers: customersData });
        console.log(customersData);
      })
      .catch(err => console.log(err));
  }, []);
  

  return (
    <>
      <h1>Dashboard</h1>
      <ul>
        {data.products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
        {data.orders.map((order) => (
            <li key={order.id}>{order.name} price: {order.total_price}</li>
        ))}
        {data.customers.map((customer) => (
            <li key={customer.id}>{customer.first_name}</li>
        ))}

      </ul>
    </>
  );
  
  
};

export default Dashboard;
