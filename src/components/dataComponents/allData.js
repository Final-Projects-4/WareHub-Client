import { useState, useEffect } from 'react';
import { fetchProducts, fetchOrders, fetchCustomers, fetchExpenses, fetchRevenues, fetchOrderDetails, fetchStocks, fetchVendors, fetchWarehouses, fetchCategories } from '@/fetching/fetchData';

export const allData = () => {
  const [data, setData] = useState(
    { 
      products: [], 
      orders: [], 
      customers: [],
      expenses: [],
      revenues: [],
      orderDetails: [],
      stocks: [],
      vendors: [],
      warehouses: [],
      categories:[]
    });

  useEffect(() => {
    Promise.all(
      [
        fetchProducts(), fetchOrders(), fetchCustomers(),
        fetchCategories(), fetchExpenses(), fetchRevenues(),
        fetchOrderDetails(), fetchStocks(), fetchVendors(),
        fetchWarehouses()
      ]
    )
    .then((
      [
        productsData, ordersData, customersData, categoriesData, expensesData,
        revenuesData, orderDetailsData, stocksData, vendorsData, warehousesData
      ]
    ) => {
      setData({
        products: productsData, 
        orders: ordersData, 
        customers: customersData,
        expenses: expensesData,
        revenues: revenuesData,
        orderDetails: orderDetailsData,
        stocks: stocksData,
        vendors: vendorsData,
        warehouses: warehousesData,
        categories: categoriesData 
      });
    })      
    .catch(err => console.log(err));
  }, []);

  return { data, setData };
};

export const allCategories = () => {
  const [category, setCategory] = useState({ categories: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategory({ categories: categoriesData });
      } catch (err) {
        
      }
    };

    fetchData();
  }, []);

  return { category, setCategory };
};

export const allWarehouses = () => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const warehousesData = await fetchWarehouses();
        setWarehouses(warehousesData)
      } catch (err) {
        
      }
    };

    fetchData();
  }, []);

  return { warehouses, setWarehouses };
};

export const allVendors = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendorsData = await fetchVendors();
        setVendors(vendorsData);
      } catch (err) {
        
      }
    };

    fetchData();
  }, []);

  return { vendors, setVendors };
};

export const allProducts = ({ filters = {}, dummyState }) => {
  const [data, setData] = useState({ products: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts(filters);
        setData({ products: productsData });
      } catch (err) {
        // Handle error
      }
    };
  
    fetchData();
  }, [dummyState]); // Add dummyState as a dependency

  return { data, setData };
};

export const allOrders = () => {
  const [data, setData] = useState({ orders: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await fetchOrders();
        setData({ orders: ordersData });
      } catch (err) {
        
      }
    };

    fetchData();
  }, []);

  return { data, setData };
};

export const allExpenses = () => {
  const [expenses, setExpenses] = useState({ expenses: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesData = await fetchExpenses();
        setExpenses({ expenses: expensesData });
      } catch (err) {
        
      }
    };

    fetchData();
  }, []);

  return { expenses, setExpenses };
};

export const allRevenues = () => {
  const [revenues, setRevenues] = useState({ revenues: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const revenuesData = await fetchRevenues();
        setRevenues({ revenues: revenuesData });
      } catch (err) {
        
      }
    };

    fetchData();
  }, []);

  return { revenues, setRevenues };
};

export const allOrderDetails = () => {
  const [data, setData] = useState({ orderDetails: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderDetailsData = await fetchOrderDetails();
        setData({ orderDetails: orderDetailsData });
      } catch (err) {
        
      }
    };

    fetchData();
  }, []);

  return { data, setData };
};

export const allStocks = () => {
  const [data, setData] = useState({ stocks: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stocksData = await fetchStocks();
        setData({ stocks: stocksData });
      } catch (err) {
        
      }
    };

    fetchData();
  }, []);

  return { data, setData };
};

export const allCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersData = await fetchCustomers();
        setCustomers(customersData)
      } catch (err) {
        
      }
    };

    fetchData();
  }, []);

  return { customers, setCustomers };
};

