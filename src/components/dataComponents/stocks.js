import { useState } from "react";
import { allProducts, allVendors, allWarehouses } from "./allData";
import { postStock } from "@/fetching/postData";
import { Button, Collapse } from "@chakra-ui/react";

export const AddStockForm = () => {
//data needed: products , vendors, warehouses
  const { data } = allProducts();
  const { vendors } = allVendors();
  const { warehouses } = allWarehouses();

  const vendorsData = vendors;
  const warehousesData = warehouses;
  const products = data.products

  const [details, setDetails] = useState({
    product_id: 1,
    quantity: 0,
    vendor_id: 1,
    warehouse_id: 1
  })
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === '') {
      setDetails((prev) => ({ ...prev, [name]: 0 }));
    } else {
      const quantity = parseInt(value);
      setDetails((prev) => ({ ...prev, [name]: quantity }));
    }
  };
  


    const accessToken = sessionStorage.getItem('accessToken');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await postStock(
            details.product_id,
            details.quantity,
            details.vendor_id,
            details.warehouse_id,
            accessToken
          );
          setDetails({
            product_id: 1,
            quantity: 0,
            vendor_id: 0,
            warehouse_id: 0
          });
        } catch (err) {
        }
      };

      return (
        <>
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Cancel' : '+ Stocks'}
          </Button>
          <Collapse in={isOpen} animateOpacity>
            <form onSubmit={handleSubmit}>
              <h3>Product</h3>{' '}
                <select
                  name='product_id'
                  value={details.product_id}
                  onChange={handleChange}
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              <h3>Quantity</h3>{' '}
              <input
                type='text'
                name='quantity'
                value={details.quantity}
                onChange={handleChange}
              ></input>
              
              <h3>Vendor</h3>{' '}
              <select
                  name='vendor_id'
                  value={details.vendor_id}
                  onChange={handleChange}
                >
                  {vendorsData.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </option>
                  ))}
              </select>
              <h3>Warehouse</h3>{' '}
              <select
                name='warehouse_id'
                value={details.warehouse_id}
                onChange={handleChange}
              >
                {warehousesData.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
              <Button type='submit'>Submit</Button>
            </form>
          </Collapse>
        </>
      );





};

