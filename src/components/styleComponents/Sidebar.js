import React, { useState, useEffect } from "react";
import { Flex, IconButton, useColorMode, Fade, background} from "@chakra-ui/react";
import {
FiBarChart2, 
FiMenu, 
FiCodesandbox, 
FiUsers,
FiPackage,
FiUser, 
FiHome, 
FiDollarSign, 
FiLayout} from "react-icons/fi";
import SideItem from "./SideItem";
import { useRouter } from "next/router";


const Sidebar = () => {
  const [navSize, changeNavSize] = useState("large");
  const [activeItem, setActiveItem] = useState();
  const router = useRouter();
  const { colorMode } = useColorMode();
  const activeColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
  

  useEffect(() => {
    setActiveItem(router.pathname);
  }, [router.pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleToggleNavSize = () => {
    const newNavSize = navSize === "small" ? "large" : "small";
    changeNavSize(newNavSize);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setActiveItem(router.pathname);
      changeNavSize("large"); 
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);
  
  return (
    <>
      <Flex
        pos="sticky"
        top="0"
        bottom="0"
        left="0"
        right="0"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.01)"
        borderRadius={navSize == "small" ? "15px" : "30px"}
        w={navSize == "small" ? "75px" : "200px"}
        flexDir="column"
        justifyContent="space-between"
      >
        <Flex p="5%" flexDir="column" w="100%" alignItems={navSize == "small" ? "center" : "flex-start"} as="nav">
          <IconButton
            background="none"
            mt={5}
            _hover={{ background: activeColor }}
            icon={<FiMenu />}
            onClick={handleToggleNavSize}
          />

          <SideItem navSize={navSize} icon={FiBarChart2} title="Dashboard" active={activeItem === "/dashboard"} to="/dashboard" onClick={() => handleItemClick("dashboard")} activeColor={activeColor}/>
          <SideItem navSize={navSize} icon={FiHome} title="Warehouse" active={activeItem === "/warehouse"} to="/warehouse"onClick={() => handleItemClick("warehouse")} activeColor={activeColor}/>
          <SideItem navSize={navSize} icon={FiPackage} title="Product" active={activeItem === "/products"} to="/products" onClick={() => handleItemClick("products")} activeColor={activeColor}/>
          <SideItem navSize={navSize} icon={FiLayout} title="Order" active={activeItem === "/orders"} to="/orders" onClick={() => handleItemClick("orders")} activeColor={activeColor}/> 
          <SideItem navSize={navSize} icon={FiDollarSign} title="Finance" active={activeItem === "/finance"} to="/finance"onClick={() => handleItemClick("finance")} activeColor={activeColor}/>
          <SideItem navSize={navSize} icon={FiCodesandbox} title="Category" active={activeItem === "/category"} to="/category" onClick={() => handleItemClick("category")} activeColor={activeColor}/>
          <SideItem navSize={navSize} icon={FiUsers} title="Vendors" active={activeItem === "/vendor"} to="vendor"onClick={() => handleItemClick("vendor")} activeColor={activeColor}/>
          <SideItem navSize={navSize} icon={FiUser} title="Customers" active={activeItem === "/customers"} to="/customers" onClick={() => handleItemClick("customers")} activeColor={activeColor}/>
          
        </Flex>
      
        
      </Flex>
      
    </>
  );
};


export default Sidebar;
