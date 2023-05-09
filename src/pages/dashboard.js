import {useState, useEffect} from 'react';
import { fetchProducts } from '@/fetching/fetchData';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(products => setData(products))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <ul>
        {data.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
