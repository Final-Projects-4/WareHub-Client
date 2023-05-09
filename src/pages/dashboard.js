import { useState, useEffect } from 'react';
import { fetchProducts, fetchOrders } from '@/fetching/fetchData';

const Dashboard = () => {
  const [data, setData] = useState({ products: [], orders: [] });

  useEffect(() => {
    Promise.all([fetchProducts(), fetchOrders()])
      .then(([productsData, ordersData]) => setData({ products: productsData, orders: ordersData }))
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
      </ul>
    </>
  );
  
  
};

export default Dashboard;
