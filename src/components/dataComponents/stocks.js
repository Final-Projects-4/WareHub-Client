const Stocks = () => {

    return(
        <>
        </>
    )
};


export default Stocks

/* <h3>Vendor</h3>
        <Select
        name="vendor_id"
        onChange={handleChange}
        value={details.vendor_id}
      >
        {data.vendors.map((vendor) => (
          <option key={vendor.id} value={vendor.id}>
            {vendor.name}
          </option>
        ))}
      </Select>
        <h3>Warehouse</h3>
        <Select
        name="warehouse_id"
        onChange={handleChange}
        value={details.warehouse_id}
      >
        {data.warehouses.map((warehouse) => (
          <option key={warehouse.id} value={warehouse.id}>
            {warehouse.name}
          </option>
        ))}
      </Select> */

    //   const [details, setDetails] = useState({
    //     name: '',
    //     price: 0,
    //     weight: 0,
    //     size: '',
    //     description: '',
    //     SKU: '',
    //     category_id: 0,
    //     vendor_id: 0,
    //     warehouse_id: 0
    //   })
    
    //   const [data, setData] = useState(
    //     { 
    //       vendors: [],
    //       warehouses: [],
    //       categories:[]
    //     });
    
    //     useEffect(() => {
    //         Promise.all([fetchCategories(),fetchVendors(),fetchWarehouses()])
    //           .then(([categoriesData, vendorsData, warehousesData]) => {
    //             setData({
    //               categories: categoriesData,
    //               vendors: vendorsData,
    //               warehouses: warehousesData,
    //             });
    //           })      
    //           .catch(err => console.log(err));
    //       }, []);
    
    //     const handleChange = (e) => {
    //         const {name, value} = e.target;
    //         setDetails((prev) => {
    //             return { ...prev, [name]: value};
    //         });
    //     };
    
    //     const handleSubmit = (e) => {
    //         e.preventDefault();
    //         console.log(details)
    //     }