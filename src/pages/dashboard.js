import { Flex } from "@chakra-ui/react";
import Charts from "@/components/styleComponents/Chart";
import { useState, useEffect } from "react";
import { ProfitLoss } from "@/components/dataComponents/profitLoss";

const Dashboard = () => {
  const [chartsSize, setChartsSize] = useState("100%");

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setChartsSize("100%");
    } else {
      setChartsSize("50%");
    }
  };
  
  useEffect(() => {
    handleResize(); // set the initial size when the component mounts
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  return (
    <>
      <Flex>
        <Flex flex="1" w="100%" p="3%" flexDir="column" overflow="auto" minH="100vh">
          <Charts w={chartsSize} />
          <ProfitLoss/>
        </Flex>
      </Flex>
    </>
  );
};



export default Dashboard;    

  
