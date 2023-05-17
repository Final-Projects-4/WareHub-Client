import { Flex } from "@chakra-ui/react";
import Charts from "@/components/styleComponents/Chart";
import { useState, useEffect } from "react";
import { ProfitLoss } from "@/components/dataComponents/profitLoss";
import { Container } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <>
      <Container>
        <Charts/>
        <ProfitLoss/>
      </Container>
      
          
        
    </>
  );
};



export default Dashboard;    

  
