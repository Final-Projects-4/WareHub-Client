import { AddOrderForm } from "@/components/dataComponents/orders";
import Orders from "@/components/Orders";
import { useState } from "react";
import { Button } from "@chakra-ui/react";

const Order = () => {
    const [showAddOrderForm, setShowAddOrderForm] = useState(false);
  
    const handleToggleForm = () => {
      setShowAddOrderForm(!showAddOrderForm);
    };
  
    return (
      <>
        <Button onClick={handleToggleForm} mb={4}>
          {showAddOrderForm ? "Hide form" : "+Create Order"}
        </Button>
        {showAddOrderForm && <AddOrderForm />}
        <Orders />
      </>
    );
  };
  
  export default Order;