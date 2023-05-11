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
