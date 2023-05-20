import { useState } from "react";


const MoveStocks = (data) => {

    const [isOpen, setIsOpen] = useState(false);
    const handleOpenModal = () => {
      setIsOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsOpen(false);
    };
  
    function handleMove(productId, quantity, source_warehouse_id, destination_warehouse_id) {
      const accessToken = sessionStorage.getItem('accessToken');
      moveProduct(productId, quantity, source_warehouse_id, destination_warehouse_id, accessToken)
        .then(() => {
          toast({
            title: 'Product moved',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          setData((prevData) => ({ ...prevData, products: prevData.products.filter((p) => p.id !== productId) }));
        })
        .catch((error) => {
          toast({
            title: 'Error moving product',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }
    
    const products = data.data.products
    const destinationWarehouse = data.warehouses
    
    
    return(
      <>
      </>
    )
  
  }

  export default MoveStocks