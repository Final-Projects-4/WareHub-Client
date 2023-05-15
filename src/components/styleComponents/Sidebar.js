import React, { useState } from "react";
import { Flex, Text, IconButton, Divider, Avatar, Heading } from "@chakra-ui/react";
import { FiMenu, FiCodesandbox, FiUser,FiDatabase,FiHome, FiFolder, FiDollarSign, FiSmile, FiShoppingCart, } from "react-icons/fi";
import SideItem from "./SideItem";


const Sidebar = () => {
  const [navSize, changeNavSize] = useState("large");
  const [activeItem, setActiveItem] = useState();
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
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
            _hover={{ background: "none" }}
            icon={<FiMenu />}
            onClick={() => {
              if (navSize == "small") changeNavSize("large");
              else changeNavSize("small");
            }}
          />
          <SideItem navSize={navSize} icon={FiHome} title="Dashboard" active={activeItem === "dashboard"} to="/dashboard" onClick={() => handleItemClick("dashboard")} />
          <SideItem navSize={navSize} icon={FiDollarSign} title="Order" active={activeItem === "order"} to="/orders" onClick={() => handleItemClick("dashboard")} />
          <SideItem navSize={navSize} icon={FiDatabase} title="Warehouse" active={activeItem === "warehouse"} onClick={handleItemClick} />
          <SideItem navSize={navSize} icon={FiCodesandbox} title="Product" active={activeItem === "product"} to="/products" onClick={handleItemClick} />
          <SideItem navSize={navSize} icon={FiUser} title="Users" active={activeItem === "users"} onClick={handleItemClick} />
        </Flex>


      </Flex>
    </>
  );
};


export default Sidebar;
